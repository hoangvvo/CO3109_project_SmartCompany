import mqtt from 'mqtt'
import { useEffect, useRef } from 'react'
import './App.css'

const client = mqtt.connect('ws://188.166.212.55:9001')

function App() {
  const textAreaRef = useRef(null)

  const writeLog = (message) => {
    textAreaRef.current.value += message + '\n'
    textAreaRef.current.scrollTop = textAreaRef.current.scrollHeight
  }

  useEffect(() => {
    const onConnect = () => {
      writeLog('MQTT connected')
    }
    const onMessage = (topic, message) => {
      writeLog(topic + ': ' + message.toString())
    }
    client.on('connect', onConnect);
    client.on('message', onMessage)
    return () => {
      client.off('connect', onConnect)
      client.off('message', onMessage)
    }
  }, [])

  return (
    <>
      <h1>Simulator</h1>
      
      <textarea ref={textAreaRef} rows="10" cols="50" readOnly style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
        }}></textarea>
    </>
  )
}

export default App
