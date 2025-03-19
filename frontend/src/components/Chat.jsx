import React, { useEffect, useState } from 'react'

const Chat=({roomName})=>{
    const[username,setUsername]=useState('')
    const[messages,setMessages]=useState([])
    const[message,setMessage]=useState('')
    const[socket,setSocket]=useState(null)
    const[isListening,setIsListening]=useState(false)
    useEffect(()=>{
        const storedUsername=localStorage.getItem('username')
        if (storedUsername){
            setUsername(storedUsername)
            const ws=new WebSocket(`ws://localhost:8000/ws/chat/${roomName}/`)
            setSocket(ws)
            ws.onmessage=(event)=>{
                const data=JSON.parse(event.data)
                setMessages((prevMessages)=>[...prevMessages,data])
            }
            ws.onclose=()=>{
                console.log('WebSocket closed')
            }
            return ()=>ws.close()
        }
        else{
            alert('No username found in local storage. Please login first.')
        }
    },[roomName])
    const sendMessage=()=>{
        if (socket && message.trim()!==''){
            const data={
                message:message,
                sender:username
            }
            socket.send(JSON.stringify(data))
            setMessage('')
        }
    }
    const startListening=()=>{
        const SpeechRecognition=window.SpeechRecognition || window.webkitSpeechRecognition
        if (!SpeechRecognition){
          alert('Your browser does not support speech recognition.')
          return
        }
        const recognition=new SpeechRecognition();
        recognition.lang='en-US';
        recognition.continuous=false;
        recognition.interimResults=false;
        setIsListening(true)
        recognition.start()
        recognition.onresult=(event)=>{
          const transcript=event.results[0][0].transcript
          setMessage(transcript)
        }
        recognition.onend=()=>{
          setIsListening(false)
        }
        recognition.onerror=(event)=>{
          alert('Speech recognition error: ' + event.error)
          setIsListening(false)
        }
      }
    return (
        <div>
            <div style={{ height: '80vh', width: '1100px', marginLeft: '-990px', marginTop: '50px', overflowY: 'auto', padding: '10px' }}>
                {messages.map((msg, index)=>(
                    <div key={index} style={{ textAlign: msg.sender === username ? 'right' : 'left',margin: '10px 0',}}>
                        <div style={{ display: 'inline-block',backgroundColor: msg.sender === username ? '#dcf8c6' : 'white',padding: '8px 12px',borderRadius: '10px',maxWidth: '60%',wordWrap: 'break-word',boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',}}>
                            <strong>{msg.sender}:</strong> {msg.message}
                        </div>
                    </div>
                ))}
            </div>
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type a message..." style={{ width: '800px', height: '50px', padding: '8px', marginLeft: '-930px', borderRadius: '10px', marginTop: '10px' }}/>
            <button id="listen-btn" onClick={startListening} style={{ marginLeft: '10px', padding: '8px 12px', height: '50px',width:'50px' ,borderRadius:'50%' }}>{isListening ? '🎙️' : '🎤'}</button>
            <button id='realsend' onClick={sendMessage} style={{ padding: '8px 12px', height: '50px', width: '80px', borderRadius: '10px', marginLeft: '10px' }}>Send</button>
        </div>
    )
}

export default Chat;
    