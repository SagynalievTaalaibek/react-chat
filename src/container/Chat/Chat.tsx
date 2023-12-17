import { useCallback, useEffect, useState } from 'react';
import axiosApi from '../../axiosApi';
import ChatCard from '../../components/ChatCard/ChatCard';
import Spinner from '../../components/Spinner/Spinner';
import FormChat from '../../components/FormChat/FormChat';
import { Col, Container, Row } from 'react-bootstrap';
import { ChatApi, ChatForm } from '../../types';

const Chat = () => {
  const [chats, setChats] = useState<ChatApi[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchChats = useCallback(async () => {
    try {
      const response = await axiosApi.get<ChatApi[]>('/messages');
      setChats(response.data);
    } catch (error) {
      alert('Fetch chats error ' + error);
    }
  }, []);

  useEffect(() => {
    void fetchChats();

    const chatInterval = setInterval(fetchChats, 5000);

    return () => clearInterval(chatInterval);
  }, [fetchChats]);


  const onSubmit = async (chat: ChatForm) => {
    setLoading(true);

    try {
      const data = new URLSearchParams();
      data.append('message', chat.message);
      data.append('author', chat.author);

      await axiosApi.post('messages', data);
    } catch (error) {
      alert('Error: ' + error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <Container>
      <Row>
        <Col xs={4}>
          <FormChat onSubmit={(event) => onSubmit(event)} />
        </Col>
        <Col xs={8}>
          <Row xs={1} md={2}>
            {loading ? <Spinner /> : chats.map((chat) => (
              <ChatCard
                key={chat._id}
                author={chat.author}
                message={chat.message}
                datetime={chat.datetime}
              />
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;