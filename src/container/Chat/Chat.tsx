import { useCallback, useEffect, useState } from 'react';
import axiosApi from '../../axiosApi';
import ChatCard from '../../components/ChatCard/ChatCard';
import Spinner from '../../components/Spinner/Spinner';
import FormChat from '../../components/FormChat/FormChat';
import { ChatApi, ChatForm } from '../../types';

const Chat = () => {
  const [chats, setChats] = useState<ChatApi[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchChats = useCallback(async () => {
    try {
      const response = await axiosApi.get<ChatApi[]>('/messages');
      setChats(response.data);
    } catch (error) {
      console.log('Fetch chats error ', error);
    }
  }, []);

  useEffect(() => {
    void fetchChats();

    const chatInterval = setInterval(fetchChats, 3000);

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
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-4'>
          <FormChat onSubmit={(event) => onSubmit(event)} />
        </div>
        <div className='col-8'>
          <div className='row row-cols-2'>
            {loading ? <Spinner /> : chats.map((chat) => (
              <ChatCard
                key={chat._id}
                author={chat.author}
                message={chat.message}
                datetime={chat.datetime}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;