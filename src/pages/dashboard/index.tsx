import { getRandomUser, RadomUserProps } from "api/axios/randomUser";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Modal,
  Pagination,
  SearchInput,
  LoadMore,
  ErrorModule,
  GlobalLoaderModule,
} from "components";
import { ModalContent } from "./parts/ModalContent";
import { DashboardTable } from "./parts/Table";
import { Results, Users } from "types/models/user";
import { useHistory } from "react-router";
import { UrlSearchParamsHelper } from "utils/urlSearchParamsHelper";
import { useDebounce } from "utils/hooks";
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
          zIndex: 999,
        }}
        src={selectedUser?.picture.large}
      />
    </div>
  );
}

export function DashBoard() {
  const [users, setUsers] = useState<Users>();
  const [searchInputValue, setSearchInputValue] = useState("");
  const debouncedSearchInputValue = useDebounce(searchInputValue, 400);
  const [selectedUser, setSelectedUser] = useState<Results>();
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sortType, setSortType] = useState<"asc" | "desc" | "">("");
  const [gender, setGender] = useState<"male" | "female" | "">("");
  const history = useHistory();
  const { addLoader, removeLoader } = GlobalLoaderModule.useGlobalLoader();

  const { useError } = ErrorModule;
  const { addError, removeError } = useError();

  const urlSearchParamsHelper = useMemo(
    () =>
      UrlSearchParamsHelper.create<{ page: string }>(history.location.search),
    [history.location.search]
  );

  const getUsers = useCallback(
    async ({ gender, page }: RadomUserProps) => {
      try {
        addLoader();
        setIsLoading(true);
        const response = await getRandomUser({ gender, page });
        setIsLoading(false);
        removeError();
        setUsers(response.data);
        removeLoader();
        return true;
      } catch (error) {
        removeLoader();
        setIsLoading(false);
        addError();
      }
    },
    [addError, removeError]
  );

  useEffect(() => {
    getUsers({ page: Number(urlSearchParamsHelper.getParam("page")) || 1 });
  }, [addError, getUsers, removeError, urlSearchParamsHelper]);

  function handleSearchClick(value: Results) {
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
    return (
      users?.results.filter(
        (item) =>
          `${item.name.first.toLocaleLowerCase()} ${item.name.last.toLocaleLowerCase()}`.includes(
            value.toLocaleLowerCase()
          ) || `${item.nat.toLocaleLowerCase()}`.includes(value.toLowerCase())
      ) || []
    );
  }

  function sortNames(sort: "asc" | "desc" | "") {
    return (
      users?.results?.sort((a, b) => {
        if (sort === "asc")
          //sort string ascending
          return a.name.first.localeCompare(b.name.first);
        if (sort === "desc") return b.name.first.localeCompare(a.name.first);
        return 0;
      }) || []
    );
  }

  function handleSortNames(sort: "asc" | "desc" | "") {
    if (users && users?.results?.length > 0) {
      setUsers({
        ...users,
        results: sortNames(sort === "desc" || !sort ? "asc" : "desc"),
      });
      if (sortType === "asc") {
        setSortType("desc");
      } else {
        setSortType("asc");
      }
    }
  }

  async function handleGetByGender(gender: "male" | "female" | "") {
    addLoader();
    const user = await getUsers({
      gender: gender,
      page: Number(urlSearchParamsHelper.getParam("page")) || 1,
    });
    if (user) {
      setGender(gender);
    }
    removeLoader();
  }

  return (
    <ErrorModule.ErrorContainerHandler>
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
                searchInputValue
                  ? filterValues(debouncedSearchInputValue)
                  : users.results
              }
              handleSortName={handleSortNames}
              sortedType={sortType}
              handleGetByGender={handleGetByGender}
              gender={gender}
            />
            <div className="d-flex align-items-center justify-content-center">
              <LoadMore isLoading={isLoading} />
            </div>
            <div className="m-auto mt-3" style={{ width: "fit-content" }}>
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
                pageCount={7}
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
    </ErrorModule.ErrorContainerHandler>
  );
}
