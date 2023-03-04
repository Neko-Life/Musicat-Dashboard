import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./NavBar.css";

export default function NavBar() {
  const dispatch = useDispatch();
  const { botInfo } = useSelector(state => state);

  useEffect(() => {
    dispatch(); // !TODO: Request botInfo
  }, []);

  return (
    <div className="navbar">
      <div className="botpfp">
        <image src="" alt=""/>
      </div>
      <div className="title">
        <h1>Musicat</h1>
      </div>
      <div className="profile">
        <div>
          Login
        </div>
      </div>

    </div>
  );
}
