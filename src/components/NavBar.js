import { useSelector } from 'react-redux';
import '../assets/NavBar.css';

export default function NavBar() {
  const { botInfo } = useSelector((state) => state);

  return (
    <div className="navbar">
      <div className="botpfp">
        <img src={botInfo?.avatarUrl} alt="Avatar" height="64px" />
      </div>
      <div className="title">
        <h2>{botInfo?.username}</h2>
        <p>{botInfo?.description}</p>
      </div>
      <div className="profile">
        <div>Login</div>
      </div>
    </div>
  );
}
