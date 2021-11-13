class Timer {
    constructor(orderid, millisec) {
      this.id = orderid
      this.milliseconds = millisec
      this.time = 'this works'
      this.startTimer();
      this.timerSwitch = true;
    }
    get getTime () {
      return this.time
    }
    get getId () {
      return this.id
    }
    set stopTimer (val) {
        this.timerSwitch = val;
    }
    startTimer () {
        const date = Date.now()
        this.time = date - this.milliseconds
        console.log(this.time)
        setTimeout(() => {
          if(this.timerSwitch){this.startTimer(this.id, this.milliseconds);}
        }, 1000);
    }
}   
export default Timer;