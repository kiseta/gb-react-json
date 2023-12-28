import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function Form() {

  const [newMessage, setNewMessage] = useState("");
  const [newName, setNewName] = useState("");
    const [messages, setMessages] = useState([]);
    
  

  const handleInputChange = (event) => {
    switch (event.target.name) {
      case "name":
        setNewName(event.target.value);
        break;
      case "message":
        setNewMessage(event.target.value);
        break;
      default:
        break;
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then(() => {
        const newEntry = {
          id: '',
          name: newName,
          message: newMessage,
        };

        fetch("/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newEntry),
        })
          .then((response) => response.json())
          .then((data) => setMessages([...messages, data]))
          .then(() => { setNewName("");
            setNewMessage("");
          });
      });
  };

  return (
    <div className='container mt-4'>
      <h1>Sign the Guestbook!</h1>
      <div>
        {" "}
        <form onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor='name'>
              <h4>Name:</h4>
            </label>
            <input type='text' id='name' name='name' value={newName} onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor='message'>
              <h4>Message:</h4>
            </label>
            <textarea id='message' name='message' value={newMessage} onChange={handleInputChange} maxLength='255' rows='10' required />
          </div>
          <div>
            <button type='submit'>SIGN THE GUESTBOOK</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
