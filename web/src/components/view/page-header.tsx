import { FC, ReactNode } from "react";

export const PageHeader: FC<{
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}> = ({ title, subtitle, actions }) => {
  return (
    <div className="flex py-8 justify-between items-center">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="flex items-center space-x-4">{actions}</div>
    </div>
  );
};
