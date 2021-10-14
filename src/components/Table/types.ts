// Interfaces
import { RenderableType } from "types/renderable";

// -------------------------------------------------
// Props
// -------------------------------------------------

export interface ColumnProps {
  /** Key responsible for retrieving the value from the data's row */
  field: string;
  /** Label that will displayed as the column header */
  children: RenderableType;

  itemKey: string;

  /** HTML's colSpan value */
  colSpan?: number;

  /** Modifier so you can format the data received for the column's row */
  modifier?: (column: unknown) => string | JSX.Element;
}

export interface ContainerProps {
  /** The data to be displayed inside of the table */
  data: Record<string, any>[];
  /** Content to prepare the table columns, collapse and extra */
  children: RenderableType;
}

export interface ExtraProps {
  /** Pass a callback function that can return anything renderable to the column */
  callback?: (props: Record<string, unknown>) => JSX.Element;
  /** CSS class to be passed into the table head column */
  className?: string[] | string;
  itemKey: string;

  /** HTML's column span size */
  colSpan?: number;
  /** Header title for the extra column */
  field?: string;
  /** Initializes extra before all columns */
  prepend?: boolean;
}
