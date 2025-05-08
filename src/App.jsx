import { useEffect, useState } from 'react';
import UserCard from './components/UserCard';
import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/peoples')
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error('Erro ao buscar usuarios', err));
  }, []);

  return (
    <div className="App">
      <h1>Dashboard de Usuários</h1>
      <p>Total de usuários: {users.length}</p>
      <div className="user-container">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
      <div className='arrow-container'>
        <button className='arrow'>
          <i className="bi bi-arrow-left"></i>
        </button>
        <p>1 ... ... {users.length / 5}</p>
        <button className='arrow'>
          <i className="bi bi-arrow-right"></i>
        </button>
      </div>
    </div>
  );
}

export default App;