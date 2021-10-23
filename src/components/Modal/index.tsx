/* eslint-disable react-hooks/exhaustive-deps */
import ReactDOM from "react-dom";
import { useEffect } from "react";

import { AiOutlineClose } from "react-icons/ai";

import style from "./style.module.scss";

interface Props {
  onClose: () => void;
  title: string | JSX.Element | JSX.Element[];
  children: string | JSX.Element | JSX.Element[];
  show: boolean;
}

const Modal = (props: Props) => {
  const closeOnEscapeKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
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
      className={`${style.modal} ${props.show ? style.enter_done : ""}`}
      onClick={props.onClose}
    >
      <div
        className={style.modal_content}
        onClick={(e) => e.stopPropagation()}
      >
        <AiOutlineClose
          onClick={props.onClose}
          cursor="pointer"
          size="20px"
          className={style.close_icon}
        />

        <div className="modal-header">
          <h4 className="modal-title w-100">{props.title}</h4>
        </div>
        <div className="modal-body">{props.children}</div>
      </div>
    </div>,
    document.body as HTMLElement
  );
};

export default Modal;
