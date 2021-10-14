import Table from "components/Table";
import { BsSearch } from "react-icons/bs";
import { tableColumns } from "./tableColumns";
import { mock } from "./mock";

export function DashBoard() {
  return (
    <Table data={mock.results}>
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
  );
}
