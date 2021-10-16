import { Table } from "components";
import { BsSearch } from "react-icons/bs";
import { GrSort } from "react-icons/gr";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";
import { Results } from "types/models/user";

interface Props {
  data: Results[];
  handleSearchClick: (value: Results) => void;
  handleSortName: (sort: "asc" | "desc" | "") => void;
  sortedType: "asc" | "desc" | "";
}

export function DashboardTable({
  data,
  handleSearchClick,
  handleSortName,
  sortedType,
}: Props) {
  return (
    <Table data={data}>
      <Table.Column
        itemKey="name"
        field="name"
        modifier={(props: any) => `${props.first} ${props.last}`}
      >
        <div>
          Name
          {sortedType === "asc" || !sortedType ? (
            <AiOutlineSortAscending
              onClick={() => handleSortName(sortedType)}
              cursor="pointer"
            />
          ) : (
            <AiOutlineSortDescending
              onClick={() => handleSortName(sortedType)}
              cursor="pointer"
            />
          )}
        </div>
      </Table.Column>
      <Table.Column itemKey="gender" field="gender">
        <div>
          Gender
          <GrSort style={{ marginLeft: "10px" }} cursor="pointer" />
        </div>
      </Table.Column>
      <Table.Column
        itemKey="dob"
        field="dob"
        modifier={(props: any) =>
          new Date(props.date).toLocaleDateString("en-US")
        }
      >
        <div>Birth</div>
      </Table.Column>

      <Table.Extra
        field="Ações"
        callback={(value: Results) => {
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
