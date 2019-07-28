<template>
  <main>
    <Background :playing="playing" :sources="sources"/>
    <div class="looper">
      <Sample
        v-for="(source, index) in sources"
        :source="source"
        :playing="playing.find((src) => src.filename === source.filename)"
        :queuedIn="startClasses.indexOf(index) > -1"
        :queuedOut="endClasses.indexOf(index) > -1"
        :key="source.filename"
        @sampleClick="queueSample"
      />
    </div>
  </main>
</template>

<script>
import { setDriftlessInterval, clearDriftless } from "driftless";

import Background from "./Background";
import Sample from "./Sample";
import loadSources from "../application/load-sources";
import { EventBus } from "../application/event-bus";

export default {
  name: "Looper",
  data() {
    return {
      message: 'hello',
      counter: 0,
      sources: [],
      interval: null,
      startQueue: [],
      endQueue: [],
      startClasses: [],
      endClasses: []
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

        playing.push({
          filename: source.filename,
          type: source.type,
          index
        });
      });

      return playing;
    }
  },
  async created() {
    this.sources = await loadSources();
    window.sources = this.sources;
  },
  methods: {
    startInterval() {
      if (this.interval) {
        clearDriftless(this.interval);
        this.counter = 0;
      }

      this.interval = setDriftlessInterval(
        this.loop.bind(this),
        461.538461538 / 2
      );
    },
    loop() {
      EventBus.$emit("loop", this.counter);
      const { startQueue, endQueue, startSample, stopSample } = this;

      if (!this.playing.length) {
        if (this.interval) {
          clearDriftless(this.interval);
        }
        this.counter = 16;
      } else if (this.counter < 63) {
        this.counter++;
      } else {
        this.counter = 0;
      }

      if (this.counter % 16 === 0) {
        for (let i = 0; i < endQueue.length; i++) {
          stopSample(endQueue[i]);
        }
        this.endQueue = [];

        for (let i = 0; i < startQueue.length; i++) {
          startSample(startQueue[i]);
        }
        this.startQueue = [];
      }

      this.startClasses = this.startQueue;
      this.endClasses = this.endQueue;
    },

    queueSample(filename) {
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

    startSample(index) {
      this.sources[index].playing = true;
      this.sources[index].sound.play();
    },

    stopSample(index) {
      this.sources[index].playing = false;
      this.sources[index].sound.stop();

      // delete this.sources[index].analyser;
      // this.sources[index].analyser = null;
    }
  }
};
</script>

<style lang="scss" scoped>
main {
  position: relative;
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
