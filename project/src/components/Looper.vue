<template>
  <main>
    <Background
      :playing="playing"
      :sources="sources"
      :stop-animating="stopAnimating"
      v-if="loaded"
    />
    <div class="loading" v-if="!loaded">Loading 19.2MB please wait</div>
    <div class="square" v-else>
      <div class="looper">
        <Sample
          v-for="(source, index) in showSources"
          :source="source"
          :playing="playing.find(src => src.filename === source.filename)"
          :queuedIn="playing.length && startQueue.indexOf(index) > -1"
          :queuedOut="endQueue.indexOf(index) > -1"
          :key="source.filename"
          @sampleClick="queueSample"
        />
      </div>
    </div>
  </main>
</template>

<script>
import Meyda from "meyda";
import { MeydaAnalyzer } from "meyda/src/meyda-wa.js";
import Background from "./Background";
import Sample from "./Sample";
import loadSources from "../application/load-sources";
import { EventBus } from "../application/event-bus";
import {
  WebAudioAPISound,
  WebAudioAPISoundManager
} from "../application/WebAudioApiSound";

function createNewMeydaAnalyser(options) {
  return new MeydaAnalyzer(options, Object.assign({}, Meyda));
}

let audioContext = null;

export default {
  name: "Looper",

  data() {
    return {
      loaded: false,
      counter: 0,
      sources: [],
      showSources: [],
      startQueue: [],
      endQueue: [],
      stopAnimating: false,
      // baseUrl: "https://rawcdn.githack.com/gesceap/gesceap.github.io/bc839d84392ea15264a9e6485762b9072d66d9e5/public/loops/"
      baseUrl: "/loops/",

      timerWorker: null, // The Web Worker used to fire timer messages
      sampleStore: {},

      lookahead: 25.0, // How frequently to call scheduling function (in milliseconds)
      isPlaying: false,
      current16thNote: null, // What note is currently last scheduled?,
      tempo: 130.0, // tempo (in beats per minute)
      scheduleAheadTime: 0.1, // How far ahead to schedule audio (sec)
      // This is calculated from lookahead, and overlaps
      // with next interval (in case the timer is late)
      nextNoteTime: 0.0 // when the next note is due.
      // and may or may not have played yet. {note, time}
    };
  },

  components: {
    Background,
    Sample
  },

  computed: {
    playing() {
      const playing = [];
      this.sources.forEach((source, index) => {
        if (!source.playing) return false;
        playing.push({ ...source, index });
      });
      return playing;
    }
  },

  async created() {
    audioContext = WebAudioAPISoundManager.context;
    this.timerWorker = new Worker("/metronome-worker.js");

    this.timerWorker.onmessage = e => {
      if (e.data === "tick") {
        this.scheduler();
      }
    };

    this.timerWorker.postMessage({ interval: this.lookahead });

    this.analyser = createNewMeydaAnalyser({
      audioContext: WebAudioAPISoundManager.context,
      source: WebAudioAPISoundManager.merger,
      bufferSize: 256,
      featureExtractors: ["rms", "energy", "buffer"]
    });

    WebAudioAPISoundManager.bufferList = {};

    this.$set(this, "sources", await loadSources());
    this.loaded = true;

    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    for (let i = 0; i < this.sources.length; ++i) {
      this.showSources.push(this.sources[i]);
      await sleep(100);
    }

    window.toggleAnimating = () => {
      this.stopAnimating = !this.stopAnimating;
    };
  },

  beforeDestroy() {
    for (let i = 0; i < 16; i += 1) {
      WebAudioAPISoundManager.stopSoundWithUrl(
        `${this.baseUrl}${this.sources[i].filename}`
      );
    }

    this.timerWorker.postMessage("stop");
    this.timerWorker.terminate();
  },

  methods: {
    startInterval() {
      this.isPlaying = !this.isPlaying;

      if (this.isPlaying) {
        // Start playing
        this.current16thNote = 0;
        this.nextNoteTime = audioContext.currentTime;
        this.timerWorker.postMessage("start");
        return "stop";
      } else {
        this.timerWorker.postMessage("stop");
        return "play";
      }
    },

    scheduler() {
      // While there are notes that will need to play before the next interval,
      // schedule them and advance the pointer.
      while (
        this.nextNoteTime <
        audioContext.currentTime + this.scheduleAheadTime
      ) {
        this.scheduleNote(this.current16thNote, this.nextNoteTime);
        this.nextNote();
      }
    },

    scheduleNote(beatNumber, time) {
      const { startQueue, endQueue } = this;

      if (beatNumber % 64 === 0) {
        for (let i = 0; i < endQueue.length; ++i) {
          this.stopSample(endQueue[i]);
        }

        // Don"t destructure this.playing here because the
        // computed property only recalculates upon access.
        // We modify the data above in the endQueue loop.
        for (let i = 0; i < this.playing.length; ++i) {
          this.startSample(this.playing[i].index, time);
        }

        for (let i = 0; i < startQueue.length; ++i) {
          this.startSample(startQueue[i], time);
        }

        startQueue.splice(0, startQueue.length);
        endQueue.splice(0, endQueue.length);
      }

      if (beatNumber % 4 === 0) {
        EventBus.$emit("loop");
      }
    },

    nextNote() {
      // Advance current note and time by a 16th note...
      const secondsPerBeat = 60.0 / this.tempo; // Notice this picks up the CURRENT
      // tempo value to calculate beat length.
      this.nextNoteTime += 0.25 * secondsPerBeat; // Add beat length to last beat time

      this.current16thNote++; // Advance the beat number, wrap to zero
      if (this.current16thNote === 64) {
        this.current16thNote = 0;
      }
    },

    queueSample(e) {
      const filename = e.filename;
      const { endQueue, startQueue } = this;
      const index = this.sources.findIndex(
        source => source.filename === filename
      );

      if (!this.playing.length) {
        this.startInterval();
      }

      if (index > -1) {
        const type = this.sources[index].type;
        const existingTypePlaying = this.playing.find(src => src.type === type);
        const existingTypesQueued = startQueue.reduce(
          (arr, sourceIndex, index) => {
            if (this.sources[sourceIndex].type === type) arr.push(index);
            return arr;
          },
          []
        );
        const existingTypeQueued = !!existingTypesQueued.length;

        if (startQueue.indexOf(index) > -1) {
          startQueue.splice(startQueue.indexOf(index), 1);
        } else if (
          this.sources[index].playing &&
          endQueue.indexOf(index) > -1
        ) {
          endQueue.splice(endQueue.indexOf(index), 1);
          if (existingTypeQueued) {
            startQueue.splice(startQueue.indexOf(index), 1);
          }
        } else if (this.sources[index].playing) {
          endQueue.push(index);
        } else {
          if (existingTypePlaying) {
            endQueue.push(existingTypePlaying.index);
          }

          if (existingTypeQueued) {
            existingTypesQueued.forEach(index => {
              startQueue.splice(index, 1);
            });
          }

          startQueue.push(index);
        }
      }
    },

    startSample(index, time) {
      const { baseUrl } = this;
      const filename = this.sources[index].filename;
      this.sources[index].playing = true;
      const sample = new WebAudioAPISound(`${baseUrl}${filename}`);

      sample.play({ time });

      this.sources[index].analyser = this.analyser;

      if (this.sampleStore[filename]) {
        delete this.sampleStore[filename];
      }

      this.sampleStore[filename] = sample;
    },

    stopSample(index) {
      this.sources[index].playing = false;

      // delete this.sources[index].analyser
      // this.sources[index].analyser = null
    }
  }
};
</script>

<style lang="scss" scoped>
main {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.loading {
  color: #fff;
  font-size: 24px;
  z-index: 1000;
  position: relative;
  text-transform: uppercase;
  font-family: monospace;
  font-weight: 300;
}

.looper {
  position: absolute;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 2px;
  grid-auto-rows: minmax(auto, 24.7%);

  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

h1 {
  color: #fff;
}

.square {
  width: 60vw;
  max-width: 70vh;
  display: flex;
  position: relative;

  &::after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
}
</style>
