'use client';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

export interface Column<T> {
  key: keyof T;
  header: string;
  render?: (row: T) => React.ReactNode;
}

interface DynamicTableProps<T> {
  columns: Column<T>[];
  data: T[];
}

const DynamicTable = <T,>({ columns, data }: DynamicTableProps<T>) => {
  return (
    <Table
      aria-label="Dynamic table"
      className="dark:bg-slate-800 text-slate-700 dark:text-slate-50 rounded-xl shadow-sm"
    >
      <TableHeader>
        {columns.map((col) => (
          <TableColumn key={col.key.toString()} className="border">
            {col.header}
          </TableColumn>
        ))}
      </TableHeader>
      {data.length ? (
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              {columns.map((col) => (
                <TableCell key={col.key.toString()} className="border">
                  {col.render
                    ? col.render(row)
                    : (row[col.key] as React.ReactNode)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      ) : (
        <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
      )}
    </Table>
  );
};

export default DynamicTable;
