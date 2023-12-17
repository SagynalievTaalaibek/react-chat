import React, { useState } from 'react';
import { ChatForm } from '../../types';

interface Props {
  onSubmit: (chat: ChatForm) => void;
}

const FormChat: React.FC<Props> = ({ onSubmit }) => {
  const [chat, setChat] = useState({
    message: '',
    author: '',
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setChat((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmitForm = (event: React.FormEvent) => {
    event.preventDefault();

    onSubmit(chat);

    setChat({
      message: '',
      author: '',
    });
  };

  return (
    <>
      <form onSubmit={onSubmitForm}>
        <h3>Sent chat</h3>
        <div className='mb-3'>
          <label htmlFor='author' className='form-label'>
            Author
          </label>
          <input
            type='text'
            name='author'
            id='author'
            className='form-control'
            required
            value={chat.author}
            onChange={onChange}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='message' className='form-label'>
            Message
          </label>
          <textarea
            name='message'
            id='message'
            className='form-control'
            required
            value={chat.message}
            onChange={onChange}
          />
        </div>
        <button className='btn btn-primary'>Sent</button>
      </form>
    </>
  );
};

export default FormChat;