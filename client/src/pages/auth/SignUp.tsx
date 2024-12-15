import { Button } from "@/components/ui/button";
import {
  ActionFunction,
  useActionData,
  useNavigate,
  useSubmit,
} from "react-router-dom";
import { Signup } from "@/api/AuthAPI";
import { signupSchema } from "@/constants/schema";
import { User } from "@/constants/types";
import { useFormik } from "formik";
import FormField from "@/components/FormField";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { ROUTES } from "@/constants/routes";

const initialValues = {
  name: "",
  email: "",
  password: "",
};

export const action: ActionFunction = async ({ request }) => {
  try {
    const reqData = await request.json();
    await Signup(reqData);
    return {
      success: true,
      message: "Signup successful! Redirecting you to login page...",
    };
  } catch (error: any) {
    return { error: error.message || "Signup failed" };
  }
};

export default function SignUp() {
  const navigate = useNavigate();
  const submit = useSubmit();
  const actionData = useActionData();
  const { toast } = useToast();

  const formik = useFormik({
    initialValues,
    validationSchema: signupSchema,
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
    if (actionData?.error)
      toast({
        title: "Signup failed",
        description: actionData.error,
        variant: "destructive",
      });
    if (actionData?.success) {
      toast({ title: "Signup successful", description: actionData.message });
      formik.resetForm();
      const timer = setTimeout(() => {
        navigate(ROUTES.LOGIN.ABSOLUTE);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [actionData, navigate, toast]);

  return (
    <form
      method="POST"
      onSubmit={handleSubmit}
      className="flex flex-col space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Create an account
        </h1>
        <p className="text-muted-foreground text-sm">
          Enter your details below to create your account
        </p>
      </div>

      {/* Form Fields */}
      <div className="grid gap-4">
        <FormField
          id="name"
          label="Name"
          placeholder="Enter your full name"
          value={values.name}
          error={touched.name && errors.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />

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

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full"
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting && <Loader2 className="animate-spin" />}
          {isSubmitting ? "Signing up..." : "Sign Up"}
        </Button>
      </div>

      {/* Footer */}
      <div className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <p
          className="underline cursor-pointer"
          onClick={() => navigate("/auth/login")}
        >
          Login
        </p>
      </div>
    </form>
  );
}
