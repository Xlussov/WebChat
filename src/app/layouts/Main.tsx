import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
// import Sidebar from '../../components/Sidebar/Sidebar'
// import Header from '../../components/Header/Header'
import {useEffect, useState} from 'react'
// import Footer from '../../components/Footer/Footer'
import Container from '@mui/material/Container'
import { ws } from '../service/api-user-service'
import { io } from 'socket.io-client'
function Main() {
   // const [selectedLink, setSelectedLink] = useState('')

   // function handleLinkClick(linkName: string): void {
   //    setSelectedLink(linkName)
   // }
   const [ massages, setMassages ] = useState<string[]>([])
   const [ messageContext, setMessageContext ]= useState<string>("")

   const handleSend = () => {
      if(messageContext !== '' && messageContext !== '\s+'){
        setMassages([...massages, messageContext]);
        setMessageContext(""); 
      //   socket.emit('send-massage', messageContext)
      }
    };

   const startWS = () => {
      const socket = io("http://localhost:3000")
      useEffect(()=> {
        socket.on('connect', () => {
          socket.on('receive', massage => {
            setMassages([...massage]);
          })
          setMassages([...massages, `You has been connected with id:${socket.id}`])
        })
      },[])

      socket.on('receive-massage', massage => {
        setMassages([...massages, massage]);
      })
   }

   const a = async () => {
      try {
         await ws()
         // startWS()
      } catch (error) {
         console.log(error);
      }
   }
   a()
   return (
      <Box>
         <Container maxWidth='xl' sx={{ flex: '1 1 auto', display: 'flex', justifyContent: 'center'}}>
            <Outlet />
            <Box display='flex' flexDirection="column">
               <Box width="300px" height="400px" border="1px solid black" marginBottom='20px'>
                  {massages.map((message, index) => (
                     <Box key={index}>{message}</Box>
                  ))}
               </Box>
               <Box>
                  <Box marginBottom="20px">
                    <input 
                        name="chat" 
                        style={{ border: '1px solid black', width: "300px", padding: '10px' }} 
                        value={messageContext}
                        onChange={(e) => setMessageContext(e.target.value)}
                     /> 
                     <button onClick={handleSend}>Send</button>
                  </Box>
                  <Box >
                     <input type="text" style={{ border: '1px solid black', width: "300px", padding: '10px' }}/>            
                     <button>Join</button>
                  </Box>
               </Box>
            </Box>
         </Container>
      </Box>
   )
}

export default Main