const Timer = function(elem, options) {

  let timer = createTimer(),
  startButton = createButton("start", start),
  pauseButton = createButton("pause", pause),
  doneButton = createButton("done", done),
  offset,
  clock,
  name,
  interval;

  // default options
  options = options || {};
  options.delay = options.delay || 1;

  // append elements
  elem.appendChild(timer);
  elem.appendChild(document.createElement("br"));
  elem.appendChild(startButton);
  elem.appendChild(pauseButton);
  elem.appendChild(doneButton);

  // initialize
  done();

  // private functions
  function createTimer() {
    return document.createElement("span");
  }

  function createButton(action, handler) {
    let butt = document.createElement("button");
    butt.innerHTML = action;
    // butt.style = "display: inline-block;"
    butt.addEventListener("click", function(event) {
      handler();
      event.preventDefault();
    });
    return butt;
  }

  function start() {
    if (!interval) {
      offset   = Date.now();
      interval = setInterval(update, options.delay);
    }
  }obj

  function pause() {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  }

  function done() {
    clock = 0;
    render(0);
    pause();
  }

  function update() {
    clock += delta();
    render();
  }

  function render() {
    timer.innerHTML = clock/1000;
  }

  function delta() {
    let now = Date.now(),
        d   = now - offset;

    offset = now;
    return d;
  }

  // public API
  this.start = start;
  this.pause = pause;
  this.done  = done;
};

let TIME = new Vue( {
  el: '#name',
  data: {

  }
})
let name = document.getElementById('name');
console.log(name.value + "%%%%%");
let a = document.getElementById("a-timer");
a_timer = new Timer(d, {delay: 100});
