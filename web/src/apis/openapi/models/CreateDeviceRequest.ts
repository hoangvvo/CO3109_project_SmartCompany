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
 * @interface CreateDeviceRequest
 */
export interface CreateDeviceRequest {
    /**
     * 
     * @type {string}
     * @memberof CreateDeviceRequest
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof CreateDeviceRequest
     */
    path: string;
    /**
     * 
     * @type {string}
     * @memberof CreateDeviceRequest
     */
    description?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CreateDeviceRequest
     */
    description_location?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CreateDeviceRequest
     */
    device_category: CreateDeviceRequestDeviceCategoryEnum;
}


/**
 * @export
 */
export const CreateDeviceRequestDeviceCategoryEnum = {
    Light: 'light',
    Thermostat: 'thermostat',
    Door: 'door',
    AirConditioner: 'air_conditioner',
    Fan: 'fan'
} as const;
export type CreateDeviceRequestDeviceCategoryEnum = typeof CreateDeviceRequestDeviceCategoryEnum[keyof typeof CreateDeviceRequestDeviceCategoryEnum];


/**
 * Check if a given object implements the CreateDeviceRequest interface.
 */
export function instanceOfCreateDeviceRequest(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "path" in value;
    isInstance = isInstance && "device_category" in value;

    return isInstance;
}

export function CreateDeviceRequestFromJSON(json: any): CreateDeviceRequest {
    return CreateDeviceRequestFromJSONTyped(json, false);
}

export function CreateDeviceRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateDeviceRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': json['name'],
        'path': json['path'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'description_location': !exists(json, 'description_location') ? undefined : json['description_location'],
        'device_category': json['device_category'],
    };
}

export function CreateDeviceRequestToJSON(value?: CreateDeviceRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'path': value.path,
        'description': value.description,
        'description_location': value.description_location,
        'device_category': value.device_category,
    };
}

