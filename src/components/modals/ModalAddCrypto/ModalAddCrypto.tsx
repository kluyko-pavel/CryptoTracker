import "./ModalAddCrypto.scss";
import { ICryptoInfo } from "../../../types";
import { ControlBtn } from "../../ControlBtn";
import { ChangeEvent, useState } from "react";

export const ModalAddCrypto = ({
  crypto,
  toggleModal,
  addToBag,
}: {
  crypto: ICryptoInfo;
  toggleModal: Function;
  addToBag: Function;
}) => {
  const [quantity, setQuantity] = useState("0");

  const handleAddCryptoToBag = () => {
    const cryptoBag = { ...crypto, quantity };
    addToBag(cryptoBag);
    toggleModal(false);
  };

  return (
    <div className="modal-wrapper">
      <div className="modal-crypto">
        <h2 className="modal-crypto__title">Adding crypto</h2>
        <div className="modal-crypto-info">
          <span className="modal-crypto-info__name">Name: {crypto.name}</span>
          <span className="modal-crypto-info__price">
            Price: {Number(crypto.priceUsd).toFixed(3)} $
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
            Result price: {(+quantity * +crypto.priceUsd).toFixed(3)} $
          </span>
        </div>
        <div className="modal-crypto__buttons">
          <button
            className="modal-crypto__close-btn"
            onClick={() => toggleModal(false)}
          >
            Close
          </button>
          <ControlBtn action="add" onClick={handleAddCryptoToBag} />
        </div>
      </div>
    </div>
  );
};
