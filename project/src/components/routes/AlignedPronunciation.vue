<template>
  <div>
    <button class="symbol-switch" @click="switchSymbolDisplay">
      {{ !this.symbols ? "IPA" : "Latin" }}
    </button>

    <div
      @touchmove="touchMoveHandler"
      @touchend="clearCurrentIndex"
      @mouseleave="clearCurrentIndex"
    >
      <span
        class="symbol"
        :class="{ hovered: i === currentIndex }"
        v-for="(symbol, i) in geseap"
        :data-symbol="i"
        :key="i"
        @pointerenter="playSymbol(i)"
        >{{ symbol }}</span
      >
    </div>
  </div>
</template>

<script>
import { WebAudioAPISound } from "../../application/WebAudioApiSound";

const baseUrl = "/aligned-pronunciation/";
const files = [
  "0_G.wav",
  "1_E.wav",
  "2_SC.wav",
  "3_E.wav",
  "4_A.wav",
  "5_P.wav"
];

export default {
  data() {
    return {
      latin: ["G", "E", "SC", "E", "A", "P"],
      ipa: ["j", "e", "ʃ", "æ", "ɑ", "p"],
      symbols: 0,
      sample: null,
      lastIndex: -1,
      currentIndex: -1
    };
  },

  computed: {
    geseap() {
      return this.symbols ? this.ipa : this.latin;
    }
  },

  async created() {
    function loadSound(url) {
      new WebAudioAPISound(url);
    }

    await Promise.all(
      files.map(filename => loadSound(`${baseUrl}${filename}`))
    );
  },

  methods: {
    switchSymbolDisplay() {
      this.symbols = !this.symbols;
    },

    playSymbol(i, checkLastIndex) {
      if (checkLastIndex && this.lastIndex === i) {
        return;
      }

      this.lastIndex = i;
      this.stopSample();
      const sample = new WebAudioAPISound(`${baseUrl}${files[i]}`);
      this.sample = sample;
      sample.play({ time: 0, loop: true });
      this.currentIndex = i;
    },

    touchMoveHandler(e) {
      const { clientX, clientY } = e.touches[0];
      const el = document.elementFromPoint(clientX, clientY);

      let i = el.dataset.symbol;

      if (i === undefined) {
        return;
      }

      i = Number(i);

      if (i !== this.lastIndex) {
        this.playSymbol(i, true);
        this.lastIndex = i;
      }
    },

    clearCurrentIndex() {
      this.currentIndex = -1;
      this.stopSample();
    },

    stopSample() {
      if (!this.sample) {
        return;
      }

      this.sample.stop({ time: 0 });
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");

.symbol {
  touch-action: none;
  font-family: Arial, "Roboto", sans-serif;
  color: #fff;
  font-size: 18vw;
  cursor: default;
  user-select: none;
}

.symbol.hovered {
  color: #000;
  text-shadow: #fff 0px 0px 8vw;
}

.symbol-switch {
  position: fixed;
  top: 20px;
  right: 20px;
}

button {
  background: #000;
  color: #fff;
  border: 2px solid #fff;
  font-size: 2vw;
  border-radius: 2px;
  cursor: pointer;
}
</style>
