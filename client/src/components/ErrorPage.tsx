import { useRouteError } from "react-router-dom";
import { ContentLayout } from "./sidebar/content-layout";
import errorImage from "@/assets/error.svg";

export default function ErrorPage() {
  const error = useRouteError() as any;
  const errorMessage = error.response?.data?.message || "";

  return (
    <ContentLayout title="">
      <div className="flex flex-col justify-center items-center rounded-xl w-full min-h-[calc(100vh-13rem)]">
        <img
          src={errorImage}
          alt="connection lost"
          className="w-40 h-40 md:w-56 md:h-56 lg:w-64 lg:h-64 text-red-500"
        />
        <h1 className="text-2xl lg:text-3xl font-extrabold py-6">
          Oops! Something went wrong
        </h1>
        <p className="text-muted-foreground text-center text-sm lg:text-base max-w-lg">
          {errorMessage}
        </p>
        <p className="text-muted-foreground text-center text-sm lg:text-base max-w-lg">
          Please try again later or contact support.
        </p>
      </div>
    </ContentLayout>
  );
}
