import { BagIcon } from "../icons";
import "./ControlBtn.scss";

export const ControlBtn = ({ action }: { action: string }) => {
  const handleControlBtn = (e: any) => {
    e.stopPropagation();
  };

  return (
    <button className="control-btn" onClick={handleControlBtn}>
      <span
        className={
          action === "add"
            ? "control-btn__add-mark"
            : "control-btn__delete-mark"
        }
      >
        {action === "add" ? "+" : "-"}
      </span>
      <BagIcon />
    </button>
  );
};
