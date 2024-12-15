import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "@/components/data-table/data-table-row-actions";

export type ColumnOptions = {
  accessorKey: string;
  header: string;
  isFilterable?: boolean;
  includeInExport?: boolean;
  renderCell?: (row: any) => JSX.Element;
  filterOptions?: { value: string; label: string }[];
  formatDate?: boolean;
  width?: string;
  align?: "left" | "center" | "right";
  padding?: string;
  enableSorting?: boolean;
  enableHiding?: boolean;
};

type Action = {
  label: string;
  icon: JSX.Element;
  onClick: (rowData: any) => void;
  danger?: boolean;
};
export function generateColumns(
  columnOptions: ColumnOptions[],
  actions?: Action[]
): ColumnDef<any>[] {
  return [
    ...columnOptions.map((option) => ({
      accessorKey: option.accessorKey,
      header: ({ column }: { column: any }) => (
        <DataTableColumnHeader column={column} title={option.header} />
      ),
      cell: ({ row }: { row: any }) =>
        option.renderCell ? (
          option.renderCell(row)
        ) : option.formatDate ? (
          <div>{new Date(row.getValue(option.accessorKey)).toDateString()}</div>
        ) : (
          <span>{row.getValue(option.accessorKey)}</span>
        ),
      filterFn: option.isFilterable
        ? (row: any, id: any, filterValue: any) => {
            const cellValue = row.getValue(id)?.toString().toLowerCase() || "";
            if (Array.isArray(filterValue)) {
              return filterValue.some(
                (value) => value.toLowerCase() === cellValue
              );
            }

            return cellValue.includes(filterValue.toLowerCase());
          }
        : undefined,
      meta: {
        isFilterable: option.isFilterable,
        filterOptions: option.filterOptions,
      },
      enableSorting: option.enableSorting ?? true,
      enableHiding: option.enableHiding ?? true,
    })),
    ...(actions
      ? [
          {
            id: "actions",
            cell: ({ row }: { row: any }) => (
              <DataTableRowActions
                row={row}
                actions={actions.map((action) => ({
                  ...action,
                  onClick: () => action.onClick(row.original),
                }))}
              />
            ),
          },
        ]
      : []),
  ];
}
