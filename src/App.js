import { RouterProvider } from "react-router-dom";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import router from "./router/router";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";

function App() {
  return (
    <div className="App">
      <NavBar/>
      <div className="main-container">
        <div className="left-container">
          <SideBar/>
        </div>
        <div className="right-container">
          <RouterProvider router={router}/>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
