// import { useNavigate } from "react-router-dom";
import { ICryptoInfo } from "../../types";
import { ControlBtn } from "../ControlBtn";
import "./Table.scss";

export const Table = ({ data }: { data: ICryptoInfo[] }) => {
  //   const navigate = useNavigate();

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
          <th className="table-header__column">add</th>
        </tr>
      </thead>
      <tbody className="table-body">
        {data.map((el: ICryptoInfo) => (
          <tr
            key={el.rank}
            className="table-body__line"
            // onClick={() => navigate("")}
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
              {<ControlBtn action="add" />}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
