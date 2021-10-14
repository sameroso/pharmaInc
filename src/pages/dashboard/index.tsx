import { getRandomUser } from "api/axios/randomUser";
import { useEffect, useState } from "react";
import Modal from "components/Modal";
import { ModalContent } from "./parts/ModalContent";
import { DashboardTable } from "./parts/Table";
import { Results } from "types/models/user";

export function DashBoard() {
  const [users, setUsers] = useState<any>();
  const [selectedUser, setSelectedUser] = useState<Results>();
  const [show, setShow] = useState(false);

  useEffect(() => {
    async function getUsers() {
      const response = await getRandomUser({ gender: "" });
      setUsers(response.data);
    }
    getUsers();
  }, []);

  function handleSearchClick(value: any) {
    setShow(true);
    setSelectedUser(value);
  }

  return (
    <>
      {users?.results?.length > 0 ? (
        <DashboardTable
          handleSearchClick={handleSearchClick}
          data={users.results}
        />
      ) : (
        <></>
      )}
      <Modal
        title={
          <div>
            <h2 className="text-center mt-5">
              {selectedUser?.name.first} {selectedUser?.name.last}
            </h2>
            <img
              alt="User"
              className="rounded-circle border"
              style={{
                position: "absolute",
                transform: "translate(-50%,-140%)",
                boxShadow: "1px 1px #888888",
                left: "50%",
              }}
              src={selectedUser?.picture.large}
            />
          </div>
        }
        onClose={() => setShow(false)}
        show={show}
      >
        <ModalContent data={selectedUser} />
      </Modal>
    </>
  );
}
