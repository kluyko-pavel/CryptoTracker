import "./Pagination.scss";
import { LeftArrowIcon, RightArrowIcon } from "../icons";
import { useContext } from "react";
import { CryptoContext } from "../../CryptoContext";

export const Pagination = () => {
  const { currentPage, changeCurrentPage } = useContext(CryptoContext);

  const handleSwitchNextPage = () => {
    changeCurrentPage(currentPage + 1);
  };
  const handleSwitchPrevPage = () => {
    changeCurrentPage(currentPage - 1);
  };

  return (
    <div className="pagination">
      <button
        className="pagination__el"
        type="button"
        disabled={currentPage === 1}
        onClick={handleSwitchPrevPage}
      >
        <LeftArrowIcon />
      </button>

      <button
        className="pagination__el"
        type="button"
        onClick={handleSwitchNextPage}
      >
        <RightArrowIcon />
      </button>
    </div>
  );
};
