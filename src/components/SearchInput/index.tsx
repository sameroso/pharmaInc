import { FaSearch } from "react-icons/fa";

interface Props {
  onChange: (value: string) => void;
  className: string;
  id?: string;
}

export default function SearchInput({ onChange, className, id }: Props) {
  return (
    <div className={`position-relative ${className}`}>
      <label htmlFor={id} style={{ right: "10px", position: "absolute" }}>
        <FaSearch cursor="pointer" />
      </label>
      <input
        onChange={(e) => onChange(e.target.value)}
        id={id}
        className="w-100"
        style={{ paddingRight: "10px" }}
      />
    </div>
  );
}
