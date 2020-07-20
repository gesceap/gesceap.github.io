<template>
  <div id="app">
    <audio autoplay loop ref="wind">
      <source src="~../../../assets/sonic-desert/wind.mp3" type="audio/mpeg" />
      <source src="~../../../assets/sonic-desert/wind.ogg" type="audio/ogg" />
    </audio>

    <audio preload ref="track">
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

    <div id="sm">
      <a
        href="https://www.youtube.com/channel/UChvIb5lU1CswBTno6BCGG4Q"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img alt="YouTube" src="/img/yt.png" />
      </a>
      <a
        href="https://www.facebook.com/gesceap/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img alt="Facebook" src="/img/fb.png" />
      </a>
      <a
        href="https://twitter.com/gesceap_"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img alt="Twitter" src="/img/tw.png" />
      </a>
      <a
        href="https://gesceap.bandcamp.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img alt="Bandcamp" src="/img/bc.png" />
      </a>
      <a
        href="https://github.com/gesceap"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img alt="GitHub" src="/img/gh.png" />
      </a>
      <a
        href="https://soundcloud.com/gesceap"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img alt="SoundCloud" src="/img/sc.png" />
      </a>
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
    }
  }
};
</script>

<style>
html,
body {
  background-color: #000;
  height: 100%;
  margin: 0;
}

#app {
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
}

#sm {
  position: absolute;
  bottom: 0;
  left: 0;
}

#sm a img {
  width: 50px;
  height: 50px;
  margin: 5px;
}

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
