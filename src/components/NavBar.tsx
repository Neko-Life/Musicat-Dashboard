import { useRef } from 'react';
import navbarStyles from '@/assets/NavBar.module.css';
import commonStyles from '@/assets/common.module.css';
import { useMainSelector } from '@/hooks/useSelector';
import { getSocket } from '@/socket/instance';
import { getRedirectUri } from '@/util/util';

export default function NavBar() {
  const socket = getSocket();
  const { botInfo } = useMainSelector();

  const loginButtonRef = useRef<HTMLButtonElement>(null);

  const handleLoginClick = () => {
    if (socket) {
      if (loginButtonRef.current) loginButtonRef.current.disabled = true;
      socket.requestOauth(getRedirectUri('/login'));
    }
  };

  return (
    <div className={navbarStyles.navbar}>
      <div className={navbarStyles.botpfp}>
        <a
          href="/"
          style={{
            display: 'flex',
          }}
        >
          <img
            src={botInfo?.avatarUrl}
            alt="Avatar"
            height="64px"
            style={{
              margin: 'auto',
            }}
          />
        </a>
      </div>
      <div className={navbarStyles.title}>
        <h2
          className="one-line-text"
          style={{
            fontFamily: 'pricedown',
            marginTop: '8px',
            marginBottom: '8px',
          }}
        >
          {botInfo?.username}
        </h2>
        <p
          className="one-line-text"
          style={{
            margin: '0',
          }}
        >
          {botInfo?.description}
        </p>
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
