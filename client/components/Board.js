import React, { useEffect } from "react";
import Space from "./Space";
import { fetchSpaces } from "../store/spaces";
import { useSelector, useDispatch } from "react-redux";

const Board = () => {
  let spaces = useSelector((state) => state.spaces) || [];

  let dispatch = useDispatch();

  useEffect(() => {
    const fetch = async () => await dispatch(fetchSpaces());
    fetch();
  }, []);

  return (
    <div id="board">
      <div className="larger-path">
        {spaces.map((space) => {
          return <Space key={space.id} space={space} />;
        })}
      </div>
    </div>
  );
};

export default Board;
