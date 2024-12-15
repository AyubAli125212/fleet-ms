import SidebarLayout from "@/components/sidebar/sidebar-layout";
import { Outlet, useNavigation } from "react-router-dom";
import { ContentLayout } from "./sidebar/content-layout";
import { LoaderCircle } from "lucide-react";

const ProtectedLayout = () => {
  const navigation = useNavigation();

  return (
    <SidebarLayout>
      {navigation.state === "loading" ? (
        <ContentLayout title="">
          <div className="flex items-center justify-center gap-6 rounded-xl w-full min-h-[calc(100vh-11rem)]">
            <span className="animate-spin duration-1000">
              <LoaderCircle className="w-8 h-8" />
            </span>
          </div>
        </ContentLayout>
      ) : (
        <Outlet />
      )}
    </SidebarLayout>
  );
};

export default ProtectedLayout;
