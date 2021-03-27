<template>
  <div id="app">
    <RouterView v-if="webaudioShieldAccepted" />

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
      <RouterLink to="/prime16">
        <img alt="Looper" src="/img/looper.png" />
      </RouterLink>
    </div>

    <Transition name="fade">
      <div v-if="!webaudioShieldAccepted" class="web-audio-shield">
        <button @click="clickBegin" aria-label="Begin" title="Begin">
          <img
            src="~../assets/sonic-desert/mystic-rose.png"
            alt="Mystic Rose"
            class="invert"
          />
        </button>
      </div>
    </Transition>
  </div>
</template>

<script>
export default {
  created() {
    //eslint-disable-next-line
    console.log('%c2xAA (https://wray.pro)', 'background-image: linear-gradient(to left, #c30083, #0623c8); color: #ffffff; padding: 5px 20px;');
  },

  data() {
    return {
      webaudioShieldAccepted: false
    };
  },

  methods: {
    clickBegin() {
      this.webaudioShieldAccepted = true;
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

.web-audio-shield {
  background-color: #000;

  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  display: flex;
  align-content: center;
  justify-content: center;
}

.web-audio-shield button {
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

.web-audio-shield img {
  width: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.invert {
  filter: invert();
}
</style>
