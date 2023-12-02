import React from 'react';

interface Props {
  author: string;
  message: string;
  datetime: string;
}

const ChatCard: React.FC<Props> = ({ author, message, datetime }) => {
  return (
    <div className='col-6'>
      <div className='card mb-3'>
        <div className='card-header'>Sent at: {datetime}</div>
        <div className='card-body'>
          <h5 className='card-title'>Author: {author}</h5>
          <p className='card-text'>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatCard;