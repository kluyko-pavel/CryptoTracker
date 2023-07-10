import "./ModalAddCrypto.scss";
import { ICryptoInfo } from "../../../types";
import { useState } from "react";
import { ControlBtn } from "../../ControlBtn";

export const ModalAddCrypto = ({ crypto }: { crypto: ICryptoInfo }) => {
  const [quantity, setQuantity] = useState(0);

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
              onChange={(e: any) => setQuantity(e.target.value)}
            />
          </label>
          <span className="modal-crypto-info__result-price">
            Result price: {(quantity * +crypto.priceUsd).toFixed(3)} $
          </span>
        </div>
        <div className="modal-crypto__buttons">
          <button className="modal-crypto__close-btn">Close</button>
          <ControlBtn action="add" />
        </div>
      </div>
    </div>
  );
};
