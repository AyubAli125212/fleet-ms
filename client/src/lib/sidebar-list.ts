import { ROUTES } from "@/constants/routes";
import {
  Car,
  LayoutGrid,
  LucideIcon,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

/**
 * Get sidebar menu list
 * @param pathname - Current route pathname
 * @returns {Group[]} - Sidebar menu structure
 */
export function getMenuList(pathname: string): Group[] {
  const sidebarMenus: Group[] = [
    {
      groupLabel: "",
      menus: [
        {
          href: ROUTES.MANAGER.ABSOLUTE,
          label: "Dashboard",
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Contents",
      menus: [
        {
          href: ROUTES.MANAGER_VEHICLES.ABSOLUTE,
          label: "Vehicles",
          icon: Car,
          active: pathname === ROUTES.MANAGER_VEHICLES.ABSOLUTE,
        },
      ],
    },
  ];

  return sidebarMenus;
}
