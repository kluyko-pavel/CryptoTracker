import { useContext } from "react";
import { ICryptoInfo } from "../../../types";
import { Bag } from "../../Bag";
import { ControlBtn } from "../../ControlBtn";
import { CrossIcon } from "../../icons";
import "./ModalBagInfo.scss";
import { CryptoContext } from "../../../CryptoContext";

export const ModalBagInfo = () => {
  const { bag, toggleBagModal, removeFromBag } = useContext(CryptoContext);

  return (
    <div className="modal-wrapper">
      <div className="modal-bag">
        <button
          className="modal-bag__close-btn"
          onClick={() => toggleBagModal(false)}
        >
          <CrossIcon fill="#fff" />
        </button>
        <header className="modal-bag-header">
          <h2 className="modal-bag-header__title">Your bag</h2>
          <Bag />
        </header>
        <div className="modal-bag-items">
          {bag.map((el: ICryptoInfo) => (
            <div key={el.rank} className="modal-bag-items__item">
              <span className="modal-bag-items__item-name">{el.name}</span>
              <span className="modal-bag-items__item-quantity">
                {el.quantity} coins
              </span>
              <span className="modal-bag-items__item-price">
                {Number(+el.priceUsd * 2).toFixed(3)} $
              </span>
              <ControlBtn action="delete" onClick={() => removeFromBag(el)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
