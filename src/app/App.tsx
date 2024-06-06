// import { Box } from '@mui/material'
// import './styles/App.scss'
// import { useEffect, useState } from 'react'
// import { io } from "socket.io-client"

// // function App() {
//   const [ massages, setMassages ] = useState<string[]>([])
//   const [ messageContext, setMessageContext ]= useState<string>("")


//   const socket = io("http://localhost:3000")
//   useEffect(()=> {
//     socket.on('connect', () => {
//       socket.on('receive', massage => {
//         setMassages([...massage]);
//       })
//       setMassages([...massages, `You has been connected with id:${socket.id}`])
//     })



//   },[])



//   socket.on('receive-massage', massage => {
//     setMassages([...massages, massage]);
    
//   })


//   const handleSend = () => {
//     if(messageContext !== '' && messageContext !== '\s+'){
//       setMassages([...massages, messageContext]);
//       setMessageContext(""); 
//       socket.emit('send-massage', messageContext)
//     }
//   };

// //   return (
// //     <>
// //       <Box display="flex" alignItems="center" flexDirection="column">
// //         <Box width="300px" height="400px" border="1px solid black" padding="10px">
// //           {massages.map((message, index) => (
// //             <div key={index}>{message}</div>
// //           ))}
// //         </Box>
// //         <input 
// //           name="chat" 
// //           style={{ border: '1px solid black', width: "300px", height: "70px", padding: '10px' }} 
// //           value={messageContext}
// //           onChange={(e) => setMessageContext(e.target.value)}
// //           />
// //         <button onClick={handleSend}>send</button>
// //       </Box>
// //     </>
// //   )
// // }

// function App() {
//   return (
//     <>
//       <h1>Hello world</h1>
//     </>
//   )
// }

// export default App


import './styles/App.scss'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
//pages
import Main from './layouts/Main.tsx'

import Login from '../pages/Login/index.ts'
// import { ResetPassword } from './pages/ResetPassword/ResetPassword'
import routes from './providers/router/Routes/index.ts'

import { AuthProps, withAuth } from '../shared/hooks/WithAuth.tsx'
import PrivateRoutes from './providers/router/PrivateRoutes/index.ts'
// import NotFound from './pages/NotFound/NotFound'

function App({ isAuthenticated, setAuth }: AuthProps) {
   console.log('auth_status', isAuthenticated)

   return (
      <Router>
         <Routes>
            <Route path='/' element={!isAuthenticated ? <Login setAuth={setAuth} /> : <Navigate to={'/main'} />} />
            {/* <Route path='/forgotPassword' element={<ResetPassword />} /> */}
            <Route element={<PrivateRoutes isAuth={isAuthenticated} />}>
               <Route path='/main' element={<Main />}>
                  {routes
                     .filter((route) => route.layout === '/main')
                     .map((route) => (
                        <Route path={route.layout + route.path} element={route.component} key={route.id} />
                     ))}
               </Route>
            </Route>
            {/* <Route path='*' element={<NotFound />} /> */}
         </Routes>
      </Router>
   )
}

export default withAuth(App)
