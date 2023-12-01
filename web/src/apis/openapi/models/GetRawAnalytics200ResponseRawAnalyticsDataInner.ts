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
/**
 * 
 * @export
 * @interface GetRawAnalytics200ResponseRawAnalyticsDataInner
 */
export interface GetRawAnalytics200ResponseRawAnalyticsDataInner {
    /**
     * 
     * @type {number}
     * @memberof GetRawAnalytics200ResponseRawAnalyticsDataInner
     */
    timestamp: number;
    /**
     * 
     * @type {number}
     * @memberof GetRawAnalytics200ResponseRawAnalyticsDataInner
     */
    on_duration: number;
    /**
     * 
     * @type {number}
     * @memberof GetRawAnalytics200ResponseRawAnalyticsDataInner
     */
    on_duration_compare: number;
    /**
     * 
     * @type {number}
     * @memberof GetRawAnalytics200ResponseRawAnalyticsDataInner
     */
    watt_seconds: number;
    /**
     * 
     * @type {number}
     * @memberof GetRawAnalytics200ResponseRawAnalyticsDataInner
     */
    watt_seconds_compare: number;
    /**
     * 
     * @type {number}
     * @memberof GetRawAnalytics200ResponseRawAnalyticsDataInner
     */
    activity_count: number;
    /**
     * 
     * @type {number}
     * @memberof GetRawAnalytics200ResponseRawAnalyticsDataInner
     */
    activity_count_compare: number;
}

/**
 * Check if a given object implements the GetRawAnalytics200ResponseRawAnalyticsDataInner interface.
 */
export function instanceOfGetRawAnalytics200ResponseRawAnalyticsDataInner(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "timestamp" in value;
    isInstance = isInstance && "on_duration" in value;
    isInstance = isInstance && "on_duration_compare" in value;
    isInstance = isInstance && "watt_seconds" in value;
    isInstance = isInstance && "watt_seconds_compare" in value;
    isInstance = isInstance && "activity_count" in value;
    isInstance = isInstance && "activity_count_compare" in value;

    return isInstance;
}

export function GetRawAnalytics200ResponseRawAnalyticsDataInnerFromJSON(json: any): GetRawAnalytics200ResponseRawAnalyticsDataInner {
    return GetRawAnalytics200ResponseRawAnalyticsDataInnerFromJSONTyped(json, false);
}

export function GetRawAnalytics200ResponseRawAnalyticsDataInnerFromJSONTyped(json: any, ignoreDiscriminator: boolean): GetRawAnalytics200ResponseRawAnalyticsDataInner {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'timestamp': json['timestamp'],
        'on_duration': json['on_duration'],
        'on_duration_compare': json['on_duration_compare'],
        'watt_seconds': json['watt_seconds'],
        'watt_seconds_compare': json['watt_seconds_compare'],
        'activity_count': json['activity_count'],
        'activity_count_compare': json['activity_count_compare'],
    };
}

export function GetRawAnalytics200ResponseRawAnalyticsDataInnerToJSON(value?: GetRawAnalytics200ResponseRawAnalyticsDataInner | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'timestamp': value.timestamp,
        'on_duration': value.on_duration,
        'on_duration_compare': value.on_duration_compare,
        'watt_seconds': value.watt_seconds,
        'watt_seconds_compare': value.watt_seconds_compare,
        'activity_count': value.activity_count,
        'activity_count_compare': value.activity_count_compare,
    };
}

