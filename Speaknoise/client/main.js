import { Template } from 'meteor/templating';
import { howler } from 'howler';
const howler = require('howler');
import './main.html';


var sound = new Howl({
  src: ['bensound.mp3']
});

sound.play();