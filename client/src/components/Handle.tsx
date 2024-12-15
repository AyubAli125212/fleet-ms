import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useNavigate } from "react-router-dom";

export default function Handle({ links }: { links: { label: string; path: string }[] }) {
  const navigate = useNavigate();
  return (
    <Breadcrumb className="">
      <BreadcrumbList>
        {links.map((link, index) => (
          <BreadcrumbItem key={link.path}>
            {index !== links.length - 1 ? (
              <BreadcrumbLink asChild>
                <div onClick={() => navigate(link.path)}>{link.label}</div>
              </BreadcrumbLink>
            ) : (
              <BreadcrumbPage>{link.label}</BreadcrumbPage>
            )}
            {index < links.length - 1 && <BreadcrumbSeparator />}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
