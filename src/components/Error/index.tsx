import { useHistory } from "react-router-dom";

import errorIcon from "assets/img/error.png";


export default function ErrorComponent() {
  const history = useHistory();
  return (
    <div
      className="position-absolute text-center"
      style={{
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <h3>Ops! Something went wrong...</h3>
      <img src={errorIcon} alt="error" />
      <h4>Try to</h4>
      <button onClick={() => history.go(0)} className="btn btn-primary">
        Refresh Page
      </button>
    </div>
  );
}
