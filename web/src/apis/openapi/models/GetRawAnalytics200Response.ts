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

import { exists, mapValues } from '../runtime';
import type { GetRawAnalytics200ResponseRawAnalytics } from './GetRawAnalytics200ResponseRawAnalytics';
import {
    GetRawAnalytics200ResponseRawAnalyticsFromJSON,
    GetRawAnalytics200ResponseRawAnalyticsFromJSONTyped,
    GetRawAnalytics200ResponseRawAnalyticsToJSON,
} from './GetRawAnalytics200ResponseRawAnalytics';

/**
 * 
 * @export
 * @interface GetRawAnalytics200Response
 */
export interface GetRawAnalytics200Response {
    /**
     * 
     * @type {GetRawAnalytics200ResponseRawAnalytics}
     * @memberof GetRawAnalytics200Response
     */
    raw_analytics: GetRawAnalytics200ResponseRawAnalytics;
}

/**
 * Check if a given object implements the GetRawAnalytics200Response interface.
 */
export function instanceOfGetRawAnalytics200Response(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "raw_analytics" in value;

    return isInstance;
}

export function GetRawAnalytics200ResponseFromJSON(json: any): GetRawAnalytics200Response {
    return GetRawAnalytics200ResponseFromJSONTyped(json, false);
}

export function GetRawAnalytics200ResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): GetRawAnalytics200Response {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'raw_analytics': GetRawAnalytics200ResponseRawAnalyticsFromJSON(json['raw_analytics']),
    };
}

export function GetRawAnalytics200ResponseToJSON(value?: GetRawAnalytics200Response | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'raw_analytics': GetRawAnalytics200ResponseRawAnalyticsToJSON(value.raw_analytics),
    };
}
