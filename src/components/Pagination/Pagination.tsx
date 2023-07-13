import "./Pagination.scss";
import { LeftArrowIcon, RightArrowIcon } from "../icons";

export const Pagination = ({
  currentPage,
  changeCurrentPage,
}: {
  currentPage: number;
  changeCurrentPage: Function;
}) => {
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
