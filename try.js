class Timer {
  constructor (orderid, millisec) {
    this.id = orderid;
    this.milliseconds = millisec;
    this.time = 'this works';
    this.startTimer();
    this.timerSwitch = true;
  }

  get getTime () {
    return this.time;
  }

  get getId () {
    return this.id;
  }

  set stopTimer (val) {
    this.timerSwitch = val;
  }

  startTimer () {
    const date = Date.now();
    this.time = date - this.milliseconds;
    console.log(this.time);
    setTimeout(() => {
      if (this.timerSwitch) { this.startTimer(this.id, this.milliseconds); }
    }, 1000);
  }
}

const count = 4;

let entries = [
  { id: 1, time: 1636684857910 },
  { id: 2, time: 1636684877910 },
  { id: 3, time: 1636684887910 },
  { id: 4, time: 1636684897910 },
  { id: 5, time: 1636684907910 }
];

const timers = {};
setInterval(() => {
  const timerKeys = Object.keys(timers);
  timerKeys.forEach((e) => {

  });
  timerKeys.forEach((e) => {
    console.log('the time', timers[e].getId, timers[e].getTime);
  });
}, 1000);

setTimeout(() => {
  entries = [
    { id: 1, time: 1636684857910 },
    { id: 2, time: 1636684877910 },
    { id: 5, time: 1636684887910 },
    { id: 7, time: 1636684897910 },
    { id: 8, time: 1636684907910 },
    { id: 10, time: 1636684907910 }
  ];
}, 20000);

msToTime = (duration) => {
  if (duration > 0) {
    const milliseconds = parseInt((duration % 1000) / 100);
    let seconds = Math.floor((duration / 1000) % 60);
    let minutes = Math.floor((duration / (1000 * 60)) % 60);
    let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    let days = Math.floor((duration / (1000 * 60 * 60 * 24)) % 7);

    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;
    days = (days > 0) ? days + ' Días ' : '';
    return days + hours + ':' + minutes + ':' + seconds;
  }
  return 'Loading Timer';
};
