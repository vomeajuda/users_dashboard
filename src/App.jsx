import { useEffect, useState } from 'react';
import UserCard from './components/UserCard';
import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  const [users, setUsers] = useState([]);
  const [pagAtual, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch('http://localhost:3001/peoples')
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error('Erro ao buscar usuarios', err));
  }, []);

  const ultimoUser = pagAtual * 5;
  const primeiroUser = ultimoUser - 5;
  const usersAtuais = users.slice(primeiroUser, ultimoUser);

  const proxima = () => {
    if (pagAtual < Math.ceil(users.length / 5)) {
      setCurrentPage(pagAtual + 1);
    } else {
      setCurrentPage(1);
    }
  };

  const anterior = () => {
    if (pagAtual > 1) {
      setCurrentPage(pagAtual - 1);
    } else {
      setCurrentPage(Math.ceil(users.length / 5));
    }
  };

  return (
    <div className="App">
      <h1>Dashboard de Usuários</h1>
      <p>Total de usuários: {users.length}</p>
      <div className="user-container">
        {usersAtuais.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
      <div className='arrow-container'>
        <button className='arrow' onClick={anterior}>
          <i className="bi bi-arrow-left"></i>
        </button>
        <p>1 ... {pagAtual} ... {Math.ceil(users.length / 5)}</p>
        <button className='arrow' onClick={proxima}>
          <i className="bi bi-arrow-right"></i>
        </button>
      </div>
    </div>
  );
}

export default App;