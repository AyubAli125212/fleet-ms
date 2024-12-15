import {
  ActionFunction,
  useActionData,
  useNavigate,
  useSubmit,
} from "react-router-dom";
import { useFormik } from "formik";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import FormField from "@/components/FormField";
import { loginSchema } from "@/constants/schema";
import { ROUTES } from "@/constants/routes";
import { User } from "@/constants/types";
import { useToast } from "@/hooks/use-toast";
import { Login } from "@/api/AuthAPI";
import { setToken } from "@/utils/auth";
import { useEffect } from "react";

const initialValues = {
  email: "ayubali125212@gmail.com",
  password: "aaaaaa",
};

export const action: ActionFunction = async ({ request }) => {
  try {
    const reqData = await request.json();
    const response = await Login(reqData);
    setToken(response.token);
    return window.location.href = ROUTES.MANAGER.ABSOLUTE;
  } catch (error: any) {
    return { error: error.response.data.message || "Login failed" };
  }
};

export default function LogIn() {
  const navigate = useNavigate();
  const submit = useSubmit();
  const actionData = useActionData();
  const { toast } = useToast();

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values: User) => {
      submit(values, {
        method: "POST",
        encType: "application/json",
      });
    },
  });

  const {
    values,
    errors,
    touched,
    isValid,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = formik;

  useEffect(() => {
    if (actionData?.error) {
      formik.resetForm();
      toast({
        title: "Login failed",
        description: actionData.error,
        variant: "destructive",
      });
    }
  }, [actionData?.error]);
  
  return (
    <form
      method="POST"
      onSubmit={handleSubmit}
      className="flex flex-col space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Login to your account
        </h1>
        <p className="text-muted-foreground text-sm">
          Enter your email and password below to login
        </p>
      </div>

      {/* Form Fields */}
      <div className="grid gap-4">
        <FormField
          id="email"
          label="Email"
          placeholder="Enter your email address"
          type="email"
          value={values.email}
          error={touched.email && errors.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <FormField
          id="password"
          label="Password"
          placeholder="Enter your password"
          type="password"
          value={values.password}
          error={touched.password && errors.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <div className="text-right">
          <p
            className="text-sm underline cursor-pointer"
            onClick={() => {}}
          >
            Forgot your password?
          </p>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full"
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting && <Loader2 className="animate-spin" />}
          {isSubmitting ? "Logging in..." : "Login"}
        </Button>
      </div>

      {/* Footer */}
      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?{" "}
        <p
          className="underline cursor-pointer"
          onClick={() => navigate(ROUTES.SIGNUP.ABSOLUTE)}
        >
          Sign up
        </p>
      </div>
    </form>
  );
}
