// Packages
import React, { useState, useEffect } from "react";

// Interfaces
import RenderableType from "types/renderable";
import Column from "./Column";
import Extra from "./Extra";
import { ContainerProps, ColumnProps, ExtraProps } from "../types";

function Container(props: ContainerProps) {
  // -------------------------------------------------
  // Properties
  // -------------------------------------------------

  // states
  const [columnData, setColumnData] = useState<ColumnProps[]>([]);
  const [prependData, setPrependData] = useState<ExtraProps[]>([]);
  const [appendData, setAppendData] = useState<ExtraProps[]>([]);

  // -------------------------------------------------
  // Effects
  // -------------------------------------------------

  useEffect(() => {
    const columns: typeof columnData = [];
    const prepends: typeof prependData = [];
    const appends: typeof appendData = [];
    const childElements = Array.isArray(props.children)
      ? props.children
      : [props.children];

    for (let i = 0; i < childElements.length; i += 1) {
      const elements = (childElements as JSX.Element[])[i];

      // Find columns array
      if (Array.isArray(elements)) {
        elements.forEach((element) => {
          if (element?.type?.type === "column") {
            columns.push(element.props);
          }
        });
      }

      if (elements.type === React.Fragment && elements.props?.children) {
        elements.props?.children.forEach((element: any) => {
          if (element?.type?.type === "column") {
            columns.push(element.props);
          }
        });
      }

      // Find columns
      if (elements?.type?.type === "column") {
        columns.push(elements.props);
      }

      // Find extra
      if (elements?.type?.type === "extra") {
        const isPrepend = !!elements.props.prepend;

        // push
        (isPrepend ? prepends : appends).push(elements.props);
      }
    }

    // set relative data
    setColumnData(columns);
    setPrependData(prepends);
    setAppendData(appends);
  }, [props.children]);

  // -------------------------------------------------
  // Memos
  // -------------------------------------------------

  const columns = () => {
    const columnElementsArr = [];
    let counter = 0;

    // prepend headers
    for (let i = 0; i < prependData.length; i += 1, counter += 1) {
      const props = prependData[i];

      columnElementsArr.push(
        <th key={`prepend${props.itemKey}`} colSpan={props.colSpan || 1}>
          {props.field}
        </th>
      );
    }

    // normal headers
    for (let i = 0; i < columnData.length; i += 1) {
      const column = columnData[i] as ColumnProps;

      columnElementsArr.push(
        <th key={`col${column.itemKey}`} colSpan={column.colSpan || 1}>
          {column.children}
        </th>
      );
    }

    // append headers
    for (let i = 0; i < appendData.length; i += 1, counter += 1) {
      const { field, colSpan, itemKey } = appendData[i];

      columnElementsArr.push(
        <th key={`append${itemKey}${counter}`} colSpan={colSpan || 1}>
          {field}
        </th>
      );
    }

    return columnElementsArr;
  };

  const rows = () => {
    const response = [];

    // prepare rows
    for (let i = 0; i < props.data.length; i += 1) {
      const row = props.data[i];
      const rowResponse = [];
      let pos = 0;

      // prepend fields
      for (let i = 0; i < prependData.length; i += 1, pos += 1) {
        const { callback, ...restProps } = prependData[i];

        rowResponse.push(
          <td colSpan={restProps.colSpan || 1} key={pos}>
            {callback &&
              callback({
                ...restProps,
                ...row,
                index: i,
              })}
          </td>
        );
      }

      // prepare fields
      for (let i = 0; i < columnData.length; i += 1, pos += 1) {
        const header = columnData[i] as ColumnProps;
        const modified = header.modifier
          ? header.modifier(row[header.field])
          : (row[header.field] as RenderableType);

        rowResponse.push(
          <td colSpan={header.colSpan || 1} key={pos}>
            {modified}
          </td>
        );
      }

      // append fields
      for (let i = 0; i < appendData.length; i += 1, pos += 1) {
        const { callback, ...restProps } = appendData[i];

        rowResponse.push(
          <td colSpan={restProps.colSpan || 1} key={pos}>
            {callback &&
              callback({
                ...restProps,
                ...row,
                index: i,
              })}
          </td>
        );
      }

      // bind row
      response.push(<tr key={i}>{rowResponse}</tr>);
    }

    return response;
  };

  // -------------------------------------------------
  // Render
  // -------------------------------------------------

  return (
    <div className="d-flex justify-content-center">
      <div className="w-100">
        <table className="text-center table table-hover w-100 table-bordered border ">
          <thead className="w-100">
            <tr className="w-100">{columns()}</tr>
          </thead>
          <tbody data-testid="tbody" className="w-100">{rows()}</tbody>
        </table>
      </div>
    </div>
  );
}

Container.Column = Column;
Container.Extra = Extra;

export default Container;
