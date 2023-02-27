import { RouterProvider } from "react-router-dom";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import router from "./router/router";
import "./App.css";

function App() {
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
