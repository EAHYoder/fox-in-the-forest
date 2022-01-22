import React, { useRef, useLayoutEffect } from "react";
import anime from "animejs/lib/anime.es.js";

const Demo4 = () => {
  //this is a hook that creates a handle that allows us to refer to the dom element which has a property of ref={tracker}
  const tracker = useRef(null);
  const disappearingPath = useRef(null);
  const gem = useRef(null);
  const hoverDiv = useRef(null);

  useLayoutEffect(() => {
    let done = false;

    const handleMouseEnter = () => {
      done = false;
      let timeline1 = anime.timeline({
        duration: 4900,
        loop: true,
        loopComplete: (animation) => {
          if (done) {
            animation.pause();
          }
        },
      });
      //move the fox off path
      timeline1.add({
        targets: tracker.current,
        translateX: 200,
        duration: 1000,
        easing: "easeInOutQuad",
      });
      //make the end of path disappear
      timeline1.add({
        targets: disappearingPath.current,
        opacity: 0,
        duration: 1000,
        easing: "easeInOutQuad",
      });
      //make the gem appear at the new end of path
      timeline1.add({
        targets: gem.current,
        opacity: 1,
        duration: 300,
        easing: "easeInOutQuad",
      });
      //make the fox disappear
      timeline1.add({
        targets: tracker.current,
        opacity: 0,
        duration: 300,
        easing: "easeInOutQuad",
      });
      //move the fox to the new end of path
      timeline1.add({
        targets: tracker.current,
        translateX: 0,
        duration: 1,
        easing: "easeInOutQuad",
      });
      //make the fox reappear
      timeline1.add({
        targets: tracker.current,
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
          <div className=""></div>
        </div>
      </div>
      <div className="path-demo">
        <div className="gem-appear-demo" ref={gem}>
          <p>1</p>
        </div>
        <div className="tracker-line">
          <div className="tracker-demo" ref={tracker}></div>
        </div>
      </div>
      <div className="path-demo" ref={disappearingPath}>
        <div className="gem">
          <p>1</p>
        </div>
        <div className="tracker-line">
          <div className=""></div>
        </div>
      </div>
      <div className="off-path-demo"></div>
    </div>
  );
};

export default Demo4;
