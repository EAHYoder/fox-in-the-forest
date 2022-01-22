import React, { useEffect, useRef } from "react";
import anime from "animejs/lib/anime.es.js";
import { useSelector, useDispatch } from "react-redux";
import { running } from "animejs";

const Message = (props) => {
  let offPathMessage = useRef(null);
  let gameOverMesage = useRef(null);
  let offPathCount = useSelector((state) => state.offPathCount) || 0;

  useEffect(() => {
    //when the fox oversteps the path, make message appear for 5 seconds and then have it fade.
    if (offPathCount > 0 && offPathCount < 4) {
      let timeline1 = anime.timeline();
      timeline1.add({
        targets: offPathMessage.current,
        opacity: 0,
        duration: 1,
      });
      timeline1.add({
        targets: offPathMessage.current,
        opacity: 1,
        duration: 3000,
      });
      timeline1.add({
        targets: offPathMessage.current,
        opacity: 0,
        duration: 3000,
        delay: 5000,
      });
    }
    //if the fox has now strayed 4 times display game over message
    if (offPathCount === 4) {
      anime({
        targets: gameOverMesage.current,
        opacity: 1,
        duration: 1000,
      });
    }
  }, [offPathCount]);

  //display messaging related to winning the game
  let spaces = useSelector((state) => state.spaces) || [];
  let victoryMesage = useRef(null);
  let remainingGemCount = spaces.length
    ? spaces.reduce((runningCount, currentSpace) => {
        return runningCount + currentSpace.gemCount;
      }, 0)
    : 1;

  useEffect(() => {
    console.log("remaining Gems Count", remainingGemCount);
    if (remainingGemCount === 0) {
      anime({
        targets: victoryMesage.current,
        opacity: 1,
        duration: 1000,
      });
    }
  }, [spaces]);

  return (
    <div>
      <div ref={offPathMessage} className="offPathMessage">
        <h3> The Fox strayed off the path! </h3>
      </div>
      <div ref={gameOverMesage} className="gameOverMesage">
        <h3> The Fox strayed too many times. </h3>
        <h2> GAME OVER </h2>
      </div>
      <div ref={victoryMesage} className="gameOverMesage">
        <h3> YOU WIN! The Fox collected all the gems! </h3>
      </div>
    </div>
  );
};

export default Message;
