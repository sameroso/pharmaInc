import { useEffect } from "react";
import ReactDOM from "react-dom";
import "./style.css";
import { AiOutlineClose } from "react-icons/ai";

interface Props {
  onClose: () => void;
  title: string | JSX.Element | JSX.Element[];
  children: string | JSX.Element | JSX.Element[];
  show: boolean;
}

const Modal = (props: Props) => {
  const closeOnEscapeKeyDown = (e: any) => {
    if ((e.charCode || e.keyCode) === 27) {
      props.onClose();
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, []);

  return ReactDOM.createPortal(
    <div
      className={`modal ${props.show ? "enter-done" : ""}`}
      onClick={props.onClose}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <AiOutlineClose
          onClick={props.onClose}
          cursor="pointer"
          size="20px"
          style={{ right: "0.8rem", top: "0.8rem", position: "absolute" }}
        />

        <div className="modal-header">
          <h4 className="modal-title w-100">{props.title}</h4>
        </div>
        <div className="modal-body">{props.children}</div>
        <div className="modal-footer"></div>
      </div>
    </div>,
    document.getElementById("modal") as HTMLElement
  );
};

export default Modal;
