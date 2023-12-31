/* tslint:disable */
/* eslint-disable */
/**
 * @fastify/swagger
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 8.12.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  CreateAutomation200Response,
  CreateAutomationRequest,
  CreateDevice200Response,
  CreateDeviceRequest,
  GetAggregatedAnalytics200Response,
  GetAutomations200Response,
  GetCurrentUser200Response,
  GetDeviceActivities200Response,
  GetDevices200Response,
  GetRawAnalytics200Response,
  ReplaceAutomationAction200Response,
  ReplaceAutomationActionRequest,
  ReplaceAutomationConditions200Response,
  ReplaceAutomationConditionsRequest,
  SetDeviceStateRequest,
  UpdateAutomationRequest,
  UpdateDeviceRequest,
  UserLoginRequest,
  UserSignUpRequest,
} from '../models/index';
import {
    CreateAutomation200ResponseFromJSON,
    CreateAutomation200ResponseToJSON,
    CreateAutomationRequestFromJSON,
    CreateAutomationRequestToJSON,
    CreateDevice200ResponseFromJSON,
    CreateDevice200ResponseToJSON,
    CreateDeviceRequestFromJSON,
    CreateDeviceRequestToJSON,
    GetAggregatedAnalytics200ResponseFromJSON,
    GetAggregatedAnalytics200ResponseToJSON,
    GetAutomations200ResponseFromJSON,
    GetAutomations200ResponseToJSON,
    GetCurrentUser200ResponseFromJSON,
    GetCurrentUser200ResponseToJSON,
    GetDeviceActivities200ResponseFromJSON,
    GetDeviceActivities200ResponseToJSON,
    GetDevices200ResponseFromJSON,
    GetDevices200ResponseToJSON,
    GetRawAnalytics200ResponseFromJSON,
    GetRawAnalytics200ResponseToJSON,
    ReplaceAutomationAction200ResponseFromJSON,
    ReplaceAutomationAction200ResponseToJSON,
    ReplaceAutomationActionRequestFromJSON,
    ReplaceAutomationActionRequestToJSON,
    ReplaceAutomationConditions200ResponseFromJSON,
    ReplaceAutomationConditions200ResponseToJSON,
    ReplaceAutomationConditionsRequestFromJSON,
    ReplaceAutomationConditionsRequestToJSON,
    SetDeviceStateRequestFromJSON,
    SetDeviceStateRequestToJSON,
    UpdateAutomationRequestFromJSON,
    UpdateAutomationRequestToJSON,
    UpdateDeviceRequestFromJSON,
    UpdateDeviceRequestToJSON,
    UserLoginRequestFromJSON,
    UserLoginRequestToJSON,
    UserSignUpRequestFromJSON,
    UserSignUpRequestToJSON,
} from '../models/index';

export interface CreateAutomationOperationRequest {
    createAutomationRequest: CreateAutomationRequest;
}

export interface CreateDeviceOperationRequest {
    createDeviceRequest: CreateDeviceRequest;
}

export interface DeleteAutomationRequest {
    automationId: number;
}

export interface DeleteDeviceRequest {
    deviceId: number;
}

export interface GetAggregatedAnalyticsRequest {
    startDate: Date;
    endDate: Date;
    filterDeviceIds?: Array<number>;
}

export interface GetAllDeviceActivitiesRequest {
    filterDeviceIds?: Array<number>;
    startDate?: Date;
    endDate?: Date;
}

export interface GetAutomationRequest {
    automationId: number;
}

export interface GetDeviceRequest {
    deviceId: number;
}

export interface GetDeviceActivitiesRequest {
    deviceId: number;
}

export interface GetRawAnalyticsRequest {
    startDate: Date;
    endDate: Date;
    filterDeviceIds?: Array<number>;
    filterDeviceCategories?: Array<string>;
}

export interface ReplaceAutomationActionOperationRequest {
    automationId: number;
    replaceAutomationActionRequest: ReplaceAutomationActionRequest;
}

export interface ReplaceAutomationConditionsOperationRequest {
    automationId: number;
    replaceAutomationConditionsRequest: ReplaceAutomationConditionsRequest;
}

export interface SetDeviceStateOperationRequest {
    deviceId: number;
    setDeviceStateRequest: SetDeviceStateRequest;
}

export interface UpdateAutomationOperationRequest {
    automationId: number;
    updateAutomationRequest: UpdateAutomationRequest;
}

export interface UpdateDeviceOperationRequest {
    deviceId: number;
    updateDeviceRequest: UpdateDeviceRequest;
}

export interface UserLoginOperationRequest {
    userLoginRequest: UserLoginRequest;
}

export interface UserSignUpOperationRequest {
    userSignUpRequest: UserSignUpRequest;
}

/**
 * 
 */
