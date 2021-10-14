import Table from "components/Table";
import { BsSearch } from "react-icons/bs";
import { tableColumns } from "./tableColumns";
import { getRandomUser } from "api/axios/randomUser";
import { useEffect, useState } from "react";
export function DashBoard() {
  const [users, setUsers] = useState<any>();
  useEffect(() => {
    async function getUsers() {
      const response = await getRandomUser({ gender: "" });
      setUsers(response.data);
    }
    getUsers();
  }, []);
  return users?.results?.length > 0 ? (
    <Table data={users.results}>
      {
        tableColumns.map((item) => (
          <Table.Column
            itemKey={item.field}
            key={item.field}
            field={item.field}
            modifier={item.modifier}
          >
            {item.header}
          </Table.Column>
        )) as any
      }
      <Table.Extra
        field="Ações"
        callback={(value) => {
          return (
            <div>
              <BsSearch
                cursor="pointer"
                className="cursor-pointer"
                data-bs-toggle="tooltip"
                title="Detalhes"
                onClick={() => console.log(value)}
              />
            </div>
          );
        }}
        itemKey="1212"
      />
    </Table>
  ) : (
    <></>
  );
}
