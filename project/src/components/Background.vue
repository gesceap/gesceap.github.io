<template>
  <canvas ref="canvas"></canvas>
</template>

<script>
import OpenSimplexNoise from "open-simplex-noise";
import { EventBus } from "../application/event-bus";
import animations from "../application/animations";

export default {
  props: ["sources", "playing", "stopAnimating"],

  data() {
    return {
      context: null,
      raf: null,
      dpr: 1,
      squareSize: 135,
      marginSize: 2,
      maxSize: 546,
      fill: "rgba(0,0,0,0)",
      animations,
      tick: false,
      noise: null
    };
  },

  mounted() {
    const { canvas } = this.$refs;
    this.context = canvas.getContext("2d");

    window.addEventListener("resize", this.resize);
    this.resize();

    EventBus.$on("loop", count => {
      if (count % 2 === 0) {
        this.fill = "lime";
        this.tick = true;
      } else {
        this.tick = false;
      }
    });

    this.noise = new OpenSimplexNoise("prime16" + Date.now());

    this.raf = requestAnimationFrame(this.loop);
  },

  methods: {
    loop(time) {
      this.raf = requestAnimationFrame(this.loop);
      const {
        dpr,
        context,
        maxSize,
        squareSize,
        marginSize,
        tick,
        noise,
        stopAnimating
      } = this;

      const { canvas } = context;
      const { width, height } = canvas;
      const delta = time / 2;

      context.drawImage(canvas, -8, -8, width + 16, height + 16);

      const n = noise.noise2D(delta / 500, delta / 1064);

      context.drawImage(
        canvas,
        n,
        Math.sin(delta / 5000 + 5 * Math.sin(n / 500)) * 10 -
          Math.cos(delta / 500),
        width + 20 * n + Math.sin(delta / 500),
        height + 20 * Math.cos(n / 600 + 2 * Math.sin(delta / 500))
      );

      context.fillStyle = "rgba(0,0,0,0.5)";
      context.fillRect(0, 0, width, height);

      let y = -1;
      context.fillStyle = this.fill;

      for (let i = 0; i < 16; i++) {
        const source = this.playing.findIndex(source => source.index === i);
        if (i % 4 === 0) y++;
        if (source < 0) continue;

        const features =
          this.sources[i].analyser && this.sources[i].analyser.get();

        const xPos =
          width / 2 -
          (maxSize * dpr) / 2 +
          (squareSize * dpr * (i % 4) + marginSize * dpr * (i % 4));
        const yPos =
          height / 2 -
          (maxSize * dpr) / 2 +
          (squareSize * dpr * y + marginSize * dpr * y);

        if (this.animations[i]) {
          context.save();
          this.animations[i].draw({
            canvas,
            context,
            delta,
            x: xPos,
            y: yPos,
            squareSize,
            tick,
            dpr,
            features,
            stopAnimating
          });
          context.restore();
        } else {
          context.fillRect(xPos, yPos, squareSize * dpr, squareSize * dpr);
        }
      }

      this.fill = "rgba(0,0,0,0)";
    },

    resize() {
      const { canvas } = this.$refs;
      const { innerWidth: width, innerHeight: height } = window;

      const { dpr } = this;

      this.squareSize = document.querySelector(".sample").clientWidth;
      this.maxSize = document.querySelector(".looper").clientWidth;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    }
  }
};
</script>

<style lang="scss" scoped>
canvas {
  position: fixed;
  left: 0;
  top: 0;
  pointer-events: none;
}
</style>
