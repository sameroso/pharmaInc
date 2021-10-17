import { AiOutlineReload } from "react-icons/ai";

import style from "./style.module.scss";

interface Props {
  isLoading?: boolean;
}

export default function LoadMore({ isLoading }: Props) {
  return (
    <div
      className={`d-flex align-items-center ${
        !isLoading ? "opacity-0" : "opacity-100"
      }`}
    >
      <AiOutlineReload
        size="30px"
        color="var(--color-dark)"
        className={!isLoading ? "" : style.loading_icon}
      />
      <h3 className={`mb-0 ${!isLoading ? "" : style.loading_dots}`}>
        Loading More
      </h3>
    </div>
  );
}
