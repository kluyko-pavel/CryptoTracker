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
                {selectedCrypto.name}
              </h2>
              <span className="selected-page-tools__price">
                ${Number(selectedCrypto.priceUsd).toFixed(3)}
              </span>
              <ControlBtn action="add" onClick={handleControlBtn} />
            </div>
            <DropDownList value={interval} setValue={setInterval} />
          </div>
          <div className="selected-page-info">
            <ul className="selected-page-info__parameters">
              <li className="selected-page-info__parameters-param">
                Supply:{" "}
                <span> {Number(selectedCrypto.supply).toFixed(3)} $</span>
              </li>
              <li className="selected-page-info__parameters-param">
                Max supply:
                <span> {Number(selectedCrypto.maxSupply).toFixed(3)} $</span>
              </li>
              <li className="selected-page-info__parameters-param">
                Market Cap:
                <span> {Number(selectedCrypto.marketCapUsd).toFixed(3)} $</span>
              </li>
              <li className="selected-page-info__parameters-param">
                Volume(24h):
                <span>
                  {" "}
                  {Number(selectedCrypto.volumeUsd24Hr).toFixed(3)} $
                </span>
              </li>
              <li className="selected-page-info__parameters-param">
                Change(24h):
                <span
                  style={{
                    color:
                      Number(selectedCrypto.changePercent24Hr) < 0
                        ? "#ff0000"
                        : "#3ce221",
                  }}
                >
                  {Number(selectedCrypto.changePercent24Hr).toFixed(3)} %
                </span>
              </li>
              <li className="selected-page-info__parameters-param">
                Vwap(24h):
                <span>{Number(selectedCrypto.vwap24Hr).toFixed(3)} $</span>
              </li>
            </ul>
            <Chart chartInfo={chartInfo} />
          </div>
        </div>
      )}
    </section>
  );
};
