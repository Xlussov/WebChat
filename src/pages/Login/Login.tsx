import { Box, Button, CircularProgress, Grid } from "@mui/material";
import { login } from "../../app/service/api-user-service"

import background from "../../shared/images/background.png"
import {Input} from "../../shared/ui/Input/Input";
import { Form, Formik, FormikHelpers } from "formik";
import { Dispatch, SetStateAction, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { loginValidationSchema } from "../../shared/validation/validationSchemas";
import { jwtDecode } from 'jwt-decode'
import { setAccessToken, setRefreshToken, setSelectedUser } from '../../shared/utils/localStorageLogic'


const Login = ({ setAuth }: { setAuth?: Dispatch<SetStateAction<boolean>> }) => {
   // const submit = async () => {
   //    try {
   //       await login({
   //          username: "User3",
   //          password: "1q2w3e4r5t6y"
   //      })

   //    } catch (error) {
   //       console.log(error);
   //    }
   // }


   const navigate = useNavigate()


   //* Снейкбар
   // const [snackbarData, setSnackbarData] = useState<SnackbarData>({ open: false, error: false });

   // const handleCloseSnackbar = () => {
   //    setSnackbarData({ ...snackbarData, open: false });
   // };


   type UserLogin = {
      username: string;
      password: string;
   }
    
   const initialValues: UserLogin = {
      username: '',
      password: '',
   }

   //* перевірка користувача
   const onSubmit = async (values: UserLogin, props: FormikHelpers<UserLogin>) => {
      console.log(values);
      try {
         const data: any = await login(values)
         if (data.response) {
            // setSnackbarData({ open: true, error: false, message: 'good' });
            setAccessToken(data.response.token)
            setRefreshToken(data.response.token)
            const activeUser = jwtDecode(data.response.token)
            setSelectedUser(activeUser)
            setAuth && setAuth(true)
            setTimeout(() => {
               navigate('/main')
            }, 3000)

         } else {
            // setSnackbarData({ open: true, error: true, message: data.error });
            return
         }

      } catch (error) {
         console.error('Помилка під час обробки форми:', error)
      } finally {
         setTimeout(() => {
            props.resetForm()
            props.setSubmitting(false)
         }, 2500)
      }
   }


   return (
      <>
         <Box>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                  <Box width="100%" height="100vh">
                     <img src={background} alt="Background" style={{objectFit: "cover", height: "100%", width: "100%"}} />
                  </Box>
              </Grid>
              <Grid item xs={4}>
              <Formik initialValues={initialValues} validationSchema={loginValidationSchema} onSubmit={onSubmit}>
                  {(props) => (
                     <Form>
                        <Input name='username' label='Username' />
                        <Input name='password' label='Password' type='password' />
                        <Link to='/SignUp'>Don't have an account?</Link>
                        <Button
                           // typecolor={Color.Blue}
                           // typecolorhover={ColorHover.Blue}
                           type='submit'
                           variant='contained'
                           disabled={props.isSubmitting}
                        >
                           {props.isSubmitting ? (
                              <>
                                 <CircularProgress size={24} color='inherit' style={{ marginRight: '8px' }} />
                                 Loading
                              </>
                           ) : (
                              'Sign in'
                           )}
                        </Button>
                     </Form>
                  )}
               </Formik>
              </Grid>
            </Grid>
         </Box>
      </>
   )
}

export default Login

