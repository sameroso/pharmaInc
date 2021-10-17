import { useHistory } from "react-router";

import { useAuth } from "utils/hooks";

import { MdOutlineLocalPharmacy } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

import { Popup } from "components";

import style from "./style.module.scss";

function ProfilePopUp() {
  const { logout } = useAuth();
  return (
    <div className={`bg-white rounded border ${style.popup_container}`}>
      <ul className="mb-0">
        <li className={style.popup_items} onClick={() => logout()}>
          Logout
        </li>
      </ul>
    </div>
  );
}

export default function Header() {
  const history = useHistory();
  const { loginObj } = useAuth();
  console.log(loginObj);

  return (
    <div
      className={`px-4 py-2 local_bg-primary position-sticky d-flex align-items-center justify-content-between ${style.header_container}`}
    >
      <div className="d-flex cursor-pointer" onClick={() => history.go(0)}>
        <MdOutlineLocalPharmacy size="30px" color="white" />
        <h3 className="text-white mb-0">Pharma Inc.</h3>
      </div>
      <Popup
        style={{ right: "2px", cursor: "pointer" }}
        component={<ProfilePopUp />}
      >
        <>
          {loginObj?.imageUrl ? (
            <div className="d-flex align-items-center">
              <p className="text-white mb-0" style={{ marginRight: "10px" }}>
                {loginObj?.name || ""}
              </p>
              <img
                style={{ height: "30px", width: "30px" }}
                src={loginObj.imageUrl}
                alt="profile"
                className="cursor-pointer rounded-circle"
              />
            </div>
          ) : (
            <CgProfile color="white" size="30px" cursor="pointer" />
          )}
        </>
      </Popup>
    </div>
  );
}
