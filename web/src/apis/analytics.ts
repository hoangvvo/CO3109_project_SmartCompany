import { api } from "./api";
import {
  GetAggregatedAnalyticsRequest,
  GetRawAnalyticsRequest,
} from "./openapi";

export const analyticsApi = {
  getAggregatedAnalytics(variables: GetAggregatedAnalyticsRequest) {
    return api.getAggregatedAnalytics(variables);
  },

  getRawAnalytics(variables: GetRawAnalyticsRequest) {
    return api.getRawAnalytics(variables);
  },
};
