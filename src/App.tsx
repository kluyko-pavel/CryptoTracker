import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CryptoProvider } from "./CryptoContext";
import "./config.scss";
import { MainPage, SelectedCryptoPage } from "./pages";
import { MainHeader } from "./components";

function App() {
  return (
    <BrowserRouter>
      <CryptoProvider>
        <div className="app">
          <MainHeader />
          <div className="main-content">
            <Routes>
              <Route path="/">
                <Route index element={<MainPage />} />
                <Route path=":cryptoId" element={<SelectedCryptoPage />} />
              </Route>
            </Routes>
          </div>
        </div>
      </CryptoProvider>
    </BrowserRouter>
  );
}

export default App;
