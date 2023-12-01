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
import type { DeviceActivityDevice } from './DeviceActivityDevice';
import {
    DeviceActivityDeviceFromJSON,
    DeviceActivityDeviceFromJSONTyped,
    DeviceActivityDeviceToJSON,
} from './DeviceActivityDevice';

/**
 * 
 * @export
 * @interface DeviceActivity
 */
export interface DeviceActivity {
    /**
     * 
     * @type {number}
     * @memberof DeviceActivity
     */
    id: number;
    /**
     * 
     * @type {number}
     * @memberof DeviceActivity
     */
    device_id: number;
    /**
     * 
     * @type {string}
     * @memberof DeviceActivity
     */
    current_state: DeviceActivityCurrentStateEnum;
    /**
     * 
     * @type {number}
     * @memberof DeviceActivity
     */
    current_value: number | null;
    /**
     * 
     * @type {any}
     * @memberof DeviceActivity
     */
    current_extra_data: any | null;
    /**
     * 
     * @type {Date}
     * @memberof DeviceActivity
     */
    started_at: Date;
    /**
     * 
     * @type {Date}
     * @memberof DeviceActivity
     */
    ended_at: Date | null;
    /**
     * 
     * @type {DeviceActivityDevice}
     * @memberof DeviceActivity
     */
    device: DeviceActivityDevice;
}


/**
 * @export
 */
export const DeviceActivityCurrentStateEnum = {
    On: 'on',
    Off: 'off'
} as const;
export type DeviceActivityCurrentStateEnum = typeof DeviceActivityCurrentStateEnum[keyof typeof DeviceActivityCurrentStateEnum];


/**
 * Check if a given object implements the DeviceActivity interface.
 */
export function instanceOfDeviceActivity(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "device_id" in value;
    isInstance = isInstance && "current_state" in value;
    isInstance = isInstance && "current_value" in value;
    isInstance = isInstance && "current_extra_data" in value;
    isInstance = isInstance && "started_at" in value;
    isInstance = isInstance && "ended_at" in value;
    isInstance = isInstance && "device" in value;

    return isInstance;
}

export function DeviceActivityFromJSON(json: any): DeviceActivity {
    return DeviceActivityFromJSONTyped(json, false);
}

export function DeviceActivityFromJSONTyped(json: any, ignoreDiscriminator: boolean): DeviceActivity {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'device_id': json['device_id'],
        'current_state': json['current_state'],
        'current_value': json['current_value'],
        'current_extra_data': json['current_extra_data'],
        'started_at': (new Date(json['started_at'])),
        'ended_at': (json['ended_at'] === null ? null : new Date(json['ended_at'])),
        'device': DeviceActivityDeviceFromJSON(json['device']),
    };
}

export function DeviceActivityToJSON(value?: DeviceActivity | null): any {
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
        'started_at': (value.started_at.toISOString()),
        'ended_at': (value.ended_at === null ? null : value.ended_at.toISOString()),
        'device': DeviceActivityDeviceToJSON(value.device),
    };
}

