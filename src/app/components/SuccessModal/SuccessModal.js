import React, { useEffect, useRef } from "react";
import "./SuccessModal.scss";
import lottie from "lottie-web";

const SuccessModal = ({ toggleSuccess, successModal,setSuccessModal }) => {
  const onClick = () => {
    toggleSuccess(successModal);
  };

  const container = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      autoplay: true,
      loop: false,
      animationData: require("../../assets/lottie/tick.json"),
    });
  }, []);

  return (
    <div>
      <div className="sModal">
        <div className="sModal__pop">
          <div ref={container} className="sModal__lottieContainer"></div>
          <button onClick={onClick}>Continue</button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
