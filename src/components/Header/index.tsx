import { useHistory } from "react-router";

import { MdOutlineLocalPharmacy } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

import { Popup } from "components";

import style from "./style.module.scss";

function ProfilePopUp() {
  return (
    <div className={`bg-white rounded border ${style.popup_container}`}>
      <ul className="mb-0">
        <li className={style.popup_items}>Logout</li>
      </ul>
    </div>
  );
}

export default function Header() {
  const history = useHistory();
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
        <CgProfile color="white" size="30px" cursor="pointer" />
      </Popup>
    </div>
  );
}
