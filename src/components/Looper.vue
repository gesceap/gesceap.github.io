<template>
  <main>
    <!-- <Background :playing="playing" :sources="sources"/> -->
    <div class="loading" v-if="!loaded">Loading 19.2MB please wait</div>
    <div class="looper" v-else>
      <Sample
        v-for="source in sources"
        :source="source"
        :playing="samplesPlaying.findIndex(src => src.filename === source.filename) > -1"
        :queuedIn="queuedIn.findIndex(src => src.filename === source.filename) > -1"
        :queuedOut="queuedOut.findIndex(src => src.filename === source.filename) > -1"
        :key="source.filename"
        @sampleClick="queueSample"
      />
    </div>
  </main>
</template>

<script>
import Background from "./Background";
import Sample from "./Sample";
import loadSources from "../application/load-sources";
import { EventBus } from "../application/event-bus";
import { WebAudioAPISound } from "../application/WebAudioApiSound"

let audioContext = null
let timerWorker = null // The Web Worker used to fire timer messages
let unlocked = false
const lookahead = 25.0 // How frequently to call scheduling function (in milliseconds)

let isPlaying = false // Are we currently playing?
let current16thNote // What note is currently last scheduled?
let tempo = 130.0 // tempo (in beats per minute)
const scheduleAheadTime = 0.1 // How far ahead to schedule audio (sec)
// This is calculated from lookahead, and overlaps
// with next interval (in case the timer is late)
let nextNoteTime = 0.0 // when the next note is due.
// and may or may not have played yet. {note, time}

