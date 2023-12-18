// src/components/Chat.js
import React, { useState, useEffect } from 'react';
import style from "../Chat/Chat.module.css"

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');



  
  return (
  <div className={style.container}>
    <div><p>Chers utilisateurs,

Nous nous excusons pour les éventuels <br />inconvénients liés à notre chat en cours de développement <br /> Nous travaillons activement à son amélioration <br /> pour vous offrir une expérience optimale. <br /> Merci de votre compréhension.</p></div>

  </div>)
   /*  <div className={style.space}>
    <div className={style.container}>
      <div className={style.messagerie}>
        <p>dfghj</p>
        {messages.map((message, index) => (
          <div key={index}>
            <strong>{message.user}:</strong> {message.text}
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          placeholder='entrer votre message'
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}

          />
        <button>Envoyer</button>
      </div>
    </div>
    </div> */
  
};

export default Chat;



/*   const handleSendMessage = () => {
    // Envoyer le nouveau message au backend
    axios.post('http://localhost:3001/messages', { user: 'étudiant', text: newMessage })
      .then(() => {
        // Rafraîchir la liste des messages après l'envoi
        axios.get('http://localhost:3001/messages')
          .then(response => setMessages(response.data))
          .catch(error => console.error('Erreur lors de la récupération des messages', error));
      })
      .catch(error => console.error('Erreur lors de l\'envoi du message', error));

    setNewMessage('');
  };  */