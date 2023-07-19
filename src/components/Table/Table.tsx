import { useState } from "react";
import { ICryptoInfo } from "../../types";
import { ControlBtn } from "../ControlBtn";
import "./Table.scss";
import { useNavigate } from "react-router-dom";

export const Table = ({
  cryptos,
  getSelectedCrypto,
  toggleModal,
}: {
  cryptos: ICryptoInfo[];
  getSelectedCrypto: Function;
  toggleModal: Function;
}) => {
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleControlBtn = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    selectedCrypto: string
  ) => {
    e.stopPropagation();
    toggleModal(true);
    getSelectedCrypto(selectedCrypto);
  };

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  window.addEventListener("resize", handleResize);

  return (
    <table className="table">
      <thead className="table-header">
        <tr className="table-header__line">
          <th className="table-header__column">rank</th>
          <th className="table-header__column">name</th>
          <th className="table-header__column">price</th>
          <th className="table-header__column">change(24h)</th>
          <th className="table-header__column">volume(24h)</th>
          <th className="table-header__column">supply</th>
          {windowWidth >= 360 && <th className="table-header__column">add</th>}
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
              {Number(el.priceUsd).toFixed(3) === "0.000"
                ? "-"
                : Number(el.priceUsd).toFixed(3) + "$"}
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
            {windowWidth >= 360 && (
              <td className="table-body__column">
                {
                  <ControlBtn
                    action="add"
                    onClick={(e) => handleControlBtn(e, el.id)}
                  />
                }
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