export default {
  name: "Looper",

  data() {
    return {
      loaded: false,
      counter: 0,
      sources: [],

      queuedIn: [],
      queuedOut: [],
      samplesToPlay: [],
      samplesPlaying: [],
      // baseUrl: 'https://rawcdn.githack.com/gesceap/gesceap.github.io/bc839d84392ea15264a9e6485762b9072d66d9e5/public/loops/'
      baseUrl: '/loops/'
    };
  },

  components: {
    Background,
    Sample
  },

  async created() {
    audioContext = new window.AudioContext();
    timerWorker = new Worker('/metronome-worker.js')

    timerWorker.onmessage = e => {
      if (e.data === 'tick') {
        // console.log('tick!')
        this.scheduler()
      }
    }

    timerWorker.postMessage({ interval: lookahead })

    this.sources = await loadSources();
    this.loaded = true
  },

  methods: {
    startInterval() {
      if (!unlocked) {
        // play silent buffer to unlock the audio

        var buffer = audioContext.createBuffer(1, 1, 22050)
        var node = audioContext.createBufferSource()
        node.buffer = buffer
        node.start(0)
        unlocked = true
      }

      isPlaying = !isPlaying

      if (isPlaying) {
        // start playing
        current16thNote = 0
        nextNoteTime = audioContext.currentTime
        timerWorker.postMessage('start')
        return 'stop'
      } else {
        timerWorker.postMessage('stop')
        return 'play'
      }
    },

    scheduler() {
      // while there are notes that will need to play before the next interval,
      // schedule them and advance the pointer.
      while (nextNoteTime < audioContext.currentTime + scheduleAheadTime) {
        this.scheduleNote(current16thNote, nextNoteTime)
        this.nextNote()
      }
    },

    scheduleNote(beatNumber, time) {
      const { samplesToPlay, baseUrl, queuedIn, queuedOut } = this

      if (beatNumber % 64 === 0) {
        for (let i = 0; i < samplesToPlay.length; ++i) {
          const sample = new WebAudioAPISound(`${baseUrl}${samplesToPlay[i].filename}`)
          sample.play({ time })
          // sample.stop({ time: time + sampleLength })
        }

        queuedIn.splice(0, queuedIn.length)
        queuedOut.splice(0, queuedOut.length)
        this.samplesPlaying = samplesToPlay
      }

      if (beatNumber % 4 === 0) {
        EventBus.$emit("loop");
      }
    },

    nextNote() {
      // Advance current note and time by a 16th note...
      const secondsPerBeat = 60.0 / tempo // Notice this picks up the CURRENT
      // tempo value to calculate beat length.
      nextNoteTime += 0.25 * secondsPerBeat // Add beat length to last beat time

      current16thNote++ // Advance the beat number, wrap to zero
      if (current16thNote === 64) {
        current16thNote = 0
      }
    },

    queueSample(e) {
      const { samplesToPlay, queuedIn, queuedOut } = this
      const sample = e
      const { filename, type } = sample

      if (!unlocked) {
        samplesToPlay.push(sample)
        this.startInterval()
        
        return
      }

      // if exact sample playing = queue out
      // if sample of same type playing = queue same type out, queue new in

      const stpIndex = samplesToPlay.findIndex(item => item.filename === filename)
      const typeIndex = samplesToPlay.findIndex(item => item.type === type)

      if (stpIndex > -1) {
        const qiIndex = queuedIn.findIndex(item => item.filename === filename)

        if (qiIndex > -1) {
          queuedIn.splice(qiIndex, 1)
        }
        
        samplesToPlay.splice(stpIndex, 1)
        queuedOut.push(sample)
      } 
      
      if (typeIndex > -1) {
        queuedOut.push(samplesToPlay[typeIndex])
        samplesToPlay.splice(typeIndex, 1)
        // samplesToPlay.push(sample)
      } 
      
      
      const qoIndex = queuedOut.findIndex(item => item.filename === filename)

      if (qoIndex > -1) {
        queuedOut.splice(qoIndex, 1)
      }

      queuedIn.push(sample)
      samplesToPlay.push(sample)
    }

    // loop() {
    //   EventBus.$emit("loop", this.counter);
    //   const { startQueue, endQueue, startSample, stopSample } = this;

    //   if (!this.playing.length) {
    //     if (this.interval) {
    //       clearDriftless(this.interval);
    //     }
    //     this.counter = 16;
    //   } else if (this.counter < 63) {
    //     this.counter++;
    //   } else {
    //     this.counter = 0;
    //   }

    //   if (this.counter % 16 === 0) {
    //     for (let i = 0; i < endQueue.length; i++) {
    //       stopSample(endQueue[i]);
    //     }
    //     this.endQueue = [];

    //     for (let i = 0; i < startQueue.length; i++) {
    //       startSample(startQueue[i]);
    //     }
    //     this.startQueue = [];
    //   }

    //   this.startClasses = this.startQueue;
    //   this.endClasses = this.endQueue;
    // },

    // queueSample(filename) {
    //   const { endQueue, startQueue } = this;
    //   const index = this.sources.findIndex(
    //     source => source.filename === filename
    //   );

    //   if (!this.playing.length) {
    //     this.startInterval();
    //   }

    //   if (index > -1) {
    //     const type = this.sources[index].type;
    //     const existingTypePlaying = this.playing.find(src => src.type === type);
    //     const existingTypesQueued = startQueue.reduce(
    //       (arr, sourceIndex, index) => {
    //         if (this.sources[sourceIndex].type === type) arr.push(index);
    //         return arr;
    //       },
    //       []
    //     );
    //     const existingTypeQueued = !!existingTypesQueued.length;

    //     if (startQueue.indexOf(index) > -1) {
    //       startQueue.splice(startQueue.indexOf(index), 1);
    //     } else if (
    //       this.sources[index].playing &&
    //       endQueue.indexOf(index) > -1
    //     ) {
    //       endQueue.splice(endQueue.indexOf(index), 1);
    //       if (existingTypeQueued) {
    //         startQueue.splice(startQueue.indexOf(index), 1);
    //       }
    //     } else if (this.sources[index].playing) {
    //       endQueue.push(index);
    //     } else {
    //       if (existingTypePlaying) {
    //         endQueue.push(existingTypePlaying.index);
    //       }

    //       if (existingTypeQueued) {
    //         existingTypesQueued.forEach(index => {
    //           startQueue.splice(index, 1);
    //         });
    //       }

    //       startQueue.push(index);
    //     }
    //   }
    // },

    // startSample(index) {
    //   this.sources[index].playing = true;
    //   this.sources[index].sound.play();
    // },

    // stopSample(index) {
    //   this.sources[index].playing = false;
    //   this.sources[index].sound.stop();

    //   // delete this.sources[index].analyser;
    //   // this.sources[index].analyser = null;
    // }
  }
};
</script>

<style lang="scss" scoped>
main {
  position: relative;
}

.loading {
  color: #fff;
  font-size: 24px;
  z-index: 1000;
  position: relative;
  text-transform: uppercase;
}

.looper {
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 2px;
  grid-auto-rows: minmax(50px, auto);

  width: 546px;
  height: 546px;
}

h1 {
  color: #fff
}
</style>
