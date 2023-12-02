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
import type { AutomationCondition } from './AutomationCondition';
import {
    AutomationConditionFromJSON,
    AutomationConditionFromJSONTyped,
    AutomationConditionToJSON,
} from './AutomationCondition';

/**
 * 
 * @export
 * @interface Automation
 */
export interface Automation {
    /**
     * 
     * @type {number}
     * @memberof Automation
     */
    id: number;
    /**
     * 
     * @type {number}
     * @memberof Automation
     */
    user_id: number;
    /**
     * 
     * @type {string}
     * @memberof Automation
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof Automation
     */
    description: string | null;
    /**
     * 
     * @type {string}
     * @memberof Automation
     */
    logical_operator: AutomationLogicalOperatorEnum;
    /**
     * 
     * @type {Array<AutomationCondition>}
     * @memberof Automation
     */
    conditions?: Array<AutomationCondition>;
    /**
     * 
     * @type {Array<AutomationAction>}
     * @memberof Automation
     */
    actions?: Array<AutomationAction>;
}


/**
 * @export
 */
export const AutomationLogicalOperatorEnum = {
    And: 'and',
    Or: 'or'
} as const;
export type AutomationLogicalOperatorEnum = typeof AutomationLogicalOperatorEnum[keyof typeof AutomationLogicalOperatorEnum];


/**
 * Check if a given object implements the Automation interface.
 */
export function instanceOfAutomation(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "user_id" in value;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "description" in value;
    isInstance = isInstance && "logical_operator" in value;

    return isInstance;
}

export function AutomationFromJSON(json: any): Automation {
    return AutomationFromJSONTyped(json, false);
}

export function AutomationFromJSONTyped(json: any, ignoreDiscriminator: boolean): Automation {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'user_id': json['user_id'],
        'name': json['name'],
        'description': json['description'],
        'logical_operator': json['logical_operator'],
        'conditions': !exists(json, 'conditions') ? undefined : ((json['conditions'] as Array<any>).map(AutomationConditionFromJSON)),
        'actions': !exists(json, 'actions') ? undefined : ((json['actions'] as Array<any>).map(AutomationActionFromJSON)),
    };
}

export function AutomationToJSON(value?: Automation | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'user_id': value.user_id,
        'name': value.name,
        'description': value.description,
        'logical_operator': value.logical_operator,
        'conditions': value.conditions === undefined ? undefined : ((value.conditions as Array<any>).map(AutomationConditionToJSON)),
        'actions': value.actions === undefined ? undefined : ((value.actions as Array<any>).map(AutomationActionToJSON)),
    };
}

