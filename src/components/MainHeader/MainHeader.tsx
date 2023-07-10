import { BagIcon, LogoIcon } from "../icons";
import "./MainHeader.scss";

export const MainHeader = () => {
  return (
    <header className="main-header">
      <div className="container">
        <div className="main-header__inner">
          <div className="main-header-logo">
            <LogoIcon />
            <span className="main-header-logo__name">CryptoTracker</span>
          </div>
          <ul className="main-header-top-coins">
            <li className="main-header-top-coins__coin">BTC $23423.234</li>
            <li className="main-header-top-coins__coin">AUT $23423.234</li>
            <li className="main-header-top-coins__coin">ERR $23423.234</li>
          </ul>
          <button className="main-header-bag">
            <div className="main-header-bag__cost">
              134,32 USD <span>+2,38 (1,80 %)</span>
            </div>
            <BagIcon />
          </button>
        </div>
      </div>
    </header>
  );
};
