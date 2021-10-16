import { MdOutlineLocalPharmacy } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { useHistory } from "react-router";

export default function Header() {
  const history = useHistory();
  return (
    <div
      className="px-4 py-2 local_bg-primary position-sticky d-flex align-items-center justify-content-between"
      style={{
        top: 0,
        zIndex: 9,
      }}
    >
      <div className="d-flex cursor-pointer" onClick={() => history.go(0)}>
        <MdOutlineLocalPharmacy size="30px" color="white" />
        <h3 className="text-white mb-0">Pharma Inc.</h3>
      </div>
      <CgProfile color="white" size="30px" cursor="pointer" />
    </div>
  );
}
