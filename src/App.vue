<template>
  <div id="app">
    <Looper/>
  </div>
</template>

<script>
import Looper from "./components/Looper";

export default {
  name: "App",
  components: {
    Looper
  }
};
</script>

<style>
html,
body {
  background-color: #2c2c2c;
  height: 100%;
  margin: 0;
}

#app {
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
