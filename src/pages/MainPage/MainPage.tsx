import { useContext, useState } from "react";
import { Loader, ModalAddCrypto, Pagination, Table } from "../../components";
import "./MainPage.scss";
import { CryptoContext } from "../../CryptoContext";

export const MainPage = () => {
  const [isShowCryptoModal, setIsShowCryptoModal] = useState(false);
  const {
    cryptos,
    selectedCrypto,
    currentPage,
    isLoading,
    changeCurrentPage,
    addToBag,
    getSelectedCrypto,
  } = useContext(CryptoContext);

  return (
    <section className="main-page">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container">
          {isShowCryptoModal && (
            <ModalAddCrypto
              crypto={selectedCrypto}
              addToBag={addToBag}
              toggleModal={setIsShowCryptoModal}
            />
          )}
          <Table
            cryptos={cryptos}
            getSelectedCrypto={getSelectedCrypto}
            toggleModal={setIsShowCryptoModal}
          />
          <Pagination
            currentPage={currentPage}
            changeCurrentPage={changeCurrentPage}
          />
        </div>
      )}
    </section>
  );
};
