import { useCallback, useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router";

import { getRandomUser, RadomUserProps } from "api/axios/randomUser";
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

import { useDebounce } from "utils/hooks";
import { UrlSearchParamsHelper } from "utils/urlSearchParamsHelper";

import { Results, Users, Genders } from "types/models/user";
import { Sort } from "types/sort";


import style from "./style.module.scss";
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
        className={`rounded-circle border position-absolute ${style.modal_title}`}
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
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sortType, setSortType] = useState<Sort>("");
  const [selectedGender, setSelectedGender] = useState<Genders>("");

  const { useError } = ErrorModule;
  const { useGlobalLoader } = GlobalLoaderModule;

  const history = useHistory();
  const { addLoader, removeLoader } = useGlobalLoader();
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
    [addError, addLoader, removeError, removeLoader]
  );

  useEffect(() => {
    getUsers({ page: Number(urlSearchParamsHelper.getParam("page")) || 1 });
  }, [addError, getUsers, removeError, urlSearchParamsHelper]);

  function handleSearchClick(value: Results) {
    setSelectedUser(value);
    setShowModal(true);
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

  function sortNames(sort: Sort) {
    return (
      users?.results?.sort((a, b) => {
        if (sort === "asc")
          return a.name.first.localeCompare(b.name.first);
        if (sort === "desc") return b.name.first.localeCompare(a.name.first);
        return 0;
      }) || []
    );
  }

  function handleSortNames(sort: Sort) {
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

  async function handleGetByGender(gender: Genders) {
    if (gender === selectedGender) return;
    addLoader();
    const user = await getUsers({
      gender: gender,
      page: Number(urlSearchParamsHelper.getParam("page")) || 1,
    });
    if (user) {
      setSelectedGender(gender);
    }
    removeLoader();
  }

  return (
    <ErrorModule.ErrorContainerHandler>
      <>
        {users && users?.results?.length > 0 && (
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
              gender={selectedGender}
            />
            <div className="d-flex align-items-center justify-content-center">
              <LoadMore isLoading={isLoading} />
            </div>
            <div className="m-auto mt-3 w-fit-content">
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
        )}
        <Modal
          title={<ModalTitle selectedUser={selectedUser} />}
          onClose={() => setShowModal(false)}
          show={showModal}
        >
          <ModalContent data={selectedUser} />
        </Modal>
      </>
    </ErrorModule.ErrorContainerHandler>
  );
}
