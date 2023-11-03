import { ErrorPage } from "@/components/pages/error-page";

export default function NotFoundPage() {
  return (
    <ErrorPage
      title="Not Found"
      message="The page you are looking for does not exist."
    />
  );
}
