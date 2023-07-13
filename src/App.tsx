import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CryptoContext } from "./CryptoContext";
import "./config.scss";
import { MainPage, SelectedCryptoPage } from "./pages";
import { MainFooter, MainHeader } from "./components";
import { useContext } from "react";

function App() {
  const { cryptos, bag, removeFromBag } = useContext(CryptoContext);

  return (
    <BrowserRouter>
      <div className="app">
        <MainHeader cryptos={cryptos} bag={bag} removeFromBag={removeFromBag} />
        <div className="main-content">
          <Routes>
            <Route path="/">
              <Route index element={<MainPage />} />
              <Route path=":cryptoId" element={<SelectedCryptoPage />} />
            </Route>
          </Routes>
        </div>
        <MainFooter />
      </div>
    </BrowserRouter>
  );
}

export default App;
