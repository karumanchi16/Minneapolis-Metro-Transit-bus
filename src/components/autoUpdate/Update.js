import { useEffect, useState } from "react";
import Button from "../button";

const Update = ({ updatedTime, callback }) => {
  const [timer, setTimer] = useState(25);

  useEffect(() => {
    let timerFuc;
    if (timer > 0) {
      timerFuc = setTimeout(() => setTimer(timer - 1), 1000);
    } else {
      callback();
      setTimer(25);
    }
    return () => {
      clearTimeout(timerFuc);
    };
  }, [timer, callback]);

  return (
    <>
      <p style={{ fontSize: "16px" }}>
        Last updated at {updatedTime.getHours()}:{updatedTime.getMinutes()} and{" "}
        {updatedTime.getSeconds()} seconds – Next automatic update in {timer}{" "}
        Seconds &nbsp; &nbsp; &nbsp;
        <Button
          onClick={callback}
          label={"Update Now"}
          primary
          size={"large"}
        />
      </p>
    </>
  );
};
export default Update;
