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
import type { Automation } from './Automation';
import {
    AutomationFromJSON,
    AutomationFromJSONTyped,
    AutomationToJSON,
} from './Automation';

/**
 * 
 * @export
 * @interface CreateAutomation200Response
 */
export interface CreateAutomation200Response {
    /**
     * 
     * @type {Automation}
     * @memberof CreateAutomation200Response
     */
    automation: Automation;
}

/**
 * Check if a given object implements the CreateAutomation200Response interface.
 */
export function instanceOfCreateAutomation200Response(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "automation" in value;

    return isInstance;
}

export function CreateAutomation200ResponseFromJSON(json: any): CreateAutomation200Response {
    return CreateAutomation200ResponseFromJSONTyped(json, false);
}

export function CreateAutomation200ResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateAutomation200Response {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'automation': AutomationFromJSON(json['automation']),
    };
}

export function CreateAutomation200ResponseToJSON(value?: CreateAutomation200Response | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'automation': AutomationToJSON(value.automation),
    };
}

