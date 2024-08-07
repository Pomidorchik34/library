import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Err from "./pages/err";
import Home from "./pages/home";
import Login from "./pages/login";
import Signin from "./pages/signin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signin />}></Route>
        <Route path="*" element={<Err />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
