// could use class here
const Stopwatch = function(elem, options) {

  let timer = createTimer(),
  startButton = createButton("start", start),
  stopButton = createButton("stop", stop),
  resetButton = createButton("reset", reset),
  offset,
  clock,
  interval;

  // default options
  options = options || {};
  options.delay = options.delay || 1;

  // append elements
  elem.appendChild(timer);
  elem.appendChild(document.createElement("br"));
  elem.appendChild(startButton);
  elem.appendChild(stopButton);
  elem.appendChild(resetButton);

  // initialize
  reset();

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
  }

  function stop() {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  }

  function reset() {
    clock = 0;
    render(0);
    stop();
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
  this.start  = start;
  this.stop   = stop;
  this.reset  = reset;
};



let d = document.getElementById("d-timer");
dTimer = new Stopwatch(d, {delay: 100});
