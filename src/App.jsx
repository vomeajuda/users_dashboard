import { useEffect, useState } from 'react';
import UserCard from './components/UserCard';
import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  const [users, setUsers] = useState([]);
  const [pagAtual, setCurrentPage] = useState(1);
  const [cardAberto, setCardAberto] = useState(false);
  const [userSelect, setUserSelect] = useState(null);

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
      document.getElementById('ante').disabled = false;
      setCurrentPage(parseInt(pagAtual) + 1);
    } else {
      document.getElementById('prox').disabled = true;
    }
  };

  const anterior = () => {
    if (pagAtual > 1) {
      document.getElementById('prox').disabled = false;
      setCurrentPage(parseInt(pagAtual) - 1);
    } else {
      document.getElementById('ante').disabled = true;
    }
  };

  const clickPopup = (user) => {
    setUserSelect(user);
    setCardAberto(true);
  };

  const fechar = () => {
    setCardAberto(false);
    setUserSelect(null);
  };

  return (
    <div className="App">
      <h1>Dashboard de Usuários</h1>
      <p>Total de usuários: {users.length}</p>
      <div className="user-container">
        {usersAtuais.map((user) => (
          <UserCard key={user.id} user={user} onClick={clickPopup} />
        ))}
      </div>
      <div className='arrow-container'>
        <button className='arrow' id='ante' onClick={anterior}>
          <i className="bi bi-arrow-left"></i>
        </button>
        <p>1 ... {pagAtual} ... {Math.ceil(users.length / 5)}</p>
        <button className='arrow' id='prox' onClick={proxima}>
          <i className="bi bi-arrow-right"></i>
        </button>
      </div>
      <div>
        <p>Ir para página:</p>
        <input type="number" min={1} max={Math.ceil(users.length /5)} onKeyDown={(e) => {
          if (e.key === 'Enter' && e.target.value > 0 && e.target.value <= Math.ceil(users.length / 5)) {
            const pag = e.target.value;
            setCurrentPage(pag);
        }}}/>
      </div>
      {cardAberto && (
        <div className="popup">
          <div className="popup-texto">
            <button className="fechar" onClick={fechar}>X</button>
            <img className='popup-imagem' src={userSelect.avatar} alt={`${userSelect.firstName} avatar`} />
            <h3>{userSelect.firstName} {userSelect.lastName}</h3>
            <p>Email: {userSelect.email}</p>
            <p>Address: {userSelect.address}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;