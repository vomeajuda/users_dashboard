import './UserCard.css';

function UserCard({ user, onClick }) { //componente do card
  return (
    <div className="user-card" onClick={() => onClick(user)}> {/*faz o card clicavel*/}
      <img src={user.avatar} alt={`${user.firstName} avatar`} /> {/*imagem do usuario*/}
      <h3>{user.firstName} {user.lastName}</h3> {/*nome do usuario*/}
      <p>{user.email}</p> {/*email do usuario*/}
      <small>{user.address}</small> {/*endereço do usuario*/}
    </div>
  );
}

export default UserCard;