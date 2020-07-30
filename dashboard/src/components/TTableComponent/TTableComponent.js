import React from "react";
import { Input, Button, InputNumber, Select, Popover } from "antd";
import {
  DoubleLeftOutlined,
  DoubleRightOutlined,
  RightOutlined,
  LeftOutlined,
  CaretDownOutlined,
  CaretUpOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
  usePagination,
  useSortBy,
} from "react-table";
import matchSorter from "match-sorter";
import "./TTableComponent.scss";
import DefaultColumnFilter from "./Filters/DefaultColumnFilter";
import SelectColumnFilter from "./Filters/SelectColumnFilter";
import PageinationTemplate from "./PaginationTemplate";

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] });
}

function TTableComponent({
  columns,
  data,
  perPage,
  numOfPages,
  manualPagination,
  metaData,
  stripe,
  color,
  updateData,
  onPageChange,
}) {
  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue).toLowerCase().startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
    pageOptions,
    page,
    state: { pageIndex, pageSize },
    gotoPage,
    previousPage,
    nextPage,
    setPageSize,
    pageCount,
    canPreviousPage,
    canNextPage,
    pageSizeOptions,
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
      initialState: {
        pageSize: perPage || 25,
        pageIndex: metaData.currentPage || 0,
      },
      autoResetPage: false,
      updateData,
      manualPagination,
      pageCount: metaData.numOfPages ? metaData.numOfPages : -1,
    },
    useFilters, // useFilters!
    useGlobalFilter, // useGlobalFilter!
    useSortBy,
    usePagination
  );

  React.useEffect(() => {
    manualPagination && onPageChange(pageIndex);
  }, [pageIndex]);

  const rowData = manualPagination ? rows : page;

  if (!data.length) return <div className="no-data">No data loaded</div>;

  return (
    <React.Fragment>
      <div className="ttable">
        <table className="table table-striped table-hover" {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, columnIndex) => {
                  return (
                    <th key={columnIndex}>
                      <div className="th-cell">
                        <div {...column.getHeaderProps(column.getSortByToggleProps())}>
                          {column.render("headerText")}{" "}
                          {column.isSorted ? (
                            column.isSortedDesc ? (
                              <CaretUpOutlined />
                            ) : (
                              <CaretDownOutlined />
                            )
                          ) : (
                            ""
                          )}
                        </div>

                        {column.Filter && (
                          <div className="filter">
                            <Popover
                              trigger="click"
                              title="Filter"
                              content={column.render("Filter")}
                              placement={columnIndex === 0 ? "bottomLeft" : "bottomRight"}
                            >
                              <button className="filter-button">
                                <FilterOutlined />
                              </button>
                            </Popover>
                          </div>
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rowData.map((row, i) => {
              const className = stripe ? ((i + 1) % 2 === 0 ? "even" : "odd") : null;
              const bg = color && row.original.color ? row.original.color : "transparent";
              prepareRow(row);
              return (
                <tr
                  style={{ backgroundColor: bg }}
                  key={i}
                  className={className}
                  {...row.getRowProps()}
                >
                  {row.cells.map((cell, index) => {
                    return (
                      <td key={index} {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {manualPagination && pageCount > 1 && (
        <PageinationTemplate
          adjacents={3}
          pageCount={pageCount}
          currentPage={pageIndex + 1}
          gotoPage={pageNumber => {
            gotoPage(pageNumber - 1);
          }}
        />
      )}
    </React.Fragment>
  );
}

export default TTableComponent;
