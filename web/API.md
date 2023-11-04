# API

## Interfaces

### Device and device activity

```typescript
export interface UserDbObject {
  id: number;
  email: string;
  password_hash: string;
  name: string;
  image_url: string;
  created_at: Date;
}

export interface AppSessionDbObject {
  id: number;
  user_id: number;
  token: string;
  created_at: Date;
  expires_at: Date;
}

export enum DeviceCategoryType {
  LIGHT = "light",
  THERMOSTAT = "thermostat",
  DOOR = "door",
  AIR_CONDITIONER = "air_conditioner",
  FAN = "fan",
}

export enum DeviceStateType {
  ON = "on",
  OFF = "off",
}

export interface DeviceDbObject {
  id: number;
  user_id: number;
  name: string;
  /**
   * Logical path to the device, such as the port/pin number P1, P2, etc.
   */
  path: string;
  description?: string | null;
  description_location?: string | null;
  device_category: DeviceCategoryType;
  created_at: Date;
  current_state?: DeviceStateType;
  current_value?: number | null;
  /**
   * JSON object for extra data. For example, the temperature and humidity for a thermostat.
   */
  current_extra_data?: any | null;
}

export interface DeviceActivityDbObject {
  id: number;
  device_id: number;
  current_state: DeviceStateType;
  current_value?: number | null;
  current_extra_data?: any | null;
  duration_seconds?: number | null;
  created_at: Date;
}
```

## Endpoints

### Create device

Called by **web app** to create a device.

#### Request

`POST /api/devices`

```json
{
  "name": "Device name",
  "path": "Device path",
  "description": "Device description",
  "description_location": "Device description location",
  "device_category": "<<DeviceCategoryType>>"
}
```

#### Response

```
<<DeviceDbObject>>
```

### Get devices

Called by **web app** to get all devices.

#### Request

`GET /api/devices`

#### Response

```
<<DeviceDbObject[]>>
```

### Get device

Called by **web app** to get a device.

#### Request

`GET /api/devices/:id`

#### Response

```
<<DeviceDbObject>>
```

### Update device

Called by **web app** to update a device.

#### Request

`PUT /api/devices/:id`

```json
{
  "name": "Device name",
  "path": "Device path",
  "description": "Device description",
  "description_location": "Device description location",
  "device_category": "<<DeviceCategoryType>>"
}
```

#### Response

```
<<DeviceDbObject>>
```

### Delete device

Called by **web app** to delete a device.

#### Request

`DELETE /api/devices/:id`

#### Response

None

### Get all devices' activities

Called by **web app** to get all device activities.

#### Request

`GET /api/device-activities`

#### Response

```
<<DeviceActivityDbObject[]>>
```

### Get a device's activities

Called by **web app** to get a device's activities.

#### Request

`GET /api/devices/:id/activities`

#### Response

```
<<DeviceActivityDbObject[]>>
```

### Set device state

Called by **web app** to set a device state.

#### Request

`POST /api/devices/:id/state`

```json
{
  "state": "<<DeviceStateType>>",
  "value": 0
}
```

### On device state changed

Published by **yolobit board** to update a device state.

#### MQTT message

Topic: `device_state_changed`

Payload (JSON stringified):

```json
{
  "path": "P1/P2/P3",
  "state": "<<DeviceStateType>>",
  "value": 0,
  "extra_data": {
    "any": "data",
    "you": "want",
    "to": "send"
  }
}
```

### On device state set

After being requested by **web app**, the device state will be published to **yolobit board**.

#### MQTT message

Topic: `device_state_set`

Payload (JSON stringified):

```json
{
  "path": "P1/P2/P3",
  "state": "<<DeviceStateType>>",
  "value": 0
}
```
