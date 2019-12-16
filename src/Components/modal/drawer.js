import React, { useState, useEffect } from "react";
import { TimelineLite, CSSPlugin } from "gsap/all";


const Drawer = () => {


    // logo container
    let logoContainer;
    // logo tween
    let logoTween;



    useEffect(() => {
        // create logo tween
        logoTween = new TimelineLite({ paused: true })
            .to(this.logoContainer, 2, { x: 500 })
            .to(this.logoContainer, 1, { rotation: 360, transformOrigin: "center" });
    }, []);



    return <>


        <button
            className="btn gsap-btn"
            onClick={() => logoTween.play()}
        >Play</button>

        <img
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/16327/logo-man.svg"
            alt=""
            className="img-fluid logo"
            ref={img => logoContainer = img}
        />



    </>;


}

export default Drawer;