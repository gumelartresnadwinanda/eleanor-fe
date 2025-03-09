import React from "react";
import useMediaQuery from "../src/hooks/useMediaQuery";

const ExampleComponent = () => {
  const isPhoneScreen = useMediaQuery("(max-width: 767px)");

  return (
    <div>
      {isPhoneScreen ? (
        <p>Phone screen</p>
      ) : (
        <p>Not a phone screen</p>
      )}
    </div>
  );
};

export default ExampleComponent;
