import React from "react";
import { Input } from "antd";

export default function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;

  const inputRef = React.createRef();

  React.useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <React.Fragment>
      <Input
        ref={inputRef}
        size="small"
        value={filterValue || ""}
        onChange={e => {
          setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
        }}
        placeholder={`Search ${count} records...`}
      />
    </React.Fragment>
  );
}
