// Interfaces
import { RenderableType } from "types/renderable";

// Parts
import Column from "./parts/Column";
import Extra from "./parts/Extra";

// -------------------------------------------------
// Components
// -------------------------------------------------

export interface ContainerComponent extends JSX.Element {
  (props: ContainerProps): JSX.Element;
  Extra: typeof Extra;
  Column: typeof Column;
}

// -------------------------------------------------
// Props
// -------------------------------------------------

export interface ColumnProps {
  /** Key responsible for retrieving the value from the data's row */
  field: string;
  /** Label that will displayed as the column header */
  children: RenderableType;

  colWidth?: string;

  itemKey: string;

  /** Limit the number of characters in case the key's value is a string */
  limit?: number;
  /** HTML's colSpan value */
  colSpan?: number;
  /** Additional classNames to be added inside of the row */
  className?: string | string[];
  /** Additional classNames to be added inside of the column header */
  headerClassName?: string | string[];

  /** on Click event in case you click on the row. Do not use onClick inside a column if you already have a onClick specified inside of a table */
  onClick: (column: unknown, row: { [key: string]: unknown }) => void;
  /** Modifier so you can format the data received for the column's row */
  modifier?: (
    column: unknown,
    row: { [key: string]: unknown }
  ) => string | JSX.Element;
}

export interface ContainerProps {
  /** The data to be displayed inside of the table */
  data: Record<string, unknown>[];
  /** Content to prepare the table columns, collapse and extra */
  children: RenderableType;

  headerBgColor?: string;

  /** Sets the table to scroll */
  scrollable?: boolean;
  /** Shows a visual feedback for an empty table */
  showEmpty?: boolean;
  /** Message displayed when there are no rows in the table */
  emptyMessage?: string;
  /** Color of the message displayed when there are no rows in the table */
  emptyColor?: string;

  /** Number of the row to display collapse on, only works if you specify a collapse component */
  collapse?: number;
  /** Additional CSS classes to add into the component */
  className?: string | string[];

  /** Callback that runs when the user clicks in one of the rows. */
  onClick?: (row: { [key: string]: unknown }, index: number) => void;
}

export interface ExtraProps {
  /** Pass a callback function that can return anything renderable to the column */
  callback?: (props: Record<string, unknown>) => JSX.Element;
  /** CSS class to be passed into the table head column */
  className?: string[] | string;
  colWidth?: string;
  itemKey: string;

  /** HTML's column span size */
  colSpan?: number;
  /** Header title for the extra column */
  field?: string;
  /** Initializes extra before all columns */
  prepend?: boolean;

  /** Extra props that will be injected into the rendered component */
  [key: string]: unknown;
}
