import { useRef } from 'react';
import { useSelector } from 'react-redux';
import navbarStyles from '../assets/NavBar.module.css';
import commonStyles from '../assets/common.module.css';

export default function NavBar() {
  const { botInfo, socket } = useSelector((state) => state);

  const loginButtonRef = useRef(null);

  const handleLoginClick = () => {
    if (socket) {
      if (loginButtonRef.current) loginButtonRef.current.disabled = true;
      socket.requestOauthState();
    }
  };

  return (
    <div className={navbarStyles.navbar}>
      <div className={navbarStyles.botpfp}>
        <a href="/">
          <img src={botInfo?.avatarUrl} alt="Avatar" height="64px" />
        </a>
      </div>
      <div className={navbarStyles.title}>
        <h2>{botInfo?.username}</h2>
        <p>{botInfo?.description}</p>
      </div>
      <div className={navbarStyles.profile}>
        <div>
          <button
            ref={loginButtonRef}
            className={commonStyles.btnNormal}
            onClick={handleLoginClick}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
