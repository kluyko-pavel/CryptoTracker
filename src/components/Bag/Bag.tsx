import { BagIcon } from "../icons";
import "./Bag.scss";
import { ICryptoInfo } from "../../types";

export const Bag = ({
  cryptos,
  bag,
}: {
  cryptos: ICryptoInfo[];
  bag: ICryptoInfo[];
}) => {
  const checkPriceDifference = () => {
    const currentBagPrice = bag.reduce(
      (acc, el) =>
        acc +
        +(
          cryptos.find((crypto: ICryptoInfo) => crypto.id === el.id)
            ?.priceUsd || 0
        ) *
          (el.quantity || 1),
      0
    );
    const startBagPrice = bag.reduce(
      (acc, el) => acc + +el.priceUsd * (el.quantity || 1),
      0
    );

    const priceDifference = currentBagPrice - startBagPrice;
    return (
      <span style={{ color: priceDifference < 0 ? "#ff0000" : "#3ce221" }}>
        {startBagPrice
          ? priceDifference < 0
            ? ` ${priceDifference.toFixed(2)} (${(
                (priceDifference / startBagPrice) *
                100
              ).toFixed(2)}%)`
            : ` +${priceDifference.toFixed(2)} (${(
                (priceDifference / startBagPrice) *
                100
              ).toFixed(2)}%)`
          : null}
      </span>
    );
  };

  return (
    <div className="bag">
      <div className="bag__price">
        $
        {Number(
          bag.reduce(
            (acc, el) =>
              acc +
              +(
                cryptos.find((crypto: ICryptoInfo) => crypto.id === el.id)
                  ?.priceUsd || 0
              ) *
                (el.quantity || 1),
            0
          )
        ).toFixed(3)}
        {checkPriceDifference()}
      </div>
      <BagIcon />
    </div>
  );
};
