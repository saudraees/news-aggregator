import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/Layout";
import Home from "./pages/Home";
import Preferences from "./pages/Preferences";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="preferences" element={<Preferences />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
