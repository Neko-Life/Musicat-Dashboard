import { useSelector } from 'react-redux';
import '../assets/NavBar.css';

export default function NavBar() {
  const { botInfo } = useSelector((state) => state);

  return (
    <div className="navbar">
      <div className="botpfp">
        <img src={botInfo?.avatarUrl} alt="Avatar" height="128px" />
      </div>
      <div className="title">
        <h1>{botInfo?.username}</h1>
        <p>{botInfo?.description}</p>
      </div>
      <div className="profile">
        <div>Login</div>
      </div>
    </div>
  );
}
