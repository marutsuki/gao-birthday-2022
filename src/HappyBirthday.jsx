import React, { useCallback, useEffect, useReducer, useRef, useState } from "react";
import "./HappyBirthday.scss";

function HappyBirthday({ images }) {

    const [clickAudio, setClickAudio] = useState(new Audio("/clap.wav"));
    const [holdAudio, setHoldAudio] = useState(new Audio("/holdclap.wav"));
    const firstRender = useRef(true);
    const imageQueueReducer = (state, action) => {
        return { 
            current: state.next, 
            next: (state.next + 1) % images.length,
            X: 10 + Math.random() * 60,
            Y: 0 + Math.random() * 50
        };
    }

    const [imageState, dispatch] = useReducer(imageQueueReducer, { current: Math.floor(Math.random() * images.length), 
        next: Math.floor(Math.random() * images.length), 
        X: 10 + Math.random() * 60,
        Y: 0 + Math.random() * 50});


    useEffect(() => {
        clickAudio.load();
        holdAudio.load();

        const mouseDownListener = window.addEventListener("mousedown", () => {
            holdAudio.play();
        })
        const mouseUpListener = window.addEventListener("mouseup", () => {
            holdAudio.pause();
            holdAudio.currentTime = 0;
        })
        return () => {
            window.removeEventListener("mousedown", mouseDownListener);
            window.removeEventListener("mouseup", mouseUpListener);
        }
    }, [clickAudio, holdAudio]);
    
    const changeMedia = useCallback(() => {
        dispatch();
    }, [dispatch]);
    
    useEffect(() => {
        setTimeout(() => {
            changeMedia();
            console.log('change media')
        }, images[imageState.current][1]);
    }, [imageState, changeMedia, images]);
    return <section id="happy-birthday">
        { <div className="birthday-img-wrap" style={{left: `${imageState.X}vw`, top: `${imageState.Y}vh`}}>{ images[imageState.current][0] }</div> }
        <h1 id="main-message">HAPPY BIRTHDAY GAO!!</h1>
        
        <div className="snow"/>
        <div className="fade"/>
        
    </section>
}

export default HappyBirthday;