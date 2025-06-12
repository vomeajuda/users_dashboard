import { useEffect, useState } from 'react';
import UserCard from './components/UserCard';
import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  const [users, setUsers] = useState([]); //estados para armazenar dados que podem mudar
  const [pagAtual, setCurrentPage] = useState(1);
  const [cardAberto, setCardAberto] = useState(false);
  const [userSelect, setUserSelect] = useState(null); 

  useEffect(() => {
    fetch('http://localhost:3001/peoples') //ip do json-server
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error('Erro ao buscar usuarios', err));
  }, []);

  const ultimoUser = pagAtual * 5; //ultimo e primeiro usuario e serem mostrados na pagina
  const primeiroUser = ultimoUser - 5;
  const usersAtuais = users.slice(primeiroUser, ultimoUser); //slice para pegar os usuarios que devem ser mostrados na pagina

  const proxima = () => { //função para ir para a proxima pagina
    if (pagAtual < Math.ceil(users.length / 5)) {//confere se a pagina atual é menor que o total de paginas
      document.getElementById('ante').disabled = false; //habilita o botão de voltar
      setCurrentPage(parseInt(pagAtual) + 1); //aumenta a pagina atual
    } else {
      document.getElementById('prox').disabled = true; //desabilita o botão de proxima
    }
  };

  const anterior = () => { //função para ir para a pagina anterior
    if (pagAtual > 1) { //confere se a pagina atual é maior que 1
      document.getElementById('prox').disabled = false; //habilita o botão de proxima
      setCurrentPage(parseInt(pagAtual) - 1); //diminui a pagina atual
    } else {
      document.getElementById('ante').disabled = true; //desabilita o botão de voltar
    }
  };

  const clickPopup = (user) => { //função para abrir o popup
    setUserSelect(user); //salva o usuario selecionado
    setCardAberto(true); //abre o popup
  };

  const fechar = () => {
    setCardAberto(false); //fecha o popup
    setUserSelect(null); //limpa o usuario selecionado
  };

  const campo = (pag) => {
    setCurrentPage(pag);
    document.getElementById('prox').disabled = false; //habilita o botão de proxima
    document.getElementById('ante').disabled = false; //habilita o botão de anterior
  }

  return (
    <div className="App">
      <h1>Dashboard de Usuários</h1> {/*titulo da pagina*/}
      <p>Total de usuários: {users.length}</p> {/*total de usuarios*/}
      <div className="user-container">
        {usersAtuais.map((user) => (
          <UserCard user={user} onClick={clickPopup} /> /*componente que mostra os usuarios*/
        ))}
      </div>
      <div className='arrow-container'>
        <button className='arrow' id='ante' onClick={anterior}> {/*botão de voltar*/}
          <i className="bi bi-arrow-left"></i>
        </button>
        <p>1 ... {pagAtual} ... {Math.ceil(users.length / 5)}</p> {/*mostra a pagina atual e o total de paginas*/}
        <button className='arrow' id='prox' onClick={proxima}> {/*botão de proxima*/}
          <i className="bi bi-arrow-right"></i>
        </button>
      </div>
      <div>
        <p>Ir para página:</p>
        <input type="number" min={1} max={Math.ceil(users.length /5)} onKeyDown={(e) => { //input para ir para uma pagina especifica
          if (e.key === 'Enter' && e.target.value > 0 && e.target.value <= Math.ceil(users.length / 5)) { //confere se o valor é valido
            const pag = e.target.value;
            campo(pag); //muda a pagina atual
        }}}/>
      </div>
      {cardAberto && (
        <div className="popup">
          <div className="popup-texto">
            <button className="fechar" onClick={fechar}>X</button> {/*X de fechar*/}
            <img className='popup-imagem' src={userSelect.avatar} alt={`${userSelect.firstName} avatar`} /> {/*imagem do usuario*/}
            <h3>{userSelect.firstName} {userSelect.lastName}</h3> {/*nome do usuario*/}
            <p>Email: {userSelect.email}</p> {/*email do usuario*/}
            <p>Address: {userSelect.address}</p> {/*endereco do usuario*/}
            <p>Combustível: {userSelect.combustivel}</p> {/*combustivel do usuario*/}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;