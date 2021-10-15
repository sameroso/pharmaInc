import { Table } from "components";
import { BsSearch } from "react-icons/bs";
import { tableColumns } from "./tableColumns";

export function DashboardTable({ data, handleSearchClick }: any) {
  return (
    <Table data={data}>
      <>
        {tableColumns.map((item) => (
          <Table.Column
            itemKey={item.field}
            key={item.field}
            field={item.field}
            modifier={item.modifier}
          >
            <div>{item.header}</div>
          </Table.Column>
        ))}
      </>
      <Table.Extra
        field="Ações"
        callback={(value) => {
          return (
            <div>
              <BsSearch
                cursor="pointer"
                className="cursor-pointer"
                data-bs-toggle="tooltip"
                title="Details"
                onClick={() => handleSearchClick(value)}
              />
            </div>
          );
        }}
        itemKey="1212"
      />
    </Table>
  );
}