export class DefaultApi extends runtime.BaseAPI {

    /**
     */
    async createAutomationRaw(requestParameters: CreateAutomationOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<CreateAutomation200Response>> {
        if (requestParameters.createAutomationRequest === null || requestParameters.createAutomationRequest === undefined) {
            throw new runtime.RequiredError('createAutomationRequest','Required parameter requestParameters.createAutomationRequest was null or undefined when calling createAutomation.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/automations/`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CreateAutomationRequestToJSON(requestParameters.createAutomationRequest),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => CreateAutomation200ResponseFromJSON(jsonValue));
    }

    /**
     */
    async createAutomation(requestParameters: CreateAutomationOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CreateAutomation200Response> {
        const response = await this.createAutomationRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async createDeviceRaw(requestParameters: CreateDeviceOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<CreateDevice200Response>> {
        if (requestParameters.createDeviceRequest === null || requestParameters.createDeviceRequest === undefined) {
            throw new runtime.RequiredError('createDeviceRequest','Required parameter requestParameters.createDeviceRequest was null or undefined when calling createDevice.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/devices/`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CreateDeviceRequestToJSON(requestParameters.createDeviceRequest),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => CreateDevice200ResponseFromJSON(jsonValue));
    }

    /**
     */
    async createDevice(requestParameters: CreateDeviceOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CreateDevice200Response> {
        const response = await this.createDeviceRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async deleteAutomationRaw(requestParameters: DeleteAutomationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.automationId === null || requestParameters.automationId === undefined) {
            throw new runtime.RequiredError('automationId','Required parameter requestParameters.automationId was null or undefined when calling deleteAutomation.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/automations/{automationId}`.replace(`{${"automationId"}}`, encodeURIComponent(String(requestParameters.automationId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async deleteAutomation(requestParameters: DeleteAutomationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.deleteAutomationRaw(requestParameters, initOverrides);
    }

    /**
     */
    async deleteDeviceRaw(requestParameters: DeleteDeviceRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.deviceId === null || requestParameters.deviceId === undefined) {
            throw new runtime.RequiredError('deviceId','Required parameter requestParameters.deviceId was null or undefined when calling deleteDevice.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/devices/{deviceId}`.replace(`{${"deviceId"}}`, encodeURIComponent(String(requestParameters.deviceId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async deleteDevice(requestParameters: DeleteDeviceRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.deleteDeviceRaw(requestParameters, initOverrides);
    }

    /**
     */
    async getAggregatedAnalyticsRaw(requestParameters: GetAggregatedAnalyticsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GetAggregatedAnalytics200Response>> {
        if (requestParameters.startDate === null || requestParameters.startDate === undefined) {
            throw new runtime.RequiredError('startDate','Required parameter requestParameters.startDate was null or undefined when calling getAggregatedAnalytics.');
        }

        if (requestParameters.endDate === null || requestParameters.endDate === undefined) {
            throw new runtime.RequiredError('endDate','Required parameter requestParameters.endDate was null or undefined when calling getAggregatedAnalytics.');
        }

        const queryParameters: any = {};

        if (requestParameters.filterDeviceIds) {
            queryParameters['filter_device_ids'] = requestParameters.filterDeviceIds;
        }

        if (requestParameters.startDate !== undefined) {
            queryParameters['start_date'] = (requestParameters.startDate as any).toISOString();
        }

        if (requestParameters.endDate !== undefined) {
            queryParameters['end_date'] = (requestParameters.endDate as any).toISOString();
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/analytics/aggregate`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GetAggregatedAnalytics200ResponseFromJSON(jsonValue));
    }

    /**
     */
    async getAggregatedAnalytics(requestParameters: GetAggregatedAnalyticsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetAggregatedAnalytics200Response> {
        const response = await this.getAggregatedAnalyticsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async getAllDeviceActivitiesRaw(requestParameters: GetAllDeviceActivitiesRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GetDeviceActivities200Response>> {
        const queryParameters: any = {};

        if (requestParameters.filterDeviceIds) {
            queryParameters['filter_device_ids'] = requestParameters.filterDeviceIds;
        }

        if (requestParameters.startDate !== undefined) {
            queryParameters['start_date'] = (requestParameters.startDate as any).toISOString();
        }

        if (requestParameters.endDate !== undefined) {
            queryParameters['end_date'] = (requestParameters.endDate as any).toISOString();
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/device-activities/`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GetDeviceActivities200ResponseFromJSON(jsonValue));
    }

    /**
     */
    async getAllDeviceActivities(requestParameters: GetAllDeviceActivitiesRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetDeviceActivities200Response> {
        const response = await this.getAllDeviceActivitiesRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async getAutomationRaw(requestParameters: GetAutomationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<CreateAutomation200Response>> {
        if (requestParameters.automationId === null || requestParameters.automationId === undefined) {
            throw new runtime.RequiredError('automationId','Required parameter requestParameters.automationId was null or undefined when calling getAutomation.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/automations/{automationId}`.replace(`{${"automationId"}}`, encodeURIComponent(String(requestParameters.automationId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => CreateAutomation200ResponseFromJSON(jsonValue));
    }

    /**
     */
    async getAutomation(requestParameters: GetAutomationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CreateAutomation200Response> {
        const response = await this.getAutomationRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async getAutomationsRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GetAutomations200Response>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/automations/`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GetAutomations200ResponseFromJSON(jsonValue));
    }

    /**
     */
    async getAutomations(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetAutomations200Response> {
        const response = await this.getAutomationsRaw(initOverrides);
        return await response.value();
    }

    /**
     */
    async getCurrentUserRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GetCurrentUser200Response>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/user/`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GetCurrentUser200ResponseFromJSON(jsonValue));
    }

    /**
     */
    async getCurrentUser(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetCurrentUser200Response> {
        const response = await this.getCurrentUserRaw(initOverrides);
        return await response.value();
    }

    /**
     */
    async getDeviceRaw(requestParameters: GetDeviceRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<CreateDevice200Response>> {
        if (requestParameters.deviceId === null || requestParameters.deviceId === undefined) {
            throw new runtime.RequiredError('deviceId','Required parameter requestParameters.deviceId was null or undefined when calling getDevice.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/devices/{deviceId}`.replace(`{${"deviceId"}}`, encodeURIComponent(String(requestParameters.deviceId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => CreateDevice200ResponseFromJSON(jsonValue));
    }

    /**
     */
    async getDevice(requestParameters: GetDeviceRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CreateDevice200Response> {
        const response = await this.getDeviceRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async getDeviceActivitiesRaw(requestParameters: GetDeviceActivitiesRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GetDeviceActivities200Response>> {
        if (requestParameters.deviceId === null || requestParameters.deviceId === undefined) {
            throw new runtime.RequiredError('deviceId','Required parameter requestParameters.deviceId was null or undefined when calling getDeviceActivities.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/devices/{deviceId}/activities`.replace(`{${"deviceId"}}`, encodeURIComponent(String(requestParameters.deviceId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GetDeviceActivities200ResponseFromJSON(jsonValue));
    }

    /**
     */
    async getDeviceActivities(requestParameters: GetDeviceActivitiesRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetDeviceActivities200Response> {
        const response = await this.getDeviceActivitiesRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async getDevicesRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GetDevices200Response>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/devices/`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GetDevices200ResponseFromJSON(jsonValue));
    }

    /**
     */
    async getDevices(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetDevices200Response> {
        const response = await this.getDevicesRaw(initOverrides);
        return await response.value();
    }

    /**
     */
    async getRawAnalyticsRaw(requestParameters: GetRawAnalyticsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GetRawAnalytics200Response>> {
        if (requestParameters.startDate === null || requestParameters.startDate === undefined) {
            throw new runtime.RequiredError('startDate','Required parameter requestParameters.startDate was null or undefined when calling getRawAnalytics.');
        }

        if (requestParameters.endDate === null || requestParameters.endDate === undefined) {
            throw new runtime.RequiredError('endDate','Required parameter requestParameters.endDate was null or undefined when calling getRawAnalytics.');
        }

        const queryParameters: any = {};

        if (requestParameters.filterDeviceIds) {
            queryParameters['filter_device_ids'] = requestParameters.filterDeviceIds;
        }

        if (requestParameters.filterDeviceCategories) {
            queryParameters['filter_device_categories'] = requestParameters.filterDeviceCategories;
        }

        if (requestParameters.startDate !== undefined) {
            queryParameters['start_date'] = (requestParameters.startDate as any).toISOString();
        }

        if (requestParameters.endDate !== undefined) {
            queryParameters['end_date'] = (requestParameters.endDate as any).toISOString();
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/analytics/raw`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GetRawAnalytics200ResponseFromJSON(jsonValue));
    }

    /**
     */
    async getRawAnalytics(requestParameters: GetRawAnalyticsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetRawAnalytics200Response> {
        const response = await this.getRawAnalyticsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async replaceAutomationActionRaw(requestParameters: ReplaceAutomationActionOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ReplaceAutomationAction200Response>> {
        if (requestParameters.automationId === null || requestParameters.automationId === undefined) {
            throw new runtime.RequiredError('automationId','Required parameter requestParameters.automationId was null or undefined when calling replaceAutomationAction.');
        }

        if (requestParameters.replaceAutomationActionRequest === null || requestParameters.replaceAutomationActionRequest === undefined) {
            throw new runtime.RequiredError('replaceAutomationActionRequest','Required parameter requestParameters.replaceAutomationActionRequest was null or undefined when calling replaceAutomationAction.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/automations/{automationId}/actions`.replace(`{${"automationId"}}`, encodeURIComponent(String(requestParameters.automationId))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: ReplaceAutomationActionRequestToJSON(requestParameters.replaceAutomationActionRequest),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ReplaceAutomationAction200ResponseFromJSON(jsonValue));
    }

    /**
     */
    async replaceAutomationAction(requestParameters: ReplaceAutomationActionOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ReplaceAutomationAction200Response> {
        const response = await this.replaceAutomationActionRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async replaceAutomationConditionsRaw(requestParameters: ReplaceAutomationConditionsOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ReplaceAutomationConditions200Response>> {
        if (requestParameters.automationId === null || requestParameters.automationId === undefined) {
            throw new runtime.RequiredError('automationId','Required parameter requestParameters.automationId was null or undefined when calling replaceAutomationConditions.');
        }

        if (requestParameters.replaceAutomationConditionsRequest === null || requestParameters.replaceAutomationConditionsRequest === undefined) {
            throw new runtime.RequiredError('replaceAutomationConditionsRequest','Required parameter requestParameters.replaceAutomationConditionsRequest was null or undefined when calling replaceAutomationConditions.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/automations/{automationId}/conditions`.replace(`{${"automationId"}}`, encodeURIComponent(String(requestParameters.automationId))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: ReplaceAutomationConditionsRequestToJSON(requestParameters.replaceAutomationConditionsRequest),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ReplaceAutomationConditions200ResponseFromJSON(jsonValue));
    }

    /**
     */
    async replaceAutomationConditions(requestParameters: ReplaceAutomationConditionsOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ReplaceAutomationConditions200Response> {
        const response = await this.replaceAutomationConditionsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async setDeviceStateRaw(requestParameters: SetDeviceStateOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.deviceId === null || requestParameters.deviceId === undefined) {
            throw new runtime.RequiredError('deviceId','Required parameter requestParameters.deviceId was null or undefined when calling setDeviceState.');
        }

        if (requestParameters.setDeviceStateRequest === null || requestParameters.setDeviceStateRequest === undefined) {
            throw new runtime.RequiredError('setDeviceStateRequest','Required parameter requestParameters.setDeviceStateRequest was null or undefined when calling setDeviceState.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/devices/{deviceId}/state`.replace(`{${"deviceId"}}`, encodeURIComponent(String(requestParameters.deviceId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: SetDeviceStateRequestToJSON(requestParameters.setDeviceStateRequest),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async setDeviceState(requestParameters: SetDeviceStateOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.setDeviceStateRaw(requestParameters, initOverrides);
    }

    /**
     */
    async updateAutomationRaw(requestParameters: UpdateAutomationOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<CreateAutomation200Response>> {
        if (requestParameters.automationId === null || requestParameters.automationId === undefined) {
            throw new runtime.RequiredError('automationId','Required parameter requestParameters.automationId was null or undefined when calling updateAutomation.');
        }

        if (requestParameters.updateAutomationRequest === null || requestParameters.updateAutomationRequest === undefined) {
            throw new runtime.RequiredError('updateAutomationRequest','Required parameter requestParameters.updateAutomationRequest was null or undefined when calling updateAutomation.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/automations/{automationId}`.replace(`{${"automationId"}}`, encodeURIComponent(String(requestParameters.automationId))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: UpdateAutomationRequestToJSON(requestParameters.updateAutomationRequest),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => CreateAutomation200ResponseFromJSON(jsonValue));
    }

    /**
     */
    async updateAutomation(requestParameters: UpdateAutomationOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CreateAutomation200Response> {
        const response = await this.updateAutomationRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async updateDeviceRaw(requestParameters: UpdateDeviceOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<CreateDevice200Response>> {
        if (requestParameters.deviceId === null || requestParameters.deviceId === undefined) {
            throw new runtime.RequiredError('deviceId','Required parameter requestParameters.deviceId was null or undefined when calling updateDevice.');
        }

        if (requestParameters.updateDeviceRequest === null || requestParameters.updateDeviceRequest === undefined) {
            throw new runtime.RequiredError('updateDeviceRequest','Required parameter requestParameters.updateDeviceRequest was null or undefined when calling updateDevice.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/devices/{deviceId}`.replace(`{${"deviceId"}}`, encodeURIComponent(String(requestParameters.deviceId))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: UpdateDeviceRequestToJSON(requestParameters.updateDeviceRequest),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => CreateDevice200ResponseFromJSON(jsonValue));
    }

    /**
     */
    async updateDevice(requestParameters: UpdateDeviceOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CreateDevice200Response> {
        const response = await this.updateDeviceRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async userLoginRaw(requestParameters: UserLoginOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GetCurrentUser200Response>> {
        if (requestParameters.userLoginRequest === null || requestParameters.userLoginRequest === undefined) {
            throw new runtime.RequiredError('userLoginRequest','Required parameter requestParameters.userLoginRequest was null or undefined when calling userLogin.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/user/login`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: UserLoginRequestToJSON(requestParameters.userLoginRequest),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GetCurrentUser200ResponseFromJSON(jsonValue));
    }

    /**
     */
    async userLogin(requestParameters: UserLoginOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetCurrentUser200Response> {
        const response = await this.userLoginRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async userLogoutRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/user/logout`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async userLogout(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.userLogoutRaw(initOverrides);
    }

    /**
     */
    async userSignUpRaw(requestParameters: UserSignUpOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GetCurrentUser200Response>> {
        if (requestParameters.userSignUpRequest === null || requestParameters.userSignUpRequest === undefined) {
            throw new runtime.RequiredError('userSignUpRequest','Required parameter requestParameters.userSignUpRequest was null or undefined when calling userSignUp.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/user/signup`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: UserSignUpRequestToJSON(requestParameters.userSignUpRequest),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GetCurrentUser200ResponseFromJSON(jsonValue));
    }

    /**
     */
    async userSignUp(requestParameters: UserSignUpOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetCurrentUser200Response> {
        const response = await this.userSignUpRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
