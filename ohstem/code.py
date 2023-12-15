from mqtt import *
import ujson
from yolobit import *
button_a.on_pressed = None
button_b.on_pressed = None
button_a.on_pressed_ab = button_b.on_pressed_ab = -1
from aiot_rgbled import RGBLed
from event_manager import *
import time
from machine import Pin, SoftI2C
from aiot_dht20 import DHT20

tiny_rgb = RGBLed(pin1.pin, 4)

def on_mqtt_message_receive_callback__device_state_set_(data):
  global path, state, value
  path = ujson.loads(data)['path']
  state = ujson.loads(data)['state']
  value = ujson.loads(data)['value']
  if path == 'P1':
    if state == 'on':
      tiny_rgb.show(0, hex_to_rgb('#ff0000'))
    else:
      tiny_rgb.show(0, hex_to_rgb('#000000'))
  if path == 'P2':
    if state == 'on':
      pin10.write_analog(round(translate(value, 0, 100, 0, 1023)))
    else:
      pin10.write_analog(round(translate(0, 0, 100, 0, 1023)))

event_manager.reset()

aiot_dht20 = DHT20(SoftI2C(scl=Pin(22), sda=Pin(21)))

def on_event_timer_callback_Q_r_g_k_a():
  global data, path, state, value
  mqtt.publish('device_state_changed', ({
    "state" : 'on',
    "extra_data" : ({
      "temperature" : (aiot_dht20.dht20_temperature()),
      "humidity" : (aiot_dht20.dht20_humidity())
    })
  }))

event_manager.add_timer_event(30000, on_event_timer_callback_Q_r_g_k_a)

if True:
  mqtt.connect_wifi('CE-lab', 'netfpga1')
  mqtt.connect_broker(server='mqtt.ohstem.vn', port=1883, username='yolobit123', password='')
  mqtt.on_receive_message('device_state_set', on_mqtt_message_receive_callback__device_state_set_)

while True:
  mqtt.check_message()
  event_manager.run()
  time.sleep_ms(1000)
