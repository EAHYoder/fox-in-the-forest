import React, { useEffect, useRef } from "react";

import { useSelector, useDispatch } from "react-redux";

const OffPathCount = (props) => {
  let offPathCount = useSelector((state) => state.offPathCount) || 0;
  return (
    <img
      src={`./images/lost-${offPathCount}.png`}
      className="offPathCount"
    ></img>
  );
};

export default OffPathCount;
