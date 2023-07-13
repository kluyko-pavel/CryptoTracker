import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import "./BurgerMenu.scss";
import { useClickOutside } from "../../utils";
import { Bag } from "../Bag";
import { ICryptoInfo } from "../../types";

export const BurgerMenu = ({
  cryptos,
  bag,
  toggleModal,
}: {
  cryptos: ICryptoInfo[];
  bag: ICryptoInfo[];
  toggleModal: Function;
}) => {
  const refMenu = useRef<any>();
  const refMenuBtn = useRef<any>();
  const navigate = useNavigate();
  const [toggleBtn, setToggleBtn] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleToggleMenu = () => {
    setToggleBtn(!toggleBtn);
    setToggleMenu(!toggleMenu);
  };

  const handleClickOutside = (e: any) => {
    if (refMenuBtn.current.contains(e.target)) {
      return;
    } else {
      setToggleBtn(false);
      setToggleMenu(false);
    }
  };

  useClickOutside(refMenu, handleClickOutside);

  const handleNavigateToCoin = (el: ICryptoInfo) => {
    navigate(`/${el.id}`);
    window.location.reload();
  };

  return (
    <>
      <button
        className={
          toggleBtn ? "burger-menu-btn close-burger" : "burger-menu-btn"
        }
        ref={refMenuBtn}
        onClick={handleToggleMenu}
      >
        <span className="burger-menu-btn__line "></span>
      </button>
      {toggleMenu && (
        <ul className="burger-menu" ref={refMenu}>
          <li className={"burger-menu__link"} onClick={() => toggleModal(true)}>
            <Bag cryptos={cryptos} bag={bag} />
          </li>
          {cryptos.map(
            (el: ICryptoInfo, i) =>
              i < 3 && (
                <li
                  key={el.rank}
                  className="burger-menu__link"
                  onClick={() => handleNavigateToCoin(el)}
                >
                  {el.name} ${Number(el.priceUsd).toFixed(3)}
                </li>
              )
          )}
        </ul>
      )}
    </>
  );
};
