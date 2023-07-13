import { Dispatch, SetStateAction } from "react";
import "./DropDownList.scss";

export const DropDownList = ({
  value,
  setValue,
}: {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <label className="drop-down-list">
      Point-in-time interval
      <select
        name="interval"
        value={value}
        onChange={(e: any) => setValue(e.target.value)}
      >
        <option value={"d1"}>Avg of 24h</option>
        <option value={"m1"}>Minute interval</option>
        <option value={"m5"}>5 minute interval</option>
        <option value={"m15"}>15 minute interval</option>
        <option value={"m30"}>30 minute interval</option>
        <option value={"h1"}>Hour interval</option>
        <option value={"h2"}>2 hour interval</option>
        <option value={"h6"}>6 Hour interval</option>
        <option value={"h12"}>12 hour interval</option>
      </select>
    </label>
  );
};
