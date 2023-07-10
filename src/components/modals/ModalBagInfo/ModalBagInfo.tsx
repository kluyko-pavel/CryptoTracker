import { cryptoData } from "../../../constants";
import { ICryptoInfo } from "../../../types";
import { ControlBtn } from "../../ControlBtn";
import { BagIcon, CrossIcon } from "../../icons";
import "./ModalBagInfo.scss";

export const ModalBagInfo = () => {
  return (
    <div className="modal-wrapper">
      <div className="modal-bag">
        <button className="modal-bag__close-btn">
          <CrossIcon fill="#fff" />
        </button>
        <header className="modal-bag-header">
          <h2 className="modal-bag-header__title">Your bag</h2>
          <div className="modal-bag-header__bag-price">
            <div className="modal-bag-header__price">
              134,32 USD <span>+2,38 (1,80 %)</span>
            </div>
            <BagIcon />
          </div>
        </header>
        <div className="modal-bag-items">
          {cryptoData.map((el: ICryptoInfo) => (
            <div key={el.rank} className="modal-bag-items__item">
              <span className="modal-bag-items__item-name">{el.name}</span>
              <span className="modal-bag-items__item-quantity">2 coins</span>
              <span className="modal-bag-items__item-price">
                {Number(+el.priceUsd * 2).toFixed(3)} $
              </span>
              <ControlBtn action="delete" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
