import * as React from "react";
import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog } from "@/components/ui/dialog";
import { MoreHorizontal } from "lucide-react";

export interface Action<TData> {
  label: string;
  icon: React.ReactNode;
  onClick: (rowData: TData) => void;
  danger?: boolean;
}

export interface LabelOption {
  value: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  actions: Action<TData>[];
  labels?: LabelOption[];
  labelKey?: keyof TData;
}

export function DataTableRowActions<TData>({
  row,
  actions,
  labels,
  labelKey,
}: DataTableRowActionsProps<TData>) {
  const rowData = row?.original;

  if (!rowData) {
    return null;
  }

  const rowLabels = labelKey ? (rowData[labelKey] as unknown as string) : null;

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          {/* Render Actions */}
          {actions.map((action, index) => (
            <DropdownMenuItem
              key={index}
              onClick={() => action.onClick(rowData)}
              className={action.danger ? "text-red-600" : ""}
            >
              {action.icon}
              {action.label}
            </DropdownMenuItem>
          ))}

          {/* Render Labels */}
          {labels && labels.length > 0 && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuRadioGroup value={rowLabels as string}>
                    {labels.map((label) => (
                      <DropdownMenuRadioItem
                        key={label.value}
                        value={label.value}
                      >
                        {label.icon && <label.icon className="w-4 h-4 mr-2" />}
                        {label.label}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </Dialog>
  );
}
