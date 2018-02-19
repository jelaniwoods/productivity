<template lang="html">

  <div id="stopwatch">
    <ul v-show="haveLap">
      <li v-for="lap in laps"> {{lap}}</li>
    </ul>
    <span v-model="timer.current">{{timer.current}}</span>
    <div class="butts">
      <button type="button" @click="start">Start</button>
      <button type="button" @click="pause">Pause</button>
      <button type="button" @click="lap">Lap</button>
      <button type="button" @click="stop">Stop</button>
      <button type="button" @click="reset">Reset</button>
    </div>
  </div>
</template>

<script>

export default {

  data() {
    return {
      timer: {
        current: 0
      },
      haveLap: false,
      laps: [],
      interval: null,
      offset: {},
      clock: 0,
      options: {delay: 100}
    }
  },

  methods: {
    start() {
      if (!this.interval) {
        this.offset   = Date.now();
        this.interval = setInterval(this.update, this.options.delay);
      }
      console.log(this.offset + " ppppp");
    },
    pause() {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
      console.log("dahodhaouho");
    },
    lap() {
      this.haveLap = true;
      this.laps.push(this.clock/1000);
      // this.pause();
    },
    stop() {
      this.clock = 0;
      this.render(0);
      this.pause();
    },
    reset() {
      this.laps = [];
      this.stop();
    },
    update() {
      this.clock += this.delta();
      this.render();
    },
    delta() {
      let now = Date.now(),
          d   = now - this.offset;

      this.offset = now;
      return d;
    },
    render() {
      if (this.clock/1000 > 60) {
        this.timer.current = (this.clock/1000)/60;
      } else {
        this.timer.current = this.clock/1000;
      }
    }
  }

}
</script>

<style lang="css">
</style>
