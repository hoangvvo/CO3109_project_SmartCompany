"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { FC, useEffect, useState } from "react";
import AnimatedNumber from "./animated-numbers";

export const StatCard: FC<{
  title: string;
  Icon: LucideIcon;
  children: number;
  previous?: number;
  suffix?: string;
}> = ({ title, Icon, children, previous, suffix }) => {
  const [isRendered, setIsRendered] = useState(false);
  useEffect(() => {
    setIsRendered(true);
  }, []);

  const percentage =
    typeof previous === "number" && previous !== 0
      ? ((children - previous) / previous) * 100
      : undefined;

  return (
    <Card className="hover:border-primary transition overflow-hidden h-[fit-content] min-h-[130px]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="w-6 h-6" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold flex items-center gap-1">
          <AnimatedNumber
            transitions={(index) => ({
              type: "spring",
              duration: index + 0.3,
            })}
            animateToNumber={children}
          />
          {suffix}
        </div>
        <p
          className={cn(
            "text-xs text-muted-foreground opacity-0 transition-opacity duration-300",
            typeof percentage === "number" && isRendered && "opacity-100",
          )}
        >
          {typeof percentage === "number"
            ? `${percentage >= 0 ? "+" : "-"}${percentage.toFixed(
                1,
              )}% from last period`
            : ""}
        </p>
      </CardContent>
    </Card>
  );
};
