import { type Column } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDownIcon, ArrowUpIcon, ChevronsUpDown, EyeOff } from "lucide-react";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
  hideColumn?: (columnId: string) => void;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
  hideColumn,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const canSort = column.getCanSort();
  const isSorted = column.getIsSorted();
  const columnId = column.id;

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      {canSort ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              aria-label={
                isSorted === "desc"
                  ? `Sorted descending. Click to sort ascending.`
                  : isSorted === "asc"
                  ? `Sorted ascending. Click to sort descending.`
                  : `Not sorted. Click to sort ascending.`
              }
              variant="ghost"
              size="sm"
              className="-ml-3 h-8 data-[state=open]:bg-accent"
            >
              <span>{title}</span>
              {isSorted === "desc" ? (
                <ArrowDownIcon className="ml-2 h-4 w-4" aria-hidden="true" />
              ) : isSorted === "asc" ? (
                <ArrowUpIcon className="ml-2 h-4 w-4" aria-hidden="true" />
              ) : (
                <ChevronsUpDown className="ml-2 h-4 w-4" aria-hidden="true" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem
              aria-label="Sort ascending"
              onClick={() => column.toggleSorting(false)}
            >
              <ArrowUpIcon
                className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"
                aria-hidden="true"
              />
              Asc
            </DropdownMenuItem>
            <DropdownMenuItem
              aria-label="Sort descending"
              onClick={() => column.toggleSorting(true)}
            >
              <ArrowDownIcon
                className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"
                aria-hidden="true"
              />
              Desc
            </DropdownMenuItem>
            {/* <DropdownMenuSeparator /> */}
            {hideColumn && (
              <DropdownMenuItem
                aria-label="Hide column"
                onClick={() => hideColumn(columnId)}
              >
                <EyeOff
                  className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"
                  aria-hidden="true"
                />
                Hide
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className={cn(className)}>{title}</div>
      )}
    </div>
  );
}
