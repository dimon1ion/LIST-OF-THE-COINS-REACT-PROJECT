import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import s from "./App.css";
import Header from "./components/Header";
import SearchGlobalContext from "./contexts/SearchGlobal.context";
import CoinPage from "./pages/CoinPage/CoinPage";
import CoinsPage from "./pages/CoinsPage/CoinsPage";
import HomePage from "./pages/HomePage";

function App() {

  const [globalSearch, setGlobalSearch] = useState(null);

  return (
    <>
      <Header />
      <div className="container mt-3">
        <SearchGlobalContext.Provider value={{globalSearch, setGlobalSearch}}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/coins/:id" element={<CoinsPage />} />
            <Route path="/coins/search" element={<CoinsPage />} />
            <Route path="/coin/:id" element={<CoinPage />} />
          </Routes>
        </SearchGlobalContext.Provider>
      </div>
    </>
  );
}

export default App;
