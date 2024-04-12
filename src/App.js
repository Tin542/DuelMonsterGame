import React, { useState, useEffect } from "react";
import {
  Card,
  Modal,
  Typography,
  Col,
  Row,
  Flex,
  Tag,
  Radio,
  Button,
  Spin,
} from "antd";
import { TrophyTwoTone, FrownTwoTone } from "@ant-design/icons";
import "./App.css";
import MonsterCard from "./components/MonsterCard";

const boxStyle = {
  width: "100%",
  height: "auto",
  borderRadius: 6,
  border: "1px solid #40a9ff",
  padding: 20,
};
const fieldStyle = {
  width: "auto",
  height: "auto",
  borderRadius: 6,
  border: "1px solid #40a9ff",
  padding: 10,
  textAlign: "center",
};
const cardStyle = {
  width: "17rem",
  height: "20rem",
  borderRadius: 6,
  border: "1px solid #40a9ff",
  padding: 20,
};
const cardStyleInField = {
  width: "12rem",
  height: "14rem",
  borderRadius: 6,
  border: "1px solid #40a9ff",
  padding: 20,
};
const listImage = [
  "https://i.pinimg.com/564x/13/34/89/133489dbaf9b1d77579567bf052dd12e.jpg",
  "https://i.pinimg.com/736x/cc/05/39/cc05399c0e202eeb8e9d970503538850.jpg",
  "https://pics.craiyon.com/2023-05-22/a4457e79bd5b47f2b5abb2d4bff32346.webp",
  "https://bizweb.dktcdn.net/100/429/539/articles/datxqnu-a0e52dec-fffe-4ba5-8773-d25cdc1adf64.png?v=1662439963027",
  "https://i.pinimg.com/originals/14/81/64/14816447c9a64d767a454c64f136cf2d.jpg",
  "https://e0.pxfuel.com/wallpapers/96/540/desktop-wallpaper-slifer-the-sky-dragon-yu-gi-oh-duel-monsters-yu-gi-oh-egyptian-god-cards-thumbnail.jpg",
  "https://i0.wp.com/ygorganization.com/wp-content/uploads/2020/07/RainbowDragon-TF04-JP-VG.png?resize=544%2C445&ssl=1",
  "https://s1.zerochan.net/Kuriboh.600.4106706.jpg",
  "https://wallpaper-house.com/data/out/10/wallpaper2you_408040.png",
  "https://i.pinimg.com/736x/40/07/fa/4007fa20fd4738f6a312e6b7690fa182.jpg",
];

const CARD_LIST = [
  { id: 0, image: listImage[0], atk: 700 },
  { id: 1, image: listImage[1], atk: 200 },
  { id: 2, image: listImage[2], atk: 1000 },
  { id: 3, image: listImage[3], atk: 1200 },
  { id: 4, image: listImage[4], atk: 500 },
  { id: 5, image: listImage[5], atk: 1300 },
  { id: 6, image: listImage[6], atk: 1800 },
  { id: 7, image: listImage[7], atk: 1700 },
  { id: 8, image: listImage[8], atk: 900 },
  { id: 9, image: listImage[9], atk: 2000 },
];

const { Text, Link } = Typography;
const { confirm } = Modal;

