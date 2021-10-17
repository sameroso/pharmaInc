import { BsSearch } from "react-icons/bs";
import { GrSort } from "react-icons/gr";
import { BsGenderFemale, BsGenderMale } from "react-icons/bs";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";

import { Table, Popup } from "components";

import { Results, Genders } from "types/models/user";
import { Sort } from "types/sort";

import style from "./style.module.scss";

interface GenderPopupProps {
  handleGetByGender: (gender: Genders) => void;
}

function GenderPopup({ handleGetByGender }: GenderPopupProps) {
  return (
    <div
      style={{ width: "130px", right: "10px" }}
      className={`bg-white rounded border`}
    >
      <ul style={{ padding: "2px" }}>
        <li
          onClick={() => handleGetByGender("")}
          style={{ listStyleType: "none" }}
          className={style.popup_items}
        >
          All
        </li>
      </ul>
      <ul style={{ padding: "2px" }}>
        <li
          onClick={() => handleGetByGender("female")}
          style={{ listStyleType: "none" }}
          className={style.popup_items}
        >
          <BsGenderFemale style={{ marginRight: "6px" }} cursor="pointer" />
          Female
        </li>
      </ul>
      <ul style={{ padding: "2px" }}>
        <li
          onClick={() => handleGetByGender("male")}
          style={{ listStyleType: "none" }}
          className={style.popup_items}
        >
          <BsGenderMale style={{ marginRight: "6px" }} cursor="pointer" />
          Male
        </li>
      </ul>
    </div>
  );
}

interface DashboardTableProps {
  data: Results[];
  handleSearchClick: (value: Results) => void;
  handleSortName: (sort: Sort) => void;
  handleGetByGender: (gender: Genders) => void;
  sortedType: Sort;
  gender: Genders;
}

export function DashboardTable({
  data,
  handleSearchClick,
  handleSortName,
  sortedType,
  handleGetByGender,
  gender,
}: DashboardTableProps) {
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
              style={{ marginLeft: "10px" }}
              onClick={() => handleSortName(sortedType)}
              cursor="pointer"
            />
          ) : (
            <AiOutlineSortDescending
              style={{ marginLeft: "10px" }}
              onClick={() => handleSortName(sortedType)}
              cursor="pointer"
            />
          )}
        </div>
      </Table.Column>
      <Table.Column itemKey="gender" field="gender">
        <div className="d-flex justify-content-center">
          Gender
          <Popup
            style={{ right: "-20px", cursor: "pointer" }}
            component={<GenderPopup handleGetByGender={handleGetByGender} />}
          >
            <>
              {!gender && (
                <GrSort style={{ marginLeft: "10px" }} cursor="pointer" />
              )}
              {gender === "female" && (
                <BsGenderFemale
                  style={{ marginLeft: "10px" }}
                  cursor="pointer"
                />
              )}
              {gender === "male" && (
                <BsGenderMale style={{ marginLeft: "10px" }} cursor="pointer" />
              )}
            </>
          </Popup>
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
        field="Actions"
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
