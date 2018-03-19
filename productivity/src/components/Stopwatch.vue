<template lang="html">
  <div id="stopwatch">
    <ul v-show="haveLap" st>
      <li v-for="lap in laps" class="lap"> {{lap}}</li>
    </ul>
    <span v-model="timer.current">{{timer.current}}</span>
    <div class="butts">
      <button type="button" @click="start">Start</button>
      <button type="button" @click="pause">Pause</button>
      <button type="button" :disabled="fifteen" @click="lap">Lap</button>
      <button type="button" :disabled="fifteen" @click="stop">Stop</button>
      <button type="button" @click="reset">Reset</button>
      <button type="button" :disabled="timing" @click="forcedFifteen">Fifteen!</button>
    </div>
    <audio id="snd" src="https://www.w3schools.com/html/horse.ogg" preload="auto"></audio>
    <div class="stats">
      <p v-show="calculated">{{this.totalWork}}</p>
      <button type="button" @click="findTotal" :disabled="!haveLap">Calculate Total Time</button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      timer: {
        current: 0.00
      },
      mins: 0.000,
      haveLap: false,
      laps: [],
      totalWork: 0,
      calculated: false,
      interval: null,
      offset: {},
      clock: 0.00,
      options: {delay: 100},
      alert: false,
      timing: false,
      fifteen: false
    }
  },
  methods: {
    start () {
      if (!this.interval) {
        this.offset   = Date.now();
        this.interval = setInterval(this.update, this.options.delay);
        this.timing = true;
      }
    },
    pause () {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
    },
    lap () {
      this.haveLap = true;
      this.laps.push(this.timer.current);
      this.stop();
    },
    stop () {
      this.clock = 0;
      this.mins = 0;
      this.timing = false;
      this.render(0);
      this.pause();
    },
    reset () {
      this.timing = false;
      this.laps = [];
      this.calculated = false;
      this.haveLap = false;
      this.fifteen = false;
      this.stop();
    },
    update () {
      this.clock += this.delta();
      this.render();
      if (this.fifteen && this.mins >= 15) {
        this.stop();
        // console.log('stoooopppp');
        document.getElementById('snd').play();
        alert('15 minutes up!');
        this.fifteen = false;
      }
    },
    delta () {
      let now = Date.now(),
          d   = now - this.offset;
      this.offset = now;
      return d;
    },
    render () {
      if ((this.clock) >= 59500) {
        // let min = (this.clock/100000)/60;
        //60000000 ms to 1 minute or actually 60000
        this.mins++;
        let nt = Number.parseFloat(this.timer.current) + Number.parseFloat(this.mins);
        // console.log('mins: ' + this.mins + ' cur: ' + this.timer.current + " clock: " + this.clock + ' newtime: ' +
      // nt);
        this.clock -= 59500;
        // console.log('newclock: '  + this.clock);
        this.timer.current = Number.parseFloat((this.mins).toPrecision(4));
      } else {
        if (this.mins <= 0) {
          this.timer.current = Number.parseFloat((this.clock/100000)+ Number.parseInt(this.mins)).toPrecision(2);
        } else if (this.mins <= 9) {
        this.timer.current = Number.parseFloat((this.clock/100000)+ Number.parseInt(this.mins)).toPrecision(3);
      } else if (this.mins > 9) {
        // reducer = (accumulator, currentValue) => accumulator + currentValue;
        this.timer.current = Number.parseFloat((this.clock/100000)+ Number.parseInt(this.mins)).toPrecision(4);
        }
      }
    },
    findTotal () {
      let cc = this.laps.reduce((acc, cur) => Number.parseFloat(acc) + Number.parseFloat(cur));
      this.totalWork = cc;
      this.calculated = true;
      // console.log(this.totalWork + '******');
      this.$emit('calculated', {sum: this.totalWork});
    },
    forcedFifteen() {
      this.fifteen = true;
      this.start();
    }
  }

}
</script>

<style lang="css" scoped>
  li {
    list-style-type: none;
    text-align: center;
    margin-right: 20px;
  }
  .lap {
    display: inline-block;
  }
  button {
    transition: all .3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }
  button:disabled,button[disabled]{
    border: 1px solid white inset;
    color: white;
    background-color: #666;
  }
</style>
