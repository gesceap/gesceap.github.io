<template>
  <button
    :class="{
      sample: true,
      playing: playingClass,
      queuedIn: queuedInClass,
      queuedOut: queuedOutClass
    }"
    @click="emitClick"
    :name="source.name"
  ></button>
</template>

<script>
import { EventBus } from "../application/event-bus";

export default {
  props: ["source", "playing", "queuedIn", "queuedOut"],
  data() {
    return { playingClass: false, queuedInClass: false, queuedOutClass: false };
  },
  created() {
    EventBus.$on("loop", this.handleClasses);
  },
  methods: {
    emitClick() {
      this.$emit("sampleClick", this.source);
      this.handleClasses();
    },
    handleClasses(count = 0) {
      const { playing, queuedIn, queuedOut } = this;

      this.playingClass = false;
      this.queuedInClass = false;
      this.queuedOutClass = false;

      if (count % 2 === 0) {
        this.playingClass = !!playing;
      }

      this.queuedInClass = !!queuedIn;
      this.queuedOutClass = !!queuedOut;
    }
  }
};
</script>

<style lang="scss" scoped>
@keyframes beat {
  0% {
    background-color: lime;
    box-shadow: 0 0 4px 2px rgba(141, 193, 73, 1);
  }

  100% {
    background-color: grey;
    box-shadow: 0 0 4px 2px rgba(141, 193, 73, 0);
  }
}

@keyframes queuedIn {
  0% {
    background-color: rgb(255, 165, 0);
    box-shadow: 0 0 4px 2px rgba(204, 109, 46, 1);
  }

  100% {
    background-color: grey;
    box-shadow: 0 0 4px 2px rgba(204, 109, 46, 0);
  }
}

@keyframes queuedOut {
  0% {
    background-color: rgb(184, 56, 61);
    box-shadow: 0 0 4px 2px rgba(204, 62, 68, 1);
  }

  100% {
    background-color: grey;
    box-shadow: 0 0 4px 2px rgba(204, 62, 68, 0);
  }
}

.sample {
  background-color: grey;
  border: 0;
  -webkit-appearance: none;
  cursor: pointer;
  opacity: 0.4;

  &:active {
    transform: scale(0.9);
    transition: transform 85ms;
  }

  &.playing {
    animation-duration: 461.538461538ms;
    animation-name: beat;
    animation-iteration-count: infinite;
  }

  &.queuedIn {
    animation-duration: 461.538461538ms;
    animation-name: queuedIn;
    animation-iteration-count: infinite;
  }

  &.queuedOut {
    animation-duration: 461.538461538ms;
    animation-name: queuedOut;
    animation-iteration-count: infinite;
  }
}
</style>
