import mqtt from 'mqtt'
import { useEffect, useRef, useState } from 'react'
import './App.css'

const client = mqtt.connect('wss://76ce80b3597543e1ba0c836518fdac5e.s2.eu.hivemq.cloud:8884/mqtt', {
  username: 'simulator',
  password: 'Simulator@123',
})


const writeLog = (message) => {
  console.log(message)
}

const TestComponent = ({ hasValue, path, name, hasExtraData, initialState, initialValue }) => {
  const [state, setState] = useState(initialState);
  const [value, setValue] = useState(initialValue);

  const hasInitRef = useRef(false)
  useEffect(() => {
    if (hasInitRef.current) return
    hasInitRef.current = true
    client.on('message', (topic, message) => {
      if (topic === 'device_state_set') {
        const o = JSON.parse(message.toString())
        if (o.path === path) {
          console.log(o)
          setState(o.state)
          setValue(o.value)
          client.publish('device_state_changed', JSON.stringify({
            "path": o.path,
            "state": o.state,
            "value": o.value
          }))
        }
      }
    });
  }, [path, state])

  const publishSensorData = () => {
    const extraData = window.prompt('Enter sensor value', `{"humidity":0.3,"temperature":24}`)
    client.publish('device_state_changed', JSON.stringify({
      "path": path,
      "state": state,
      "value": value,
      "extra_data": JSON.parse(extraData)
    }))
  }


  return (
    <div style={{ border: '1px solid black', padding: 10 }}>
      <h2>{name}</h2>
      <p>Path: {path}</p>
      <p>State: {state}</p>
      {hasValue && <p>Value: {value}</p>}
      {hasExtraData && <button onClick={publishSensorData}>Publish Sensor Data</button>  }
    </div>
  )
}


function App() {
  const hasInitRef = useRef(false)

  useEffect(() => {
    if (hasInitRef.current) return
    hasInitRef.current = true
    client.on('connect', () => {
      writeLog('MQTT connected')
    });
    client.on('message', (topic, message) => {
      writeLog(topic + ': ' + message.toString())
    });
    client.subscribe('device_state_changed', (err) => {
      if (err) {
        writeLog('MQTT subscribe error: ' + err)
      } else {
        writeLog('MQTT subscribed')
      }
    })
    client.subscribe('device_state_set', (err) => {
      if (err) {
        writeLog('MQTT subscribe error: ' + err)
      } else {
        writeLog('MQTT subscribed')
      }
    })
  }, [])

  return (
    <>
      <h1>Simulator</h1>
      <TestComponent name="Meeting Room Light" path="P1" initialState="on" />
      <TestComponent name="Central AC" initialState="off" initialValue={24} hasValue path="P2" />
      <TestComponent name="Theromostat C" initialState="on" initialValue={21} hasValue path="P5" hasExtraData />
    </>
  )
}

export default App
