import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const STORAGE_KEY = 'videoplayer-current-time';

setCurrentTime();

const handleCurrentTime = el => {
  localStorage.setItem(STORAGE_KEY, el.seconds);
};

player.on('timeupdate', throttle(handleCurrentTime, 1000));

function setCurrentTime() {
  if (localStorage.getItem(STORAGE_KEY)) {
    player.setCurrentTime(localStorage.getItem(STORAGE_KEY));
  }
}
