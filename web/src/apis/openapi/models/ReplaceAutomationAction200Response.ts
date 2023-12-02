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
import type { AutomationAction } from './AutomationAction';
import {
    AutomationActionFromJSON,
    AutomationActionFromJSONTyped,
    AutomationActionToJSON,
} from './AutomationAction';

/**
 * 
 * @export
 * @interface ReplaceAutomationAction200Response
 */
export interface ReplaceAutomationAction200Response {
    /**
     * 
     * @type {Array<AutomationAction>}
     * @memberof ReplaceAutomationAction200Response
     */
    actions: Array<AutomationAction>;
}

/**
 * Check if a given object implements the ReplaceAutomationAction200Response interface.
 */
export function instanceOfReplaceAutomationAction200Response(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "actions" in value;

    return isInstance;
}

export function ReplaceAutomationAction200ResponseFromJSON(json: any): ReplaceAutomationAction200Response {
    return ReplaceAutomationAction200ResponseFromJSONTyped(json, false);
}

export function ReplaceAutomationAction200ResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ReplaceAutomationAction200Response {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'actions': ((json['actions'] as Array<any>).map(AutomationActionFromJSON)),
    };
}

export function ReplaceAutomationAction200ResponseToJSON(value?: ReplaceAutomationAction200Response | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'actions': ((value.actions as Array<any>).map(AutomationActionToJSON)),
    };
}

