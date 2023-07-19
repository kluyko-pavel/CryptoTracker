import { useRef } from "react";
import { ICryptoInfo } from "../../../types";
import { Bag } from "../../Bag";
import { ControlBtn } from "../../ControlBtn";
import { CrossIcon } from "../../icons";
import "./ModalBagInfo.scss";
import { useClickOutside } from "../../../utils";
import { useNavigate } from "react-router-dom";

export const ModalBagInfo = ({
  toggleModal,
  bag,
  cryptos,
  removeFromBag,
}: {
  toggleModal: Function;
  bag: ICryptoInfo[];
  cryptos: ICryptoInfo[];
  removeFromBag: Function;
}) => {
  const refModal = useRef<any>();
  const refCloseBtn = useRef<any>();

  const handleClickOutside = (e: any) => {
    if (refCloseBtn.current.contains(e.target)) {
      return;
    } else {
      toggleModal(false);
    }
  };

  useClickOutside(refModal, handleClickOutside);

  return (
    <div className="modal-wrapper">
      <div className="modal-bag" ref={refModal}>
        <button
          className="modal-bag__close-btn"
          onClick={() => toggleModal(false)}
          ref={refCloseBtn}
        >
          <CrossIcon fill="#fff" />
        </button>
        <header className="modal-bag-header">
          <h2 className="modal-bag-header__title">Your bag</h2>
          <Bag cryptos={cryptos} bag={bag} />
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
