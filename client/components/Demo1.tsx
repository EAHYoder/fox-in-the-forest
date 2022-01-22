import React, { useRef, useLayoutEffect } from "react";
import anime from "animejs/lib/anime.es.js";

const Demo1 = () => {
  //this is a hook that creates a handle that allows us to refer to the dom element which has a property of ref={tracker}
  const tracker = useRef(null);
  const gem = useRef(null);
  const hoverDiv = useRef(null);

  useLayoutEffect(() => {
    let done = false;

    const handleMouseEnter = () => {
      done = false;
      let timeline1 = anime.timeline({
        duration: 2000,
        loop: true,
        loopComplete: (animation) => {
          if (done) {
            animation.pause();
          }
        },
      });

      timeline1.add({
        targets: tracker.current, //to access a DOM element with the useRef hook you need to use this method.
        translateX: 100,
        duration: 1000,
        easing: "easeInOutQuad",
      });

      timeline1.add({
        targets: gem.current,
        opacity: 0,
        duration: 1000,
        easing: "easeInOutQuad",
      });

      timeline1.add({
        targets: tracker.current,
        opacity: 0,
        duration: 300,
        easing: "easeInOutQuad",
      });

      timeline1.add({
        targets: gem.current,
        opacity: 1,
        duration: 300,
        easing: "easeInOutQuad",
      });
    };
    const handleMouseLeave = () => {
      done = true;
    };

    hoverDiv.current.addEventListener("mouseenter", handleMouseEnter);
    hoverDiv.current.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      hoverDiv.current.removeEventListener("mouseenter", handleMouseEnter);
      hoverDiv.current.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="rules-demo" ref={hoverDiv}>
      <div className="path-demo">
        <div className="no-gem">
          <p>1</p>
        </div>
        <div className="tracker-line">
          <div className="tracker-demo" ref={tracker}></div>
        </div>
      </div>
      <div className="path-demo">
        <div className="gem" ref={gem}>
          <p>1</p>
        </div>
        <div className="tracker-line">
          <div className=""></div>
        </div>
      </div>
    </div>
  );
};

export default Demo1;
