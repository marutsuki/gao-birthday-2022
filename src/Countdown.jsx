import React, { useEffect, useRef, useState } from "react";
import "./Countdown.scss";
function Countdown({ initBeat, beats, bpm, onDone, images }) {
    const [ticks, setTicks] = useState(0);
    const [audio, _] = useState(new Audio("/beat.mp3"));
    const interval = useRef(null);
    const firstBeat = useRef(false);
    useEffect(() => {
        if (!audio) {
            return;
        }
        audio.load();

        if (ticks === beats) {
            clearInterval(interval.current);
            onDone();
            return;
        }
        if (firstBeat.current) {
            return;
        }
        const updateTime = () => {
            console.log('update time')
            if (ticks === beats) {
                return;
            }
            console.log(ticks)
            setTicks(ticks => ticks + 1);
        };
        if (initBeat) {

            setTimeout(() => {
                audio.volume = ticks / (beats + 1);
                audio.play();
                console.log('timeout')
                interval.current = setInterval(() => {
                    console.log('interval')
                    audio.volume = ticks / (beats + 1);
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
        firstBeat.current = true;
        return () => {
            clearInterval(interval.current);
        }
    }, [audio]);

    return <section key = { ticks + "tick" } id="countdown">
        <div className={`fade`}/>
        { images[ticks] && <img className="countdown-slide" src={images[ticks]}/> }
        <h1>{ firstBeat.current ?beats - ticks : "" }</h1>
        
    </section>
}

export default Countdown;