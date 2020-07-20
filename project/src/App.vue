<template>
  <div v-if="!webaudioShieldAccepted" class="web-audio-sheild">
    <button @click="clickBegin">Begin</button>
  </div>
  <RouterView v-else />
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

<style scoped>
.web-audio-sheild {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  right: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
}

.web-audio-sheild button {
}
</style>
