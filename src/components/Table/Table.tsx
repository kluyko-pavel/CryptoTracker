import { useContext } from "react";
import { ICryptoInfo } from "../../types";
import { ControlBtn } from "../ControlBtn";
import "./Table.scss";
import { CryptoContext } from "../../CryptoContext";
import { useNavigate } from "react-router-dom";
import { ModalAddCrypto } from "../modals";

export const Table = () => {
  const {
    cryptos,
    isShowCryptoModal,
    selectedCrypto,
    toggleCryptoModal,
    getSelectedCrypto,
  } = useContext(CryptoContext);

  const navigate = useNavigate();

  const handleControlBtn = (e: any, selectedCrypto: string) => {
    e.stopPropagation();
    toggleCryptoModal(true);
    getSelectedCrypto(selectedCrypto);
  };

  return (
    <table className="table">
      <thead className="table-header">
        {isShowCryptoModal && <ModalAddCrypto crypto={selectedCrypto} />}
        <tr className="table-header__line">
          <th className="table-header__column">rank</th>
          <th className="table-header__column">name</th>
          <th className="table-header__column">price</th>
          <th className="table-header__column">change(24h)</th>
          <th className="table-header__column">volume(24h)</th>
          <th className="table-header__column">supply</th>
          <th className="table-header__column">add</th>
        </tr>
      </thead>
      <tbody className="table-body">
        {cryptos.map((el: ICryptoInfo) => (
          <tr
            key={el.rank}
            className="table-body__line"
            onClick={() => navigate(`/${el.id}`)}
          >
            <td className="table-body__column">{el.rank}</td>
            <td className="table-body__column">{el.name}</td>
            <td className="table-body__column">
              {Number(el.priceUsd).toFixed(3)} $
            </td>
            <td
              className="table-body__column"
              style={{
                color: Number(el.changePercent24Hr) < 0 ? "#ff0000" : "#3ce221",
              }}
            >
              {Number(el.changePercent24Hr).toFixed(3)} %
            </td>
            <td className="table-body__column">
              {Number(el.volumeUsd24Hr).toFixed(3)} $
            </td>
            <td className="table-body__column">
              {Number(el.supply).toFixed(3)} $
            </td>
            <td className="table-body__column">
              {
                <ControlBtn
                  action="add"
                  onClick={(e: any) => handleControlBtn(e, el.id)}
                />
              }
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
