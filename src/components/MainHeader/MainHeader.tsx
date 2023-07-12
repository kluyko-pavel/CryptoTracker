import { useNavigate } from "react-router-dom";
import { LogoIcon } from "../icons";
import { useContext } from "react";
import "./MainHeader.scss";
import { CryptoContext } from "../../CryptoContext";
import { ICryptoInfo } from "../../types";
import { Bag } from "../Bag";
import { ModalBagInfo } from "../modals";

export const MainHeader = () => {
  const navigate = useNavigate();
  const { cryptos, isShowBagModal, toggleBagModal } = useContext(CryptoContext);

  const handleNavigateToCoin = (el: ICryptoInfo) => {
    navigate(`/${el.id}`);
    window.location.reload();
  };

  return (
    <header className="main-header">
      {isShowBagModal && <ModalBagInfo />}
      <div className="container">
        <div className="main-header__inner">
          <button className="main-header-logo" onClick={() => navigate("/")}>
            <LogoIcon />
            <span className="main-header-logo__name">CryptoTracker</span>
          </button>
          <ul className="main-header-top-coins">
            {cryptos.map(
              (el: ICryptoInfo, i) =>
                i < 3 && (
                  <li
                    key={el.rank}
                    className="main-header-top-coins__coin"
                    onClick={() => handleNavigateToCoin(el)}
                  >
                    {el.name} ${Number(el.priceUsd).toFixed(3)}
                  </li>
                )
            )}
          </ul>
          <button
            className="main-header__bag"
            onClick={() => toggleBagModal(true)}
          >
            <Bag />
          </button>
        </div>
      </div>
    </header>
  );
};
