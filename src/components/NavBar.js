import { useRef } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import '../assets/NavBar.css';

export default function NavBar() {
  const { botInfo, oauthState, socket } = useSelector((state) => state);

  const loginButtonRef = useRef(null);

  useEffect(() => {
    if (oauthState?.length) window.location.href = oauthState;
  }, [oauthState]);

  const handleLoginClick = () => {
    if (socket) {
      if (loginButtonRef.current) loginButtonRef.current.disabled = true;
      socket.requestOauthState();
    }
  };

  return (
    <div className="navbar">
      <div className="botpfp">
        <a href="/">
          <img src={botInfo?.avatarUrl} alt="Avatar" height="64px" />
        </a>
      </div>
      <div className="title">
        <h2>{botInfo?.username}</h2>
        <p>{botInfo?.description}</p>
      </div>
      <div className="profile">
        <div>
          <button
            ref={loginButtonRef}
            className="btn-normal"
            onClick={handleLoginClick}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
