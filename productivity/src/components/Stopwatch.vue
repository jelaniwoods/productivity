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
      mins: 0,
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
    },
    pause() {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }

    },
    lap() {
      this.haveLap = true;
      this.laps.push(this.timer.current);
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
      if ((this.clock/100000) >= .60) {
        // let min = (this.clock/100000)/60;

        console.log(((this.clock/100000) % .60) + "()()()() " + (this.clock/100000).toPrecision(3) % .60 );
        if ((this.clock/100000).toPrecision(3) % .60 <= 0.0001) {
          //TODO not sure how to make these seconds go to minutes
          this.mins++;
          console.log(((this.mins)) + "()()(@@@@@)()");
          this.timer.current = Number.parseFloat((this.clock/100000)).toPrecision(3) % .60 + this.mins;
        }
        else
          this.timer.current = Number.parseFloat((this.clock/100000)).toPrecision(4) % .60 + this.mins;

      } else {
        this.timer.current = Number.parseFloat((this.clock/100000)).toPrecision(3);
      }
    }
  }

}
</script>

<style lang="css">
</style>
