import React, { useEffect, useRef, useState } from "react";
import "./Countdown.scss";
function Countdown({ initBeat, beats, bpm, onDone, images }) {
    const [ticks, setTicks] = useState(0);
    const [audio, _] = useState(new Audio("/beat.mp3"));
    const interval = useRef(null);
    const firstBeat = useRef(false);
    useEffect(() => {
        let _tick = 1;
        if (ticks === beats) {
            clearInterval(interval.current);
            onDone();
            return;
        }
        if (firstBeat.current) {
            return;
        }
        const updateTime = () => {
            if (ticks == beats) {
                return;
            }
            setTicks(ticks => ticks + 1);
            _tick++;
        };
        if (initBeat) {

            setTimeout(() => {
                audio.volume = _tick / (beats + 1);
                audio.play();
                interval.current = setInterval(() => {
                    audio.volume = _tick / (beats + 1);
                    audio.play().catch(err => {
                        console.log(err);
                    });
                    updateTime();
                }, bpm);
                updateTime();
            }, initBeat);
        } else {
            interval.current = setInterval(() => {
                audio.play();
                updateTime();
            }, bpm);
        }
        audio.load();
        firstBeat.current = true;
        return () => {
            clearInterval(interval.current);
        }
    }, [ticks]);

    return <section key = { ticks + "tick" } id="countdown">
        <div className={`fade`}/>
        { images[ticks] && <img className="countdown-slide" src={images[ticks]}/> }
        <h1>{ firstBeat.current ?beats - ticks : "" }</h1>
        
    </section>
}

export default Countdown;