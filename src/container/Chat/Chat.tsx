import ChatCard from '../../components/ChatCard/ChatCard';
import { useState } from 'react';

const Chat = () => {
  const [chats, setChats] = useState();

  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-4'>
        </div>
        <div className='col-8'>
          <div className='row row-cols-2'>
            <div className='col-6'>
              <ChatCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;