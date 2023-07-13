import { useNavigate } from "react-router-dom";
import { LogoIcon } from "../icons";
import { useState } from "react";
import "./MainHeader.scss";
import { ICryptoInfo } from "../../types";
import { Bag } from "../Bag";
import { ModalBagInfo } from "../modals";

export const MainHeader = ({
  cryptos,
  bag,
  removeFromBag,
}: {
  cryptos: ICryptoInfo[];
  bag: ICryptoInfo[];
  removeFromBag: Function;
}) => {
  const navigate = useNavigate();
  const [isShowBagModal, setIsShowBagModal] = useState(false);

  const handleNavigateToCoin = (el: ICryptoInfo) => {
    navigate(`/${el.id}`);
    window.location.reload();
  };

  return (
    <header className="main-header">
      {isShowBagModal && (
        <ModalBagInfo
          toggleModal={setIsShowBagModal}
          cryptos={cryptos}
          bag={bag}
          removeFromBag={removeFromBag}
        />
      )}
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
            onClick={() => setIsShowBagModal(true)}
          >
            <Bag cryptos={cryptos} bag={bag} />
          </button>
        </div>
      </div>
    </header>
  );
};
