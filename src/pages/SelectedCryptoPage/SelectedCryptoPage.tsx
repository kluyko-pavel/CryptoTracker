import { useParams } from "react-router-dom";
import "./SelectedCryptoPage.scss";
import { CryptoContext } from "../../CryptoContext";
import { useContext, useEffect, useState } from "react";
import { Chart } from "../../components";

export const SelectedCryptoPage = () => {
  const [interval, setInterval] = useState("d1");
  const { cryptoId } = useParams();
  const { getSelectedCrypto, selectedCrypto } = useContext(CryptoContext);

  useEffect(() => {
    getSelectedCrypto(cryptoId || "");
  }, []);
  return (
    <section className="selected-page">
      <div className="container">
        <h2 className="selected-page__crypto-name">{selectedCrypto.name}</h2>
        <Chart id={cryptoId || ""} interval={interval} />
      </div>
    </section>
  );
};
