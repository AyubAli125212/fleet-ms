import { useEffect } from "react";
import { ActionFunction, useActionData, useNavigate, useSubmit } from "react-router-dom";
import { useFormik } from "formik";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import FormField from "@/components/FormField";
import { ContentLayout } from "@/components/sidebar/content-layout";
import Handle from "@/components/Handle";
import { breadcrumbLinks } from "./helper-function";
import { useToast } from "@/hooks/use-toast";
import { vehicleCreateSchema } from "@/constants/schema";
import { CreateVehicle } from "@/api/ManagerAPI";
import { ROUTES } from "@/constants/routes";
import { SelectField } from "@/components/SelectField";

export const action: ActionFunction = async ({ request }) => {
  const data = await request.json();
  try {
    await CreateVehicle(data);
    return { success: true, message: "Vehicle added successfully." };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "An error occurred.",
    };
  }
};

export default function VehicleCreate() {
  const actionData = useActionData();
  const navigate = useNavigate();
  const submit = useSubmit();
  const { toast } = useToast();

  const initialValues = {
    name: "",
    brand: "",
    model: "",  
    year: 2022,
    licensePlate: "",
    status: "active",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: vehicleCreateSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values) => {
      submit(values, {
        method: "POST",
        encType: "application/json",
      });
    },
  });

  useEffect(() => {
    if (actionData?.error)
      toast({
        title: "Adding vehicle failed",
        description: actionData.error,
        variant: "destructive",
      });
    if (actionData?.success) {
      toast({ title: "Vehicle added successfully", description: actionData.message });
      formik.resetForm();
      const timer = setTimeout(() => {
        navigate(ROUTES.MANAGER_VEHICLES.ABSOLUTE);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [actionData, navigate, toast]);

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting } = formik;

  return (
    <ContentLayout title="Add Vehicle">
      <Handle links={breadcrumbLinks} />
      <div className="flex flex-col md:flex-row gap-6 mt-6 min-h-[calc(100vh-14rem)]">
        {/* Main Section */}
        <div className=" flex flex-col justify-between w-full bg-white rounded-xl border-[0.5px] p-10">
          <div className="flex flex-col gap-4">
            <h1 className="text-xl font-bold text-center">Add a New Vehicle</h1>
            <form
              method="post"
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 my-6"
            >
              <FormField
                id="name"
                label="Name"
                placeholder="Enter name"
                type="text"
                value={values.name}
                error={touched.name && errors.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              
              <FormField
                id="brand"
                label="Brand"
                placeholder="Enter brand"
                type="text"
                value={values.brand}
                error={touched.brand && errors.brand}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              
              <FormField
                id="model"
                label="Model"
                placeholder="Enter model"
                type="text"
                value={values.model}
                error={touched.model && errors.model}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              
              <FormField
                id="year"
                label="Year"
                placeholder="Enter year"
                type="text"
                value={values.year}
                error={touched.year && errors.year}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <FormField
                id="licensePlate"
                label="License Plate"
                placeholder="Enter license plate"
                type="text"
                value={values.licensePlate}
                error={touched.licensePlate && errors.licensePlate}
                onChange={handleChange}
                onBlur={handleBlur}
                />

              <SelectField
                id="status"
                label="Status"
                placeholder="Select Status"
                value={values.status}
                error={touched.status && errors.status}
                onChange={(value: string) => formik.setFieldValue("status", value)}
                options={[
                  { value: "active", label: "Active" },
                  { value: "inactive", label: "Inactive" },
                ]}
               />

              <Button
                type="submit"
                className="w-32 mt-2 text-xs"
                disabled={isSubmitting || !formik.isValid}
              >
                {isSubmitting && <Loader2 className="animate-spin mr-2" />}
                {isSubmitting ? "Adding..." : "Add Vehicle"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
}
