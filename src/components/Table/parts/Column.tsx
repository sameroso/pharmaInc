// Interfaces
import { ColumnProps } from "../types";

const Column = (props: ColumnProps) => props;
Column.type = "column";
export default (Column as unknown) as (props: ColumnProps) => JSX.Element;
