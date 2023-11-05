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
import type { GetDeviceActivities200ResponseDeviceActivitiesInnerDevice } from './GetDeviceActivities200ResponseDeviceActivitiesInnerDevice';
import {
    GetDeviceActivities200ResponseDeviceActivitiesInnerDeviceFromJSON,
    GetDeviceActivities200ResponseDeviceActivitiesInnerDeviceFromJSONTyped,
    GetDeviceActivities200ResponseDeviceActivitiesInnerDeviceToJSON,
} from './GetDeviceActivities200ResponseDeviceActivitiesInnerDevice';

/**
 * 
 * @export
 * @interface GetDeviceActivities200ResponseDeviceActivitiesInner
 */
export interface GetDeviceActivities200ResponseDeviceActivitiesInner {
    /**
     * 
     * @type {number}
     * @memberof GetDeviceActivities200ResponseDeviceActivitiesInner
     */
    id: number;
    /**
     * 
     * @type {number}
     * @memberof GetDeviceActivities200ResponseDeviceActivitiesInner
     */
    device_id: number;
    /**
     * 
     * @type {string}
     * @memberof GetDeviceActivities200ResponseDeviceActivitiesInner
     */
    current_state: GetDeviceActivities200ResponseDeviceActivitiesInnerCurrentStateEnum;
    /**
     * 
     * @type {number}
     * @memberof GetDeviceActivities200ResponseDeviceActivitiesInner
     */
    current_value: number | null;
    /**
     * 
     * @type {any}
     * @memberof GetDeviceActivities200ResponseDeviceActivitiesInner
     */
    current_extra_data: any | null;
    /**
     * 
     * @type {number}
     * @memberof GetDeviceActivities200ResponseDeviceActivitiesInner
     */
    duration_seconds: number | null;
    /**
     * 
     * @type {Date}
     * @memberof GetDeviceActivities200ResponseDeviceActivitiesInner
     */
    created_at: Date;
    /**
     * 
     * @type {GetDeviceActivities200ResponseDeviceActivitiesInnerDevice}
     * @memberof GetDeviceActivities200ResponseDeviceActivitiesInner
     */
    device: GetDeviceActivities200ResponseDeviceActivitiesInnerDevice;
}


/**
 * @export
 */
export const GetDeviceActivities200ResponseDeviceActivitiesInnerCurrentStateEnum = {
    On: 'on',
    Off: 'off'
} as const;
export type GetDeviceActivities200ResponseDeviceActivitiesInnerCurrentStateEnum = typeof GetDeviceActivities200ResponseDeviceActivitiesInnerCurrentStateEnum[keyof typeof GetDeviceActivities200ResponseDeviceActivitiesInnerCurrentStateEnum];


/**
 * Check if a given object implements the GetDeviceActivities200ResponseDeviceActivitiesInner interface.
 */
export function instanceOfGetDeviceActivities200ResponseDeviceActivitiesInner(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "device_id" in value;
    isInstance = isInstance && "current_state" in value;
    isInstance = isInstance && "current_value" in value;
    isInstance = isInstance && "current_extra_data" in value;
    isInstance = isInstance && "duration_seconds" in value;
    isInstance = isInstance && "created_at" in value;
    isInstance = isInstance && "device" in value;

    return isInstance;
}

export function GetDeviceActivities200ResponseDeviceActivitiesInnerFromJSON(json: any): GetDeviceActivities200ResponseDeviceActivitiesInner {
    return GetDeviceActivities200ResponseDeviceActivitiesInnerFromJSONTyped(json, false);
}

export function GetDeviceActivities200ResponseDeviceActivitiesInnerFromJSONTyped(json: any, ignoreDiscriminator: boolean): GetDeviceActivities200ResponseDeviceActivitiesInner {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'device_id': json['device_id'],
        'current_state': json['current_state'],
        'current_value': json['current_value'],
        'current_extra_data': json['current_extra_data'],
        'duration_seconds': json['duration_seconds'],
        'created_at': (new Date(json['created_at'])),
        'device': GetDeviceActivities200ResponseDeviceActivitiesInnerDeviceFromJSON(json['device']),
    };
}

export function GetDeviceActivities200ResponseDeviceActivitiesInnerToJSON(value?: GetDeviceActivities200ResponseDeviceActivitiesInner | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'device_id': value.device_id,
        'current_state': value.current_state,
        'current_value': value.current_value,
        'current_extra_data': value.current_extra_data,
        'duration_seconds': value.duration_seconds,
        'created_at': (value.created_at.toISOString()),
        'device': GetDeviceActivities200ResponseDeviceActivitiesInnerDeviceToJSON(value.device),
    };
}

