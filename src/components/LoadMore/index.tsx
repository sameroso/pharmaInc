import { AiOutlineReload } from "react-icons/ai";
import "./style.css";

interface Props {
  onClick: () => void;
  isLoading?: boolean;
}

export default function LoadMore({ onClick, isLoading }: Props) {
  return (
    <div
      className="d-flex align-items-center"
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <AiOutlineReload size="30px" className={!isLoading ? "" : "loading"} />
      <h3 className={`mb-0 ${!isLoading ? "" : "loading-dots"}`}>
        Loading More
      </h3>
    </div>
  );
}
