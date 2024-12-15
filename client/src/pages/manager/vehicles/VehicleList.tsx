import Handle from "@/components/Handle";
import { ContentLayout } from "@/components/sidebar/content-layout";
import { DataTable } from "@/components/data-table/data-table";
import { activity, breadcrumbLinks, columnOptions } from "./helper-function";
import { ActionFunction, LoaderFunction, useFetcher, useLoaderData, useNavigate, useNavigation } from "react-router-dom";
import { GetVehicles, ToggleVehicleStatus } from "@/api/ManagerAPI";

export const loader: LoaderFunction = async ({}) => {
  try {
    const response = await GetVehicles({});
    return response.data;
  } catch (error: any) {
    throw new Response("Failed to load vehicles", { status: 500 });
  }
};

export const action: ActionFunction = async ({ request }) => {
  const data = await request.json();
  const vehicleId = data.id;
  await ToggleVehicleStatus(vehicleId);
  return null;
};

export default function VehicleList() {
  const { vehicles } = useLoaderData();
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const loading = navigation.state === "loading";

  return (
    <ContentLayout title="Vehicle List">
      <Handle links={breadcrumbLinks} />
      <div className="flex gap-6 mt-6 bg-white rounded-xl border-[0.5px] w-full p-6">
        <div className="flex h-full min-h-screen w-full flex-col">
          <DataTable
            title="Vehicles"
            loading={loading}
            searchBy="name"
            data={vehicles ?? {}}
            columnOptions={columnOptions(fetcher)}
            activity={activity(navigate)}
          />
        </div>
      </div>
    </ContentLayout>
  );
}
