import React, { useMemo } from 'react';

import { Table } from '../Table';

import { DataGridHead } from './DataGridHead';
import { DataGridBody } from './DataGridBody';
import {
  DataGridContainer,
  StyledPagination,
  StyledTableContainer,
} from './styled';
import { DataGridProps } from './types';

export function DataGrid<T>({
  columns,
  data = [],
  selectedRows = [],
  rowsPerPage = 10,
  sorting = [],
  maxHeight,
  onSelect,
  onPageChange,
  totalCount,
  onSort,
  keyId,
  page,
}: DataGridProps<T>) {
  const selectable = Boolean(onSelect);

  const handleSelectAllRows = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (!onSelect) return;

    const pageRows = data.map((row) => row[keyId]);

    if (event.target.checked) {
      const mergedSelectedRows = [...selectedRows, ...pageRows];

      return onSelect(mergedSelectedRows);
    }

    const filteredRows = selectedRows.filter((id) => !pageRows.includes(id));

    onSelect(filteredRows);
  };

  const handleSelectRow = React.useCallback(
    (rowId: string) =>
      (event: React.ChangeEvent<HTMLInputElement>): void => {
        if (!onSelect) return;

        if (event.target.checked) {
          return onSelect([...selectedRows, rowId]);
        }

        return onSelect(selectedRows.filter((id) => id !== rowId));
      },
    [selectedRows]
  );

  const uncheckedRowsCount = useMemo(() => {
    return data.filter((row) => !selectedRows.includes(row[keyId])).length;
  }, [data, selectedRows]);

  return (
    <DataGridContainer>
      <StyledTableContainer maxHeight={maxHeight}>
        <Table stickyHeader>
          <DataGridHead
            onSort={onSort}
            rowsCount={data.length}
            uncheckedRowsCount={uncheckedRowsCount}
            onSelectAllRows={handleSelectAllRows}
            selectable={selectable}
            sorting={sorting}
            columns={columns}
          />
          <DataGridBody
            keyId={keyId}
            selectedRows={selectedRows}
            onSelectRow={handleSelectRow}
            selectable={selectable}
            data={data}
            columns={columns}
          />
        </Table>
      </StyledTableContainer>
      <StyledPagination
        page={page}
        onChange={onPageChange}
        totalCount={totalCount}
        rowsPerPage={rowsPerPage}
      />
    </DataGridContainer>
  );
}
