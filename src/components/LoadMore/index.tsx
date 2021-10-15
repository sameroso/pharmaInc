import { AiOutlineReload } from "react-icons/ai";
import "./style.css";

interface Props {
  isLoading?: boolean;
}

export default function LoadMore({ isLoading }: Props) {
  return (
    <div
      className="d-flex align-items-center"
      style={{ opacity: !isLoading ? 0 : 1 }}
    >
      <AiOutlineReload size="30px" className={!isLoading ? "" : "loading"} />
      <h3 className={`mb-0 ${!isLoading ? "" : "loading-dots"}`}>
        Loading More
      </h3>
    </div>
  );
}
