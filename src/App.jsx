import { Route, Routes } from "react-router-dom";
import s from "./App.css";
import Header from "./components/Header";
import CoinsPage from "./pages/CoinsPage/CoinsPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <Header />
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/coins/:id" element={<CoinsPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
