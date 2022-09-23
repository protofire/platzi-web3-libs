import './App.css';
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout";
import Home from "./views/home";

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" exact element={<Home/>} />
      </Routes>
    </MainLayout>
  );
}

export default App;
