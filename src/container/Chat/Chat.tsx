import { useEffect, useState } from 'react';
import ChatCard from '../../components/ChatCard/ChatCard';
import { ChatApi } from '../../types';
import axiosApi from '../../axiosApi';
import Preloader from '../../components/Preloader/Preloader';

const Chat = () => {
  const [chats, setChats] = useState<ChatApi[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchChats = async () => {
      setLoading(true);
      try {
        const response = await axiosApi.get<ChatApi[]>('/messages');

        setChats(response.data);
      } catch (e) {
        alert('Error ' + e);
      } finally {
        setLoading(false);
      }
    };

    void fetchChats();
  }, []);

  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-4'>
        </div>
        <div className='col-8'>
          <div className='row row-cols-2'>
            {chats.map((chat) => (
              <ChatCard
                key={chat._id}
                author={chat.author}
                message={chat.message}
                datetime={chat.datetime}
              />
            ))}
          </div>
        </div>
        {loading && <Preloader />}
      </div>
    </div>
  );
};

export default Chat;