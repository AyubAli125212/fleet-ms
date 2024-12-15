import { ContentLayout } from "@/components/sidebar/content-layout";
import { useSidebar } from "@/hooks/use-sidebar";
import { useStore } from "@/hooks/use-store";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Users, UserRoundCheck, UserRoundX } from "lucide-react";
import Overview from "@/components/manager/Overview";
import RecentActions from "@/components/manager/RecentActions";
import { LoaderFunction, useLoaderData } from "react-router-dom";
import { GetManagerDashboard } from "@/api/ManagerAPI";
import { ManagerDashboardData } from "@/constants/types";

export const loader: LoaderFunction = async () => {
  try {
    const response = await GetManagerDashboard();
    return response.data; 
  } catch (error : any) {
     throw (error);
  }
};

export default function DashboardPage() {
  const sidebar = useStore(useSidebar, (x) => x);
  if (!sidebar) return null;

  const data = useLoaderData() as ManagerDashboardData;

  return (
    <ContentLayout title="Dashboard">
      <div className="flex gap-6 w-full min-h-[calc(100vh-11rem)]">
        <div className="flex-1 space-y-4 ">
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="shadow-none">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Vehicles
                    </CardTitle>
                    <Users />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{data.counts.totalVehicles}</div>
                  </CardContent>
                </Card>
                <Card className="shadow-none">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Active Vehicles
                    </CardTitle>
                    <UserRoundCheck />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{data.counts.activeVehicles}</div>
                  </CardContent>
                </Card>
                <Card className="shadow-none">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Inactive Vehicles
                    </CardTitle>
                    <UserRoundX />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{data.counts.inactiveVehicles}</div>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 shadow-none">
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="">
                    <Overview chart={data.chart} />
                  </CardContent>
                </Card>
                <Card className="col-span-4 lg:col-span-3  shadow-none">
                  <CardHeader>
                    <CardTitle>Recently Added Vehicles</CardTitle>
                    <CardDescription>
                      Newly added vehicles that is managed by the system
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="">
                    <RecentActions actionData={data.recentlyAddedVehicles} />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ContentLayout>
  );
}
