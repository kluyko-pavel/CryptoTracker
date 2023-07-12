import { MouseEventHandler } from "react";
import { BagIcon } from "../icons";
import "./ControlBtn.scss";

export const ControlBtn = ({
  action,
  onClick,
}: {
  action: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <button className="control-btn" onClick={onClick}>
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
