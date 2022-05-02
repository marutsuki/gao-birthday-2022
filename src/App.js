import './App.css';
import { useEffect, useState } from 'react';
import Intro from './Intro';
import HappyBirthday from './HappyBirthday';
import Countdown from './Countdown';

const initBeat = 525;
const bpm = 1643.83561644;

const images = [
  null,
  "/countdown/1.jpg",
  "/countdown/2.jpg",
  "/countdown/3.jpg",
  "/countdown/4.jpg",
  "/countdown/5.png",
  "/countdown/6.jpg",
  "/countdown/7.jpg"
]
const birthdayImages = [
  [<img className="birthday-img" src="/bdayimages/1.jpg"></img>, 2000],
  [<img className="birthday-img" src="/bdayimages/2.jpg"></img>, 2000],
  [<img className="birthday-img" src="/bdayimages/3.jpg"></img>, 2000],
  [<img className="birthday-img" src="/bdayimages/4.jpg"></img>, 2000],
  [<video className="birthday-img" autoPlay><source src="/bdayimages/17.mp4"></source></video>, 9000],
  [<img className="birthday-img" src="/bdayimages/5.png"></img>, 2000],
  [<img className="birthday-img" src="/bdayimages/6.jpg"></img>, 2000],
  [<img className="birthday-img" src="/bdayimages/7.jpg"></img>, 2000],
  [<img className="birthday-img" src="/bdayimages/8.jpg"></img>, 2000],
  [<img className="birthday-img" src="/bdayimages/9.jpg"></img>, 2000],
  [<video className="birthday-img" autoPlay><source src="/bdayimages/24.mov"></source></video>, 4000],
  [<img className="birthday-img" src="/bdayimages/10.jpg"></img>, 2000],
  [<img className="birthday-img" src="/bdayimages/11.jpg"></img>, 2000],
  [<img className="birthday-img" src="/bdayimages/12.png"></img>, 2000],
  [<img className="birthday-img" src="/bdayimages/13.jpg"></img>, 2000],
  [<video className="birthday-img" autoPlay><source src="/bdayimages/22.mp4"></source></video>, 16000],
  [<img className="birthday-img" src="/bdayimages/14.jpg"></img>, 2000],
  [<img className="birthday-img" src="/bdayimages/15.jpg"></img>, 2000],
  [<img className="birthday-img" src="/bdayimages/16.jpg"></img>, 2000],
  [<img className="birthday-img" src="/bdayimages/18.png"></img>, 2000],
  [<video className="birthday-img" autoPlay><source src="/bdayimages/19.mp4"></source></video>, 9000],
  [<img className="birthday-img" src="/bdayimages/20.jpg"></img>, 2000],
  [<img className="birthday-img" src="/bdayimages/21.png"></img>, 2000],
  [<video className="birthday-img" autoPlay><source src="/bdayimages/25.mov"></source></video>, 15000]
]

function App() {
  const [phase, setPhase] = useState(0);
  const [audio, _] = useState(new Audio("/bgm.mp3"));

  const finishIntro = () => {
    nextPhase();

    const playAudio = () => {
        audio.volume = 0.7;
        audio.play().catch(err => {
            console.log(err);
        });
    }
    
    playAudio();
  }
  const nextPhase = () => {
    phases[phase] = null;
    setPhase(p => p + 1);
  }

  const phases = [
    <Intro onDone = { finishIntro }/>,
    <Countdown initBeat = { initBeat } beats = { 8 } bpm = { bpm } onDone = { nextPhase } images = { images }/>,
    <HappyBirthday images = { birthdayImages }/>
  ];
  useEffect(() => {
    audio.load();
}, []);
  return (
    <div className="App">
      { phases[phase] }
    </div>
  );
}

export default App;
