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
import type { ReplaceAutomationConditionsRequestConditionsInner } from './ReplaceAutomationConditionsRequestConditionsInner';
import {
    ReplaceAutomationConditionsRequestConditionsInnerFromJSON,
    ReplaceAutomationConditionsRequestConditionsInnerFromJSONTyped,
    ReplaceAutomationConditionsRequestConditionsInnerToJSON,
} from './ReplaceAutomationConditionsRequestConditionsInner';

/**
 * 
 * @export
 * @interface ReplaceAutomationConditionsRequest
 */
export interface ReplaceAutomationConditionsRequest {
    /**
     * 
     * @type {Array<ReplaceAutomationConditionsRequestConditionsInner>}
     * @memberof ReplaceAutomationConditionsRequest
     */
    conditions: Array<ReplaceAutomationConditionsRequestConditionsInner>;
}

/**
 * Check if a given object implements the ReplaceAutomationConditionsRequest interface.
 */
export function instanceOfReplaceAutomationConditionsRequest(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "conditions" in value;

    return isInstance;
}

export function ReplaceAutomationConditionsRequestFromJSON(json: any): ReplaceAutomationConditionsRequest {
    return ReplaceAutomationConditionsRequestFromJSONTyped(json, false);
}

export function ReplaceAutomationConditionsRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): ReplaceAutomationConditionsRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'conditions': ((json['conditions'] as Array<any>).map(ReplaceAutomationConditionsRequestConditionsInnerFromJSON)),
    };
}

export function ReplaceAutomationConditionsRequestToJSON(value?: ReplaceAutomationConditionsRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'conditions': ((value.conditions as Array<any>).map(ReplaceAutomationConditionsRequestConditionsInnerToJSON)),
    };
}

