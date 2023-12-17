import React from 'react';
import { Card, Col } from 'react-bootstrap';

interface Props {
  author: string;
  message: string;
  datetime: string;
}

const ChatCard: React.FC<Props> = ({ author, message, datetime }) => {
  const today = new Date(datetime);
  const dateNow = `${today.getDate()}.${
    today.getMonth() + 1
  }.${today.getFullYear()} ${today.getHours()}:${today.getMinutes()}`;

  return (
    <Col>
      <Card style={{ marginBlock: '10px' }}>
        <Card.Header>Sent at: {dateNow}</Card.Header>
        <Card.Body>
          <Card.Title>Author: {author}</Card.Title>
          <Card.Text>{message}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ChatCard;