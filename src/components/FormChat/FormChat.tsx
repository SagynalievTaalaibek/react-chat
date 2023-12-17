import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
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
      <Form onSubmit={onSubmitForm}>
        <h3>Sent chat</h3>
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='author'>Author</Form.Label>
          <Form.Control
            type='text'
            name='author'
            id='author'
            required
            value={chat.author}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='message'>Message</Form.Label>
          <Form.Control
            as='textarea'
            rows={3}
            name='message'
            id='message'
            required
            value={chat.message}
            onChange={onChange}
          />
        </Form.Group>
        <Button variant='primary' type='submit'>Sent</Button>
      </Form>
    </>
  );
};

export default FormChat;