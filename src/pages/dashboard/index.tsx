import { getRandomUser, RadomUserProps } from "api/axios/randomUser";
import { useEffect, useMemo, useState } from "react";
import Modal from "components/Modal";
import { ModalContent } from "./parts/ModalContent";
import { DashboardTable } from "./parts/Table";
import { Results } from "types/models/user";
import { AiOutlineReload } from "react-icons/ai";
import { useHistory } from "react-router";
import { UrlSearchParamsHelper } from "utils/urlSearchParamsHelper";
import ReactPaginate from "react-paginate";
import "./style.css";

export function DashBoard() {
  const [users, setUsers] = useState<any>();
  const [selectedUser, setSelectedUser] = useState<Results>();
  const [show, setShow] = useState(false);
  const history = useHistory();

  const urlSearchParamsHelper = useMemo(
    () =>
      UrlSearchParamsHelper.create<{ page: string }>(history.location.search),
    [history.location.search]
  );

  async function getUsers({ gender, page }: RadomUserProps) {
    const response = await getRandomUser({ gender, page });
    setUsers(response.data);
  }

  useEffect(() => {
    getUsers({ page: Number(urlSearchParamsHelper.getParam("page")) || 1 });
  }, [urlSearchParamsHelper]);

  function handleSearchClick(value: any) {
    setShow(true);
    setSelectedUser(value);
  }

  function handleLoadMore() {
    const page = Number(urlSearchParamsHelper.getParam("page"));
    const urlSearchParam = urlSearchParamsHelper.addOrReplaceParam({
      key: "page",
      value: `${page ? page + 1 : 2}`,
    }).urlSearchParamsString;
    history.push(`?${urlSearchParam}`);
  }

  return (
    <>
      {users?.results?.length > 0 ? (
        <>
          <DashboardTable
            handleSearchClick={handleSearchClick}
            data={users.results}
          />
          <div className="d-flex align-items-center justify-content-center">
            <div onClick={handleLoadMore} style={{ cursor: "pointer" }}>
              <AiOutlineReload size="40px" />
              <h3>Loading More</h3>
            </div>
          </div>
          <div>
            <ReactPaginate
              previousLabel={"prev"}
              nextLabel={"next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={window.screen.width <= 400 ? 10 : 50}
              marginPagesDisplayed={2}
              disableInitialCallback
              forcePage={
                Number(urlSearchParamsHelper.getParam("page"))
                  ? Number(urlSearchParamsHelper.getParam("page")) - 1
                  : 0
              }
              containerClassName={"pagination"}
              activeClassName={"active"}
              pageRangeDisplayed={5}
              onPageChange={(selectedPage) => {
                const urlSearchParam = urlSearchParamsHelper.addOrReplaceParam({
                  key: "page",
                  value: `${selectedPage.selected + 1}`,
                }).urlSearchParamsString;
                history.push(`?${urlSearchParam}`);
              }}
            />
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
