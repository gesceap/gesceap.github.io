<template>
  <div>
    <audio autoplay loop ref="wind">
      <source src="~../../../assets/sonic-desert/wind.mp3" type="audio/mpeg" />
      <source src="~../../../assets/sonic-desert/wind.ogg" type="audio/ogg" />
    </audio>

    <audio preload ref="track" @ended="trackEnded">
      <source src="~../../../assets/sonic-desert/track.mp3" type="audio/mp3" />
      <source src="~../../../assets/sonic-desert/track.ogg" type="audio/ogg" />
    </audio>

    <div class="background-container">
      <video
        src="~../../../assets/sonic-desert/background.mp4"
        autoplay
        muted
      ></video>
    </div>

    <div class="foreground-container">
      <button @click="clickRose">
        <img
          src="~../../../assets/sonic-desert/mystic-rose.png"
          alt="Mystic Rose"
        />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      trackPlaying: false
    };
  },

  methods: {
    async clickRose() {
      this.trackPlaying = !this.trackPlaying;

      if (this.trackPlaying) {
        await this.$refs.wind.pause();
        await this.$refs.track.play();
      } else {
        await this.$refs.wind.play();
        await this.$refs.track.pause();
      }
    },

    async trackEnded() {
      this.$refs.track.currentTime = 0;
      this.clickRose();
    }
  }
};
</script>

<style>
.background-container,
.foreground-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  display: flex;
  align-content: center;
  justify-content: center;
}

.foreground-container button {
  -webkit-appearance: none;
  background: none;
  border: none;
  padding: 0;
  max-width: 33vw;
  min-width: 250px;
  align-self: center;
  border-radius: 50%;
  cursor: pointer;
  overflow: hidden;
}

.foreground-container img {
  width: 100%;
}

.background-container {
  display: flex;

  width: 100%;
  height: 100%;
}

.background-container video {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
</style>
