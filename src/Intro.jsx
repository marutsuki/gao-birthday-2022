import React from "react";
import "./Intro.css";
function Intro({ onDone }) {

    return <section id="intro"><button onClick={ onDone }>Start the countdown!</button></section>
}

export default Intro;