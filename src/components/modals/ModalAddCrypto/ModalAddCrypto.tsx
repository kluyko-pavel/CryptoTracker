import "./ModalAddCrypto.scss";
import { ICryptoInfo } from "../../../types";
import { ControlBtn } from "../../ControlBtn";
import { ChangeEvent, useRef, useState } from "react";
import { useClickOutside } from "../../../utils";

export const ModalAddCrypto = ({
  crypto,
  toggleModal,
  addToBag,
}: {
  crypto?: ICryptoInfo;
  toggleModal: Function;
  addToBag: Function;
}) => {
  const [quantity, setQuantity] = useState("0");
  const refModal = useRef<any>();
  const refCloseBtn = useRef<any>();

  const handleAddCryptoToBag = () => {
    if (+quantity) {
      const cryptoBag = { ...crypto, quantity };
      addToBag(cryptoBag);
      toggleModal(false);
    }
  };

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
      <div className="modal-crypto" ref={refModal}>
        <h2 className="modal-crypto__title">Adding crypto</h2>
        <div className="modal-crypto-info">
          <span className="modal-crypto-info__name">Name: {crypto?.name}</span>
          <span className="modal-crypto-info__price">
            Price: {Number(crypto?.priceUsd).toFixed(3)} $
          </span>
          <label className="modal-crypto-info__quantity-text">
            Quantity:
            <input
              className="modal-crypto-info__quantity"
              name="crypto-quantity"
              type="number"
              min="0"
              value={quantity}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setQuantity(e.target.value)
              }
            />
          </label>
          <span className="modal-crypto-info__result-price">
            Result price: {crypto && (+quantity * +crypto?.priceUsd).toFixed(3)}{" "}
            $
          </span>
        </div>
        <div className="modal-crypto__buttons">
          <button
            className="modal-crypto__close-btn"
            onClick={() => toggleModal(false)}
            ref={refCloseBtn}
          >
            Close
          </button>
          <ControlBtn action="add" onClick={handleAddCryptoToBag} />
        </div>
      </div>
    </div>
  );
};
