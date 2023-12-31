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
 * @interface ReplaceAutomationConditionsRequestConditionsInner
 */
export interface ReplaceAutomationConditionsRequestConditionsInner {
    /**
     * 
     * @type {string}
     * @memberof ReplaceAutomationConditionsRequestConditionsInner
     */
    condition_type: ReplaceAutomationConditionsRequestConditionsInnerConditionTypeEnum;
    /**
     * 
     * @type {number}
     * @memberof ReplaceAutomationConditionsRequestConditionsInner
     */
    device_id: number | null;
    /**
     * 
     * @type {string}
     * @memberof ReplaceAutomationConditionsRequestConditionsInner
     */
    device_property: string | null;
    /**
     * 
     * @type {string}
     * @memberof ReplaceAutomationConditionsRequestConditionsInner
     */
    condition_operator: ReplaceAutomationConditionsRequestConditionsInnerConditionOperatorEnum;
    /**
     * 
     * @type {number}
     * @memberof ReplaceAutomationConditionsRequestConditionsInner
     */
    condition_value: number | null;
    /**
     * 
     * @type {string}
     * @memberof ReplaceAutomationConditionsRequestConditionsInner
     */
    cron_expression: string | null;
}


/**
 * @export
 */
export const ReplaceAutomationConditionsRequestConditionsInnerConditionTypeEnum = {
    Device: 'device',
    Cron: 'cron'
} as const;
export type ReplaceAutomationConditionsRequestConditionsInnerConditionTypeEnum = typeof ReplaceAutomationConditionsRequestConditionsInnerConditionTypeEnum[keyof typeof ReplaceAutomationConditionsRequestConditionsInnerConditionTypeEnum];

/**
 * @export
 */
export const ReplaceAutomationConditionsRequestConditionsInnerConditionOperatorEnum = {
    Eq: 'eq',
    Neq: 'neq',
    Gt: 'gt',
    Gte: 'gte',
    Lt: 'lt',
    Lte: 'lte'
} as const;
export type ReplaceAutomationConditionsRequestConditionsInnerConditionOperatorEnum = typeof ReplaceAutomationConditionsRequestConditionsInnerConditionOperatorEnum[keyof typeof ReplaceAutomationConditionsRequestConditionsInnerConditionOperatorEnum];


/**
 * Check if a given object implements the ReplaceAutomationConditionsRequestConditionsInner interface.
 */
export function instanceOfReplaceAutomationConditionsRequestConditionsInner(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "condition_type" in value;
    isInstance = isInstance && "device_id" in value;
    isInstance = isInstance && "device_property" in value;
    isInstance = isInstance && "condition_operator" in value;
    isInstance = isInstance && "condition_value" in value;
    isInstance = isInstance && "cron_expression" in value;

    return isInstance;
}

export function ReplaceAutomationConditionsRequestConditionsInnerFromJSON(json: any): ReplaceAutomationConditionsRequestConditionsInner {
    return ReplaceAutomationConditionsRequestConditionsInnerFromJSONTyped(json, false);
}

export function ReplaceAutomationConditionsRequestConditionsInnerFromJSONTyped(json: any, ignoreDiscriminator: boolean): ReplaceAutomationConditionsRequestConditionsInner {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'condition_type': json['condition_type'],
        'device_id': json['device_id'],
        'device_property': json['device_property'],
        'condition_operator': json['condition_operator'],
        'condition_value': json['condition_value'],
        'cron_expression': json['cron_expression'],
    };
}

export function ReplaceAutomationConditionsRequestConditionsInnerToJSON(value?: ReplaceAutomationConditionsRequestConditionsInner | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'condition_type': value.condition_type,
        'device_id': value.device_id,
        'device_property': value.device_property,
        'condition_operator': value.condition_operator,
        'condition_value': value.condition_value,
        'cron_expression': value.cron_expression,
    };
}

