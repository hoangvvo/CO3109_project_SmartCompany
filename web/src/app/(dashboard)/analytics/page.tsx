"use client";

import { api } from "@/apis/api";
import { PageHeader } from "@/components/view/page-header";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function AnalyticsPage() {
  const [startDate, setStartDate] = useState(new Date("2023-11-12"));
  const [endDate, setEndDate] = useState(new Date("2023-12-01"));

  useQuery({
    queryKey: [
      "analytics",
      "aggregate",
      { startDate: startDate.toJSON(), endDate: endDate.toJSON() },
    ],
    queryFn: () => api.getAggregatedAnalytics({ startDate, endDate }),
  });

  return (
    <div className="container">
      <PageHeader
        title="Analytics"
        subtitle="Get insights about your company and optimize your resources"
      />
    </div>
  );
}
