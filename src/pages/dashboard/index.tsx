import { getRandomUser, RadomUserProps } from "api/axios/randomUser";
import { useEffect, useMemo, useState } from "react";
import { Modal, Pagination, SearchInput, LoadMore } from "components";
import { ModalContent } from "./parts/ModalContent";
import { DashboardTable } from "./parts/Table";
import { Results, Users } from "types/models/user";
import { AiOutlineReload } from "react-icons/ai";
import { useHistory } from "react-router";
import { UrlSearchParamsHelper } from "utils/urlSearchParamsHelper";

interface ModalTitleProps {
  selectedUser: Results | undefined;
}

function ModalTitle({ selectedUser }: ModalTitleProps) {
  return (
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
  );
}

export function DashBoard() {
  const [users, setUsers] = useState<Users>();
  const [searchInputValue, setSearchInputValue] = useState("");
  const [selectedUser, setSelectedUser] = useState<Results>();
  const [show, setShow] = useState(false);
  const history = useHistory();

  const urlSearchParamsHelper = useMemo(
    () =>
      UrlSearchParamsHelper.create<{ page: string }>(history.location.search),
    [history.location.search]
  );

  useEffect(() => {
    async function getUsers({ gender, page }: RadomUserProps) {
      const response = await getRandomUser({ gender, page });
      setUsers(response.data);
    }
    getUsers({ page: Number(urlSearchParamsHelper.getParam("page")) || 1 });
  }, [urlSearchParamsHelper]);

  function handleSearchClick(value: any) {
    setSelectedUser(value);
    setShow(true);
  }

  function handleLoadUserList({ page }: { page: string | number }) {
    const urlSearchParam = urlSearchParamsHelper.addOrReplaceParam({
      key: "page",
      value: typeof page === "string" ? page : page.toString(),
    }).urlSearchParamsString;
    history.push(`?${urlSearchParam}`);
  }

  function filterValues(value: string) {
    return users?.results.filter(
      (item) =>
        `${item.name.first.toLocaleLowerCase()} ${item.name.last.toLocaleLowerCase()}`.includes(
          value.toLocaleLowerCase()
        ) || `${item.nat.toLocaleLowerCase()}`.includes(value.toLowerCase())
    );
  }

  return (
    <>
      {users && users?.results?.length > 0 ? (
        <>
          <SearchInput
            className="w-75 m-auto my-4"
            id="searchInput"
            onChange={(value) => setSearchInputValue(value)}
          />
          <DashboardTable
            handleSearchClick={handleSearchClick}
            data={
              searchInputValue ? filterValues(searchInputValue) : users.results
            }
          />
          <div className="d-flex align-items-center justify-content-center">
            <LoadMore
              onClick={() =>
                handleLoadUserList({
                  page:
                    (Number(urlSearchParamsHelper.getParam("page")) || 1) + 1,
                })
              }
            />
          </div>
          <div>
            <Pagination
              activePage={
                Number(urlSearchParamsHelper.getParam("page"))
                  ? Number(urlSearchParamsHelper.getParam("page"))
                  : 1
              }
              marginPagesDisplayed={2}
              onPageChange={({ selected }) => {
                handleLoadUserList({ page: selected + 1 });
              }}
              pageCount={50}
              pageRangeDisplayed={5}
            />
          </div>
        </>
      ) : (
        <></>
      )}
      <Modal
        title={<ModalTitle selectedUser={selectedUser} />}
        onClose={() => setShow(false)}
        show={show}
      >
        <ModalContent data={selectedUser} />
      </Modal>
    </>
  );
}
