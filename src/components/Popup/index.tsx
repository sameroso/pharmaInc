import { useRef, useEffect, useState, CSSProperties } from "react";

interface Props {
  children: JSX.Element | JSX.Element[];
  className?: string;
  component?: JSX.Element | JSX.Element[];
  style?: CSSProperties;
}
export default function Popup({
  children,
  className,
  component,
  style,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <>
      <div
        ref={ref}
        onClick={() => setIsOpen(true)}
        className="position-relative"
      >
        {children}
        <div style={style} className={`position-absolute ${className}`}>
          {isOpen ? component : <></>}
        </div>
      </div>
    </>
  );
}