function App() {
  const [playerLifePoint, setPlayerLifePoint] = useState(4000);
  const [comLifePoint, setComLifePoint] = useState(0);
  const [playerHand, setPlayerHand] = useState([]);
  const [isDisabledFight, setIsDisabledFight] = useState(false);
  const [isDisabledNext, setIsDisabledNext] = useState(true);
  const [turn, setTurn] = useState(1);
  const [result, setResult] = useState('');
  // const [comHand, setComHand] = useState([]);
  const [cardSelected, setCardSelected] = useState({
    id: -1,
    image: "",
    atk: 0,
  });

  const [comSelected, setComSelected] = useState({
    id: -1,
    image: "",
    atk: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    setPlayerLifePoint(4000);
    setComLifePoint(4000);
    let player = await generateHand(CARD_LIST);
    setPlayerHand(player);
    setIsDisabledFight(false);
    setIsDisabledNext(true);
    setTurn(1);
  };

  const onClickNexTurn = () => {
    setCardSelected({
      id: -1,
      image: "",
      atk: 0,
    });
    setComSelected({
      id: -1,
      image: "",
      atk: 0,
    });
    setIsDisabledFight(false);
    setIsDisabledNext(true);
    setTurn(prevTurn => prevTurn + 1);
    setResult('');
  };

  const generateHand = async (listATK) => {
    let result = [];
    for (let i = 0; i < 3; i++) {
      let tmp = Math.floor(Math.random() * CARD_LIST.length);
      let atk = listATK.at(tmp);
      result.push({ handid: i, ...atk });
    }
    return result;
  };
  const oppSelectedCard = async () => {
    let tmp = Math.floor(Math.random() * CARD_LIST.length);
    let oppChose = CARD_LIST.at(tmp);
    setComSelected(oppChose);
    return oppChose;
  };
  const resetSelectedCard = () => {
    let tmp = Math.floor(Math.random() * CARD_LIST.length);
    let newCard = CARD_LIST.at(tmp);
    let index = playerHand.indexOf(cardSelected);
    if (index !== -1) {
      playerHand[index] = newCard;
    }
   
  };

  const onClickFightButton = async () => {
    setLoading(true);
    setTimeout(async () => {
      let oppCard = await oppSelectedCard();
      if (oppCard.atk > cardSelected.atk) {
        let damge = oppCard.atk - cardSelected.atk;
        setPlayerLifePoint((prevLP) => {
          setResult('LOOSE')
          if (prevLP - damge <= 0) {
            return showLoseModal();
          }
          return prevLP - damge;
        });
      } else if (oppCard.atk < cardSelected.atk) {
        let damge = cardSelected.atk - oppCard.atk;
        setComLifePoint((prevLP) => {
          setResult('WIN');
          if (prevLP - damge <= 0) {
            return showWinnerModal();
          }
          return prevLP - damge;
        });
      } else {
        console.log("Draw");
      }
      resetSelectedCard();
      setLoading(false);
      setIsDisabledFight(true);
      setIsDisabledNext(false);
    }, 3000);
  };

  const showWinnerModal = () => {
    confirm({
      title: "CONGRATULATION! YOU WIN ",
      icon: <TrophyTwoTone twoToneColor="#8fce00" />,
      content: `Your opponent's Life Point is down to 0 `,
      onOk() {
        init();
      },
      onCancel() {},
    });
  };
  const showLoseModal = () => {
    confirm({
      title: "TOO BAD! YOU LOOSE",
      icon: <FrownTwoTone twoToneColor="#f44336" />,
      content: `Your Life Point is down to 0 `,
      onOk() {
        init();
      },
      onCancel() {},
    });
  };
  return (
    <div className="App">
      <Card
        bordered
        style={{
          width: 500,
          margin: "auto",
          textAlign: "center",
        }}>
        <h1>DUEL MONSTER</h1>
        <hr />
        <Row gutter={[16, 16]}>
          <Col flex="100px">
            <Text strong>PLAYER</Text>
          </Col>
          <Col flex="auto">
            <Text strong>{playerLifePoint}</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col flex="100px">
            <Text strong>COM</Text>
          </Col>
          <Col flex="auto">
            <Text strong>{comLifePoint}</Text>
          </Col>
        </Row>
        <hr />
        
      </Card>
      <Card
        bordered
        style={{
          width: "auto",
          margin: "auto",
          textAlign: "center",
        }}>
        <Flex style={boxStyle} gap="middle" vertical>
          <Flex justify="center" align="center" gap="middle">
            {/* {playerHand.map((item) => (
              <>
                <MonsterCard
                  heightImage={200}
                  widthImage={200}
                  cardStyle={cardStyle}
                  setCardSelected={setCardSelected}
                  item={{
                    id: -1,
                    image: "",
                    atk: 0,
                  }}
                />
              </>
            ))} */}
          </Flex>
          <Flex justify="center" align="center">
            <Card style={fieldStyle}>
              <Spin spinning={loading} tip="Loading...">
                <Flex justify="center" align="center" gap="middle" horizontal>
                  <Flex justify="center" align="center">
                    <MonsterCard
                      heightImage={100}
                      widthImage={100}
                      cardStyle={cardStyleInField}
                      setCardSelected={setCardSelected}
                      item={cardSelected}
                    />
                  </Flex>
                  <Flex justify="center" align="center" vertical gap="small">
                    <Text strong>TURN: {turn}</Text>
                    <Button
                      onClick={onClickFightButton}
                      disabled={isDisabledFight}>
                      FIGHT
                    </Button>
                    <Button onClick={onClickNexTurn} disabled={isDisabledNext}>
                      NEXT TURN
                    </Button>
                    <Text strong>{result}</Text>
                  </Flex>
                  <Flex justify="center" align="center">
                    <MonsterCard
                      heightImage={100}
                      widthImage={100}
                      cardStyle={cardStyleInField}
                      setCardSelected={setComSelected}
                      item={comSelected}
                    />
                  </Flex>
                </Flex>
              </Spin>
            </Card>
          </Flex>
          <Flex justify="center" align="center" gap="middle" horizontal>
            {playerHand.map((item) => (
              <>
                <MonsterCard
                  heightImage={200}
                  widthImage={200}
                  cardStyle={cardStyle}
                  setCardSelected={setCardSelected}
                  item={item}
                />
              </>
            ))}
          </Flex>
        </Flex>
      </Card>
    </div>
  );
}

export default App;
