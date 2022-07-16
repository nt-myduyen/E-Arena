import { Col, Modal, Row } from "antd";
import { Content } from "antd/lib/layout/layout";
import axios from "axios";
import confetti from "canvas-confetti";
import { useEffect, useState } from "react";
import UserItem from "../components/UserItem";
const GamePlay = () => {
  const [countDown, setCountDown] = useState(0);
  const [runTimer, setRunTimer] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [anwser, setAnwser] = useState("");
  const [buttonStyle, setButtonStyle] = useState("");
  const [quesCorrect, setQuesCorrect] = useState("");
  const [btnChoice, setBtnChoice] = useState();
  const [isShowCorrect, setIsShowCorrect] = useState(false);
  const [numQues, setNumQues] = useState(0);
  const [myScore, setMyScore] = useState(7921);
  useEffect(() => {
    let timerId;

    if (runTimer) {
      setCountDown(10);
      setIsShowCorrect(false);
      timerId = setInterval(() => {
        setCountDown((countDown) => countDown - 1);
      }, 1000);
    } else {
      clearInterval(timerId);
    }

    return () => clearInterval(timerId);
  }, [runTimer]);
  const englishquestions = [
    {
      question:
        "Choose the word that has a different stress pattern from the others.",
      A: "dangerous",
      B: "plentiful",
      C: "limited",
      D: "another",
      correct: "dangerous",
    },
    {
      question:
        "She’s a police officer, so she has to wear a _________ at work.",
      A: "clothes",
      B: "dress",
      C: "police suit",
      D: "uniform",
      correct: "police suit",
    },
    {
      question:
        "They never argue and they enjoy spending time together. = They _________.",
      A: " like themselves very much",
      B: " relationship very good",
      C: "get on very well",
      D: "relate very well",
      correct: "get on very well",
    },
    {
      question: "I _________ swimming every Saturday morning.",
      A: "go",
      B: "do",
      C: "play",
      D: "enjoy",
      correct: "go",
    },
    {
      question: "Argh! This noise is giving me a _________.",
      A: "headouch",
      B: "headache",
      C: "headpain",
      D: "headhurt",
      correct: "headache",
    },
  ];
  console.log(englishquestions.length);
  const fetchData = async () => {
    // const res = await axios.get(
    //   "https://dbb2-117-2-255-218.ap.ngrok.io/courses"
    // );
    console.log("test");
    const res = await fetch(
      "https://dbb2-117-2-255-218.ap.ngrok.io/courses"
    ).then((response) => response.json());
    console.log(res);
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (countDown < 0 && runTimer) {
      console.log("expired");
      setRunTimer(false);
      setCountDown(0);
      setIsShowCorrect(true);
      if (anwser === quesCorrect) {
        confetti({
          particleCount: 150,
        });
        console.log("dap an dung");
        setMyScore((prv) => prv + Math.floor(Math.random() * 1000 + 300));
        btnChoice.style.background = "green";
      } else {
        btnChoice.style.background = "red";
      }
      if (numQues < englishquestions.length - 1) {
        setTimeout(() => {
          setNumQues((prv) => prv + 1);
          console.log("++");
          setCountDown(10);
          btnChoice.style.background = "";
          setBtnChoice("");
          setButtonStyle("");
          setIsShowCorrect(false);
          setRunTimer(true);
          setQuesCorrect("");
          setAnwser("");
        }, 3000);
      }
    }
  }, [countDown, runTimer, anwser, quesCorrect, numQues]);
  console.log(numQues);
  const seconds = String(countDown % 60).padStart(2, 0);
  const minutes = String(Math.floor(countDown / 60)).padStart(2, 0);
  console.log(seconds, minutes);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onChooseAnwser = (aw, qs, e) => {
    console.log(aw, qs);
    setAnwser(aw);
    setQuesCorrect(qs);
    setBtnChoice(e.target);
    e.target.style.background = "#6E85B7";
    setButtonStyle("not-allowed");
    e.target.style.cursor = "pointer";
  };
  return (
    <Content className="relative w-full min-h-screen">
      <Modal title="Basic Modal" visible={isModalVisible}>
        <p>Hết giờ hehe</p>
      </Modal>
      <div className="absolute w-64 min-h-full top-0 left-0   border-4">
        <span className="text-3xl font-bold text-cyan-500 my-4 block">
          Người chơi
        </span>
        <UserItem score={myScore} name="n3iV" />
        <UserItem score={6732} />
        <UserItem score={6321} />
        <UserItem score={6299} />
      </div>
      <div className="relative">
        <div className="w-12 h-6 absolute top-4 right-12">
          <span className="font-bold text-2xl">
            {minutes}:{seconds}
          </span>
        </div>
        <div className=" absolute w-2/4 top-0 left-1/2 -translate-x-1/2 mt-24">
          <h1 className="font-bold text-4xl">
            Question {numQues + 1}: {englishquestions[numQues].question}
          </h1>
          <Row gutter={[24, 24]} className="mt-8">
            <Col className="gutter-row" span={12}>
              <button
                onClick={(e) =>
                  onChooseAnwser(
                    englishquestions[numQues].A,
                    englishquestions[numQues].correct,
                    e
                  )
                }
                className={` text-white w-full rounded-lg py-4 bg-slate-400  cursor-${buttonStyle}`}
              >
                A {englishquestions[numQues].A}
              </button>
            </Col>
            <Col className="gutter-row" span={12}>
              <button
                onClick={(e) =>
                  onChooseAnwser(
                    englishquestions[numQues].B,
                    englishquestions[numQues].correct,
                    e
                  )
                }
                className={` text-white w-full rounded-lg py-4 bg-slate-400 cursor-${buttonStyle}`}
              >
                B {englishquestions[numQues].B}
              </button>
            </Col>
            <Col className="gutter-row" span={12}>
              <button
                onClick={(e) =>
                  onChooseAnwser(
                    englishquestions[numQues].C,
                    englishquestions[numQues].correct,
                    e
                  )
                }
                className={` text-white w-full rounded-lg py-4 bg-slate-400 cursor-${buttonStyle}`}
              >
                C {englishquestions[numQues].C}
              </button>
            </Col>
            <Col className="gutter-row" span={12}>
              <button
                onClick={(e) =>
                  onChooseAnwser(
                    englishquestions[numQues].A,
                    englishquestions[numQues].correct,
                    e
                  )
                }
                className={` text-white w-full rounded-lg py-4 bg-slate-400 cursor-${buttonStyle}`}
              >
                D {englishquestions[numQues].D}
              </button>
            </Col>
          </Row>
          <div className={`mt-8 ${isShowCorrect ? "block" : "hidden"}`}>
            Đáp án đúng là:{" "}
            <span className="text-3xl font-bold text-green-400">
              {quesCorrect}
            </span>
          </div>
        </div>
      </div>
    </Content>
  );
};

export default GamePlay;
