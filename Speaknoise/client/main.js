
console.log('a');
import { Meteor } from 'meteor/meteor';
import howler from 'howler';


console.log('b');
var sound = new Howl({
  src: ['sound1.mp3', 'sound1.webm', 'sound1.wav']
});

sound.play();

console.log('done');