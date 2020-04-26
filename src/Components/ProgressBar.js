import React, { useState, useLayoutEffect, useEffect, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import Dog from "Images/Progress/Dog.png";
import HomeBF from "Images/Progress/home_bf.png";
import Home from "Images/Progress/home.png";

const useInterval = (callback, delay) => {
  const progressRef = useRef();

  // remember latest callback
  useEffect(() => {
    progressRef.current = callback;
  }, [callback]);

  // setup the interval
  useEffect(() => {
    function tick() {
      progressRef.current();
    }

    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

const ProgressBar = (props) => {
  const [progress, setProgress] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(false);
  //   const [showResult, setShowResult] = useState(false);

  //   useCallback(() => {
  //     const a = useInterval(() => {
  //       setProgress(progress + 1);
  //     }, 100);
  //   }, [a]);

  const clickResult = () => {
    setResult(true);
  };
  useLayoutEffect(() => {
    const interval =
      progress < 100 &&
      setInterval(() => {
        setProgress(progress + 1);
      }, 100);
    progress === 100 && setShowResult(true);
    return () => clearInterval(interval);
  }, [progress]);
  return (
    <>
      <Wrapper>
        {/* <BarWrapper> */}
        <Title>잠시만 기다려주세요...!</Title>
        <ProgressBox>
          <MovingDog progress={progress}></MovingDog>
          <HomeDog progress={progress}></HomeDog>
          <InProgress progress={progress}></InProgress>
        </ProgressBox>
        {/* </BarWrapper> */}
        <Result showResult={showResult} onClick={clickResult}>
          결과보기
        </Result>
      </Wrapper>
    </>
  );
};

export default ProgressBar;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

// const BarWrapper = styled.div`
//   width: 100%;
//   height: 300px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
// `;

const Title = styled.div`
  width: 80%;
  height: 50px;
  font-size: 20px;
  color: white;
  border: 2px solid white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 100px;
`;

const ProgressBox = styled.div`
  width: 80%;
  height: 30px;
  border: 2px solid white;
  position: relative;
`;

const MovingDog = styled.div`
    width: 40px;
    height: 40px;
    background: url('${Dog}') no-repeat;
    background-position-x: ${(props) =>
      props.progress % 2 ? "5px" : "-35.5px"};
    background-size: 75px;
    position: absolute;
    top: -35px;
    left: ${(props) => props.progress * 5}px;
    z-index: 5;
`;
const HomeDog = styled.div`
    width: 60px;
    height: 60px;
    background: url('${(props) =>
      props.progress % 2 ? Home : HomeBF}') no-repeat;
    background-size: cover;
    position: absolute;
    top: -52px;
    right: -11px;
    z-index: 10;

`;
const InProgress = styled.div`
  width: ${(props) => props.progress && props.progress}%;
  height: 100%;
  position: absolute;
  background-color: white;
  left: 0;
  top: 0;
`;

const Result = styled.div`
  width: 100px;
  height: 50px;
  font-size: 20px;
  color: white;
  border: 2px solid white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  cursor: pointer;

  visibility: ${props => (props.showResult ? "visible" : "hidden")};
`;
