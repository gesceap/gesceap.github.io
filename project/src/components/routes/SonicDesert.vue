<template>
  <div>
    <audio preload autoplay loop ref="wind">
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
        loop
        muted
        preload
      ></video>
    </div>

    <div class="foreground-container">
      <button @click="clickRose" aria-label="Play/Pause">
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
      trackPlaying: false,
      prime16Timer: null
    };
  },

  methods: {
    async clickRose() {
      this.trackPlaying = !this.trackPlaying;

      if (this.trackPlaying) {
        await this.$refs.wind.pause();
        await this.$refs.track.play();

        if (this.prime16Timer) {
          clearTimeout(this.prime16Timer);
          this.prime16Timer = null;
        }
      } else {
        await this.$refs.wind.play();
        await this.$refs.track.pause();
      }
    },

    async trackEnded() {
      // reset track to the start
      this.$refs.track.currentTime = 0;
      // play the noise loop and update track playing state
      this.clickRose();

      // 5 second timeout to redirect to prime16 after the track plays
      // clicking the rose again will cancel this timeout
      setTimeout(() => {
        this.$router.push("/prime16");
      }, 1000 * 5);
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
