import { RouterProvider } from "react-router-dom";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import router from "./router/router";
import "./App.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import config from "./config.js";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("WebSocket useEffect:", config.serverUrl);
  }, []);

  return (
    <div className="App">
      <NavBar/>
      <header className="App-header">
        Musicat
      </header>

      <RouterProvider router={router}/>
      <Footer/>
    </div>
  );
}

export default App;
