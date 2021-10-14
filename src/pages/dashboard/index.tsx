import { getRandomUser, RadomUserProps } from "api/axios/randomUser";
import { useEffect, useState } from "react";
import Modal from "components/Modal";
import { ModalContent } from "./parts/ModalContent";
import { DashboardTable } from "./parts/Table";
import { Results } from "types/models/user";
import { AiOutlineReload } from "react-icons/ai";

export function DashBoard() {
  const [users, setUsers] = useState<any>();
  const [selectedUser, setSelectedUser] = useState<Results>();
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(1);

  async function getUsers({ gender, page }: RadomUserProps) {
    const response = await getRandomUser({ gender, page });
    setUsers(response.data);
  }

  useEffect(() => {
    getUsers({ page: 1 });
  }, []);

  function handleSearchClick(value: any) {
    setShow(true);
    setSelectedUser(value);
  }

  function handleLoadMore() {
    getUsers({ page: page + 1 });
    setPage((prev) => prev + 1);
  }

  return (
    <>
      {users?.results?.length > 0 ? (
        <>
          <DashboardTable
            handleSearchClick={handleSearchClick}
            data={users.results}
          />
          <div
            className="d-flex align-items-center justify-content-center"
            onClick={handleLoadMore}
            style={{ cursor: "pointer" }}
          >
            <AiOutlineReload size="40px" />
            <h3>Loading More</h3>
          </div>
        </>
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
