import React from "react";
import { Card, Image } from "antd";

const { Meta } = Card;

const MonsterCard = (props) => {
  const { item, setCardSelected, cardStyle, widthImage, heightImage } = props;

  let atkPoint = `ATK / ${item.atk}`;

  const onClickCard = () => {
    setCardSelected(item);
  };

  return (
    <>
      {item.id === -1 ? (
        <Card style={cardStyle}>
          <Image
            preview={false}
            width={100}
            height={150}
            src="https://i.ebayimg.com/images/g/pYQAAOSwFJJk3yVH/s-l1200.jpg"
          />
        </Card>
      ) : (
        <Card
          onClick={onClickCard}
          hoverable
          cover={
            <img
              width={widthImage}
              height={heightImage}
              alt="Card"
              src={item.image}
            />
          }
          style={cardStyle}>
          <hr />
          <Meta title={atkPoint} />
        </Card>
      )}
    </>
  );
};
export default MonsterCard;
