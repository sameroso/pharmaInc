import Table from "components/Table";
export function DashBoard() {
  return (
    <Table
      data={[
        { name: "samer", value: "samer" },
        { name: "teste", value: "samer" },
      ]}
    >
      <Table.Column
        itemKey="dsa"
        onClick={() => {
          return;
        }}
        field="name"
      >
        Samer
      </Table.Column>
      <Table.Extra
        field="Ações"
        callback={(value: any) => {
          return <div>{value.name}</div>;
        }}
        itemKey="1212"
        prepend
      />
    </Table>
  );
}
