import './UserCard.css';

function UserCard({ user, onClick }) {
  return (
    <div className="user-card" onClick={() => onClick(user)}>
      <img src={user.avatar} alt={`${user.firstName} avatar`} />
      <h3>{user.firstName} {user.lastName}</h3>
      <p>{user.email}</p>
      <small>{user.address}</small>
    </div>
  );
}

export default UserCard;