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
 * @interface AutomationAction
 */
export interface AutomationAction {
    /**
     * 
     * @type {number}
     * @memberof AutomationAction
     */
    id: number;
    /**
     * 
     * @type {number}
     * @memberof AutomationAction
     */
    automation_id: number;
    /**
     * 
     * @type {number}
     * @memberof AutomationAction
     */
    device_id: number | null;
    /**
     * 
     * @type {string}
     * @memberof AutomationAction
     */
    device_state: AutomationActionDeviceStateEnum;
    /**
     * 
     * @type {number}
     * @memberof AutomationAction
     */
    device_value: number | null;
    /**
     * 
     * @type {any}
     * @memberof AutomationAction
     */
    device_extra_data: any | null;
}


/**
 * @export
 */
export const AutomationActionDeviceStateEnum = {
    On: 'on',
    Off: 'off'
} as const;
export type AutomationActionDeviceStateEnum = typeof AutomationActionDeviceStateEnum[keyof typeof AutomationActionDeviceStateEnum];


/**
 * Check if a given object implements the AutomationAction interface.
 */
export function instanceOfAutomationAction(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "automation_id" in value;
    isInstance = isInstance && "device_id" in value;
    isInstance = isInstance && "device_state" in value;
    isInstance = isInstance && "device_value" in value;
    isInstance = isInstance && "device_extra_data" in value;

    return isInstance;
}

export function AutomationActionFromJSON(json: any): AutomationAction {
    return AutomationActionFromJSONTyped(json, false);
}

export function AutomationActionFromJSONTyped(json: any, ignoreDiscriminator: boolean): AutomationAction {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'automation_id': json['automation_id'],
        'device_id': json['device_id'],
        'device_state': json['device_state'],
        'device_value': json['device_value'],
        'device_extra_data': json['device_extra_data'],
    };
}

export function AutomationActionToJSON(value?: AutomationAction | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'automation_id': value.automation_id,
        'device_id': value.device_id,
        'device_state': value.device_state,
        'device_value': value.device_value,
        'device_extra_data': value.device_extra_data,
    };
}
