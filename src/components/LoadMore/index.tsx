import { AiOutlineReload } from "react-icons/ai";

interface Props{
    onClick:()=>void
}

export default function LoadMore({onClick}:Props) {
  return (
    <div
      className="d-flex align-items-center"
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <AiOutlineReload size="30px" />
      <h3 className="mb-0">Loading More...</h3>
    </div>
  );
}
