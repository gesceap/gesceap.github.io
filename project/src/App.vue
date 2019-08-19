<template>
  <div id="app">
    <Looper />
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
import Looper from "./components/Looper";

export default {
  name: "App",
  components: {
    Looper
  },
  created() {
    //eslint-disable-next-line
    console.log('%c2xAA (https://wray.pro)', 'background-image: linear-gradient(to left, #c30083, #0623c8); color: #ffffff; padding: 5px 20px;');
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
</style>
