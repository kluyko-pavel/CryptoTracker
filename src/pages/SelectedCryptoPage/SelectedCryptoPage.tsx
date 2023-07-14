import { useParams } from "react-router-dom";
import "./SelectedCryptoPage.scss";
import { CryptoContext } from "../../CryptoContext";
import { useContext, useEffect, useState } from "react";
import {
  Chart,
  ControlBtn,
  DropDownList,
  Loader,
  ModalAddCrypto,
} from "../../components";

export const SelectedCryptoPage = () => {
  const [isShowCryptoModal, setIsShowCryptoModal] = useState(false);
  const [interval, setInterval] = useState("d1");
  const { cryptoId } = useParams();
  const {
    getSelectedCrypto,
    selectedCrypto,
    chartInfo,
    isLoading,
    getChartInfo,
    addToBag,
  } = useContext(CryptoContext);

  useEffect(() => {
    getSelectedCrypto(cryptoId || "");
    getChartInfo(cryptoId || "", interval);
  }, [interval]);

  const handleControlBtn = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setIsShowCryptoModal(true);
  };

  const parameters = [
    {
      label: "Supply:",
      value: selectedCrypto?.supply,
    },
    {
      label: "Max supply:",
      value: selectedCrypto?.maxSupply,
    },
    {
      label: "Market Cap:",
      value: selectedCrypto?.marketCapUsd,
    },
    {
      label: "Volume(24h):",
      value: selectedCrypto?.volumeUsd24Hr,
    },
    {
      label: "Change(24h):",
      value: selectedCrypto?.changePercent24Hr,
    },
    {
      label: "Vwap(24h):",
      value: selectedCrypto?.vwap24Hr,
    },
  ];

  return (
    <section className="selected-page">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container">
          {isShowCryptoModal && (
            <ModalAddCrypto
              crypto={selectedCrypto}
              addToBag={addToBag}
              toggleModal={setIsShowCryptoModal}
            />
          )}
          <div className="selected-page-tools">
            <div className="selected-page-tools-main">
              <h2 className="selected-page-tools__crypto-name">
                {selectedCrypto?.name}
              </h2>
              <span className="selected-page-tools__price">
                ${Number(selectedCrypto?.priceUsd).toFixed(3)}
              </span>
              <ControlBtn action="add" onClick={handleControlBtn} />
            </div>
            <DropDownList value={interval} setValue={setInterval} />
          </div>
          <div className="selected-page-info">
            <ul className="selected-page-info__parameters">
              {parameters.map((parameter, index) => (
                <li
                  className="selected-page-info__parameters-param"
                  key={index}
                >
                  {parameter.label}
                  <span
                    style={{
                      color:
                        parameter.label === "Change(24h):"
                          ? Number(parameter.value) < 0
                            ? "#ff0000"
                            : "#3ce221"
                          : "#fff",
                    }}
                  >
                    {Number(parameter.value).toFixed(3)}
                    {parameter.label === "Change(24h):" ? "%" : "$"}
                  </span>
                </li>
              ))}
            </ul>
            <Chart chartInfo={chartInfo} />
          </div>
        </div>
      )}
    </section>
  );
};
