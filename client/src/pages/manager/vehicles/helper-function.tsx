import moment from "moment";
import { useFetcher, useNavigate } from "react-router-dom";
import { Loader2, Plus } from "lucide-react";
import { ColumnOptions } from "@/components/data-table/columns";
import { ROUTES } from "@/constants/routes";
import { Switch } from "@/components/ui/switch"

// Breadcrumb navigation links
export const breadcrumbLinks = [
  { label: "Home", path: ROUTES.MANAGER.ABSOLUTE },
  { label: "Vehicles", path: ROUTES.MANAGER_VEHICLES.ABSOLUTE },
];

// Activity toolbar 
export const activity = (navigate: ReturnType<typeof useNavigate>) => [
  {
    label: "Add Vehicle",
    icon: <Plus className="mr-2 h-4 w-4" />,
    onClick: () => navigate(ROUTES.MANAGER_VEHICLES_CREATE.ABSOLUTE),
  },
];

// Column options configuration
export const columnOptions = (
  fetcher?: ReturnType<typeof useFetcher>
): ColumnOptions[] => [
  {
    accessorKey: "name",
    header: "Name",
    isFilterable: true,
    includeInExport: true,
    width: "20%",
    align: "left",
    padding: "10px",
    enableHiding: false,
    renderCell: (row: any) => <span>{row.original.name}</span>,
  },
  {
    accessorKey: "brand",
    header: "Brand",
    isFilterable: true,
    includeInExport: true,
    width: "15%",
    align: "left",
    renderCell: (row: any) => (
      <span className="capitalize">{row.original.brand}</span>
    ),
  },
  {
    accessorKey: "model",
    header: "Model",
    isFilterable: true,
    includeInExport: true,
    width: "15%",
    align: "left",
    renderCell: (row: any) => <span>{row.original.model}</span>,
  },
  {
    accessorKey: "licensePlate",
    header: "License Plate",
    isFilterable: true,
    includeInExport: true,
    width: "20%",
    align: "left",
    renderCell: (row: any) => <span>{row.original.licensePlate}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    isFilterable: true,
    width: "15%",
    align: "left",
    filterOptions: [
      { value: "active", label: "Active" },
      { value: "inactive", label: "Inactive" },
    ],
    renderCell: (row: any) => {
      const handleToggle = async () => {
        fetcher?.submit(
          { id: row.original._id },
          { method: "POST", encType: "application/json" }
        );
      };

      return (
        <div className="flex items-center space-x-2">
          {/* @ts-ignore */}
          {row.original._id !== fetcher?.json?.id ? (
            <Switch
              checked={row.original.status === "active"}
              onCheckedChange={handleToggle}
            />
          ) : (
            <Loader2 className="animate-spin ml-2 h-5 w-5" />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "createdDate",
    header: "Created Date",
    formatDate: true,
    width: "17%",
    align: "left",
    renderCell: (row: any) => (
      <span>{moment(row.original.createdDate).format("DD-MM-YYYY")}</span>
    ),
  },
];
