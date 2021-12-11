import { useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const [users, setUsers] = useState([])
  // this take for from onSubmit
  const nameRef = useRef();
  const emailRef = useRef();

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json()
      )
      .then(data => setUsers(data)

      );

  }, [])

  const handleAddUser = e => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;

    // send data to the server
    const newUser = { name: name, email: email }

    fetch('http://localhost:5000/users', {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newUser)
    }).then(res => res.json())
      .then(data => {
        console.log(data)
        const addedUser = data;
        const newUser = [...users, addedUser];
        setUsers(newUser)

      })
    nameRef.current.value = '';
    emailRef.current.value = '';

    e.preventDefault()
  }
  return (
    <div className="App">
      <h2>Found Users : {users.length}</h2>
      <form onSubmit={handleAddUser}>
        <input type='text' ref={nameRef} placeholder='name' />
        <input type='email' ref={emailRef} placeholder='your email' />
        <input type='submit' value='submit' />
      </form>
      <ul>
       {/* map the all user */}
        {users.map(user =>
          <li key={user.id}>{user.id}.{user.name}</li>
        )}
      </ul>
    </div>
  );
}

export default App;
