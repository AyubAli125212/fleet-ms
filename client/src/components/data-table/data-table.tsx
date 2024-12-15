import { useState } from "react";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTableToolbar } from "./data-table-toolbar";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableLoading } from "./data-table-skeleton";
import { ColumnOptions, generateColumns } from "./columns";

interface DataTableProps<TData> {
  title : string;
  loading?: boolean;
  columnOptions: ColumnOptions[];
  data: TData[];
  searchBy?: string;
  actions?: {
    label: string;
    icon: JSX.Element;
    onClick: (rowData: TData) => void;
    danger?: boolean;
  }[];
  activity?: {
    label : string;
    icon: JSX.Element;
    onClick: () => void;
  }[];
}

export function DataTable<TData>({
  title = "table",
  loading = false,
  columnOptions,
  data,
  searchBy,
  actions,
  activity
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const columns = generateColumns(columnOptions, actions);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const filters = columnOptions
    .filter((col) => col.isFilterable && col.filterOptions)
    .map((col) => ({
      columnId: col.accessorKey as string,
      title: col.header,
      options: col.filterOptions!,
    }));

  const searchPlaceholder = searchBy
    ? `Search by ${
        columnOptions.find((col) => col.accessorKey === searchBy)?.header
      }`
    : "Search...";

    // useEffect(() => {
    //   console.log("Sorting changed:", sorting);
    // }, [sorting]);
  
    // // Log column filters changes
    // useEffect(() => {
    //   console.log("Column Filters changed:", columnFilters);
    // }, [columnFilters]);
  
    // // Log column visibility changes
    // useEffect(() => {
    //   console.log("Column Visibility changed:", columnVisibility);
    // }, [columnVisibility]);
  
    // // Log row selection changes
    // useEffect(() => {
    //   console.log("Row Selection changed:", rowSelection);
    // }, [rowSelection]);

  return (
    <div className="space-y-4">
      {loading ? (
        <div className="rounded-md">
          <DataTableLoading columnCount={columns.length} rowCount={10} />
        </div>
      ) : (
        <>
          {/* Toolbar */}
          <DataTableToolbar
            title={title}
            table={table}
            searchColumnId={searchBy as string}
            searchPlaceholder={searchPlaceholder}
            filters={filters}
            activity={activity}
            enableReset
          />

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody className="relative">
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => {
                        const columnOption = columnOptions.find(
                          (col) => col.accessorKey === cell.column.id
                        );
                        return (
                          <TableCell
                            key={cell.id}
                            width={columnOption?.width}
                            style={{
                              width: columnOption?.width,
                              textAlign: columnOption?.align || "left",
                              padding: columnOption?.padding || "10px",
                            }}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <DataTablePagination table={table} />
        </>
      )}
    </div>
  );
}