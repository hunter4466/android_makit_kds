const msToTime = (duration) => {
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
export default msToTime;
