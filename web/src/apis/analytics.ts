import { api } from "./api";

export const analyticsApi = {
  getAggregatedAnalytics(variables: {
    filter_device_ids?: number[];
    filter_device_categories?: string[];
    startDate: Date;
    endDate: Date;
  }) {
    return api.getAggregatedAnalytics(variables);
  },
};
