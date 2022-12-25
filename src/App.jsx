import { Route, Routes } from "react-router-dom";
import s from "./App.css";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <Header />
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
