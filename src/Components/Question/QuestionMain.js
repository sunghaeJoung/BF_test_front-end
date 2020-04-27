import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { URL } from "config";

const QuestionMain = (props) => {
  const [quesData, setData] = useState({});
  const [quesNum, setQuesNum] = useState(1);
  const [quesNumUrl, setQuesNumUrl] = useState(1);
  const [pickedData, setPickData] = useState({});
  const [type, setType] = useState();
  const [sendResult, setSendResult] = useState(false);

  const clickChoice = (index) => {
    // setFinished(false);
    // 밑에 두 줄은 마지막 문제일 때, 결과보내는 용
    setSendResult(true);

    setQuesNum(quesNum + 1);
    //quesNumUrl를 이용해서 데이터 통신을 해야힘
    setQuesNumUrl(quesNumUrl + 1);

    setPickData({ ...pickedData, [quesData.id]: quesData.choice[index].id });
    if (quesNum === 13) {
      if (quesNumUrl === 14) {
        if (index === 0) {
          setType("A");
          props.getData(pickedData, type);
          props.getLoadingStatus(true);
        } else {
          setType("B");
          props.getData(pickedData, type);
          props.getLoadingStatus(true);
        }
      } else if (quesNumUrl === 15) {
        setType("A");
        props.getData(pickedData, type);
        props.getLoadingStatus(true);
      } else {
        setType("C");
        props.getData(pickedData, type);
        props.getLoadingStatus(true);
      }
    } else {
      if (quesNumUrl === 11) {
        if (index === 0) {
          setQuesNumUrl(quesNumUrl + 1);
        } else {
          setQuesNumUrl(quesNumUrl + 2);
        }
      } else if (quesNumUrl === 12) {
        if (index === 0) {
          setQuesNumUrl(quesNumUrl + 2);
        } else {
          setQuesNumUrl(quesNumUrl + 3);
        }
      } else if (quesNumUrl === 13) {
        if (index === 0) {
          setQuesNumUrl(quesNumUrl + 1);
        } else {
          setQuesNumUrl(quesNumUrl + 3);
        }
      }
    }
  };

  // console.log("타입들어가는지 확인중", pickedData);
  const fetchFirstQuestion = async () => {
    try {
      const gotFirstQues = await axios.get(`${URL}/poll/${quesNumUrl}`);
      const data = await gotFirstQues.data.question_data;

      setData(data);
      // setAppearChoice(false);
    } catch (error) {
      console.log(error);
      alert("다시 시도 바랍니다.");
    }
  };

  // setTimeout을 데이터 통신에 사용하는 것이 아닌 id값을 가지고 1일때, setTimeout을 해준다.
  useEffect(() => {
    if (quesNum === 1) {
      setTimeout(() => {
        fetchFirstQuestion();
      }, 13500);
    } else if (quesNum === 14) {
      props.getData(pickedData, type);
      props.getLoadingStatus(true);
    } else {
      fetchFirstQuestion();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quesNum]);

  return quesData.choice ? (
    <QBoxWrapper loading={props.loading}>
      <QBoxContainer>
        <QuestionBox>
          <div>
            {quesNum}. {quesData.question}
          </div>
        </QuestionBox>
        {quesData.image_url ? (
          <QImgBox>
            <QImg src={quesData.image_url}></QImg>
          </QImgBox>
        ) : (
          ""
        )}
        <TextSelectBox>
          <SelectOutLineDiv onClick={() => clickChoice(0)}>
            <TextSelect>{quesData.choice[0].choice}</TextSelect>
          </SelectOutLineDiv>
          <SelectOutLineDiv onClick={() => clickChoice(1)}>
            <TextSelect>{quesData.choice[1].choice}</TextSelect>
          </SelectOutLineDiv>
        </TextSelectBox>
      </QBoxContainer>
    </QBoxWrapper>
  ) : (
    <div></div>
  );
};
export default QuestionMain;

const QBoxWrapper = styled.div`
  width: 90%;
  margin: 35px auto 0 auto;
  display: ${(props) => (props.loading ? "none" : "block")};

  @media only screen and (max-width: 400px) {
    margin: 5px auto 0 auto;
  }
`;

const QBoxContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const QuestionBox = styled.div`
  font-size: 22px;
  color: white;
  line-height: 35px;

  @media only screen and (max-width: 415px) {
    font-size: 1.2rem;
  }
  @media only screen and (max-width: 320px) {
    font-size: 16px;
  }
`;

const QImgBox = styled.div`
  margin: 10px auto 0;
  text-align: center;
  @media only screen and (max-width: 415px) {
    margin: 30px auto 20px;
  }
`;

const QImg = styled.img`
  width: 60%;

  @media only screen and (max-width: 415px) {
    width: 80%;
  }
`;

const TextSelectBox = styled.div``;

const SelectOutLineDiv = styled.div`
  width: 100%;
  border: 1px solid white;
  margin-top: 20px;
  padding: 2px;
  display: ${(props) => (props.display ? "block" : "none")};
  display: block;
`;

const TextSelect = styled.div`
  color: white;
  border: 1px solid white;
  font-size: 18px;
  padding: 13px;
  &:hover {
    color: #244c88;
    background-color: white;
  }
  cursor: pointer;
  @media only screen and (max-width: 770px) {
    &:hover {
      color: white;
      background-color: #244c88;
    }
  }
  @media only screen and (max-width: 320px) {
    font-size: 16px;
  }
`;
