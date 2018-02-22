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
      mins: 0.000,
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
      if ((this.clock) >= 59500) {
        // let min = (this.clock/100000)/60;
        //60000000 ms to 1 minute or actually 60000
        this.mins++;
        let nt = Number.parseFloat(this.timer.current) + Number.parseInt(this.mins);
        console.log('mins: ' + this.mins + ' cur: ' + this.timer.current + " clock: " + this.clock + ' newtime: ' +
      nt);
        this.clock -= 59500;
        console.log('newclock: '  + this.clock);
        this.timer.current = Number.parseFloat((nt).toPrecision(4));
        //   //TODO not sure how to make these seconds go to minutes
      } else {
        if (this.mins === 0) {
          this.timer.current = Number.parseFloat((this.clock/100000)+ Number.parseInt(this.mins)).toPrecision(2);
        } else if (this.mins <= 9){
        this.timer.current = Number.parseFloat((this.clock/100000)+ Number.parseInt(this.mins)).toPrecision(3);
      } else if (this.mins > 9 && this.mins < 60) {
        this.timer.current = Number.parseFloat((this.clock/100000)+ Number.parseInt(this.mins)).toPrecision(4);
        }
      }
    }
  }

}
</script>

<style lang="css">
</style>
