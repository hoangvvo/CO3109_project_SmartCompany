import { Automation } from "@/apis/openapi";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export const AutomationCard: React.FC<{
  automation: Automation;
}> = ({ automation }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div className="flex flex-col space-y-1.5">
          <CardTitle>{automation.name}</CardTitle>
          <CardDescription>{automation.description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter className="flex justify-between">
        <Link
          href={`/automation/${automation.id}`}
          className={buttonVariants()}
        >
          View
        </Link>
      </CardFooter>
    </Card>
  );
};
