import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./NavBar.css";

export default function NavBar() {
  const dispatch = useDispatch();
  const { botInfo }  = useSelector(state => state);

  return (
    <div className="navbar">
      <div className="botpfp">
        <img src="" alt=""/>
      </div>
      <div className="title">
        <h1>{botInfo}</h1>
      </div>
      <div className="profile">
        <div>
          Login
        </div>
      </div>

    </div>
  );
}
