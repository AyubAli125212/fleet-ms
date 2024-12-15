import type { Row, Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableFacetedFilter } from "@/components/data-table/data-table-faceted-filter";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";
import { Download, X } from "lucide-react";
import { mkConfig, generateCsv, download } from "export-to-csv";
import { columnOptions } from "@/pages/manager/vehicles/helper-function";
import moment from "moment";
import { useFetcher } from "react-router-dom";

interface FilterOption {
  columnId: string;
  title: string;
  options?: { label: string; value: string }[];
}

interface DataTableToolbarProps<TData> {
  title: string;
  table: Table<TData>;
  searchPlaceholder?: string;
  searchColumnId?: keyof TData;
  filters?: FilterOption[];
  enableReset?: boolean;
  activity?: {
    label: string;
    icon: JSX.Element;
    onClick: () => void;
  }[];
}

export function DataTableToolbar<TData>({
  title,
  table,
  searchPlaceholder = "Search...",
  searchColumnId,
  filters = [],
  enableReset = true,
  activity,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  // Handle Search Change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value.toLowerCase();
    const column = searchColumnId
      ? table.getColumn(searchColumnId as string)
      : null;
    if (column) {
      column.setFilterValue(searchValue);
    }
  };

  // Handle Reset Filters
  const handleResetFilters = () => {
    table.resetColumnFilters();
  };

  // Check if any column is exportable
  const fetcher = useFetcher();
  const hasExportableColumns = columnOptions(fetcher).some(
    (col) => col.includeInExport
  );

  const exportExcel = (
    rows: Row<any>[],
    fetcher?: ReturnType<typeof useFetcher>
  ) => {
    const exportableColumns = columnOptions(fetcher).filter(
      (col) => col.includeInExport
    );

    const rowData = rows.map((row) =>
      exportableColumns.reduce((acc, col) => {
        acc[col.header] = row.original[col.accessorKey];
        return acc;
      }, {} as Record<string, any>)
    );

    const csvConfig = mkConfig({
      fieldSeparator: ",",
      filename: `${title}_${moment().format("YYYY-MM-DD")}`,
      decimalSeparator: ".",
      useKeysAsHeaders: true,
    });

    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };

  return (
    <div className="flex items-center justify-between overflow-x-auto">
      {/* Left Section */}
      <div className="flex flex-1 items-center space-x-2">
        {/* Search Input */}
        {searchColumnId && (
          <Input
            placeholder={searchPlaceholder}
            value={
              (table
                .getColumn(searchColumnId as string)
                ?.getFilterValue() as string) ?? ""
            }
            onChange={handleSearchChange}
            className="h-8 w-[250px]"
          />
        )}

        {/* Dynamic Filters */}
        {filters.map((filter) => {
          const column = table.getColumn(filter.columnId);
          if (!column) return null;

          return (
            <DataTableFacetedFilter
              key={filter.columnId}
              column={column}
              title={filter.title}
              options={filter.options || []}
            />
          );
        })}

        {/* Reset Filters Button */}
        {enableReset && isFiltered && (
          <Button
            variant="ghost"
            onClick={handleResetFilters}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Activity Toolbar */}
      {activity && activity.length > 0 && (
        <div className="mx-2 flex  gap-2">
          {activity.map((item, index) => (
            <Button
              variant="outline"
              onClick={() => activity.forEach((item) => item.onClick())}
              className="h-8 px-2 lg:px-3 text-xs"
            >
              <div key={index} className="flex items-center">
                {item.icon}
                {item.label}
              </div>
            </Button>
          ))}
        </div>
      )}

      {/* Export Button */}
      {hasExportableColumns && (
        <div className="mr-2">
          <Button
            variant="outline"
            onClick={() => exportExcel(table.getFilteredRowModel().rows)}
            className="h-8 px-2 lg:px-3 text-xs"
          >
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      )}

      {/* View Options */}
      <DataTableViewOptions table={table} />
    </div>
  );
}
