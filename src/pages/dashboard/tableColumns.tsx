export const tableColumns = [
  {
    header: "Nome",
    field: "name",
    modifier: (props: any) => `${props.first} ${props.last}`,
  },
  {
    header: "Gender",
    field: "gender",
    modifier: (props: any) => props,
  },
  {
    header: "Birth",
    field: "dob",
    modifier: (props: any) => new Date(props.date).toLocaleDateString("en-US"),
  },
];
