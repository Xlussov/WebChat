import { TextField } from '@mui/material'
import { ErrorMessage, Field, FieldProps } from 'formik'
import React from 'react'


interface InputProps {
   name: string
   label: string
   type?: 'text' | 'password' | 'email' | 'number'
   // color?: 'error' | 'primary' | 'secondary' | 'info' | 'success' | 'warning'
}

export const Input: React.FC<InputProps> = ({ name, label, type = 'text' }) => {
   return (
      <Field name={name}>
         {({ field, form }: FieldProps<string>) => (
            <TextField
               fullWidth
               {...field}
               name={name}
               label={label}
               type={type}
               margin='normal'
               variant='outlined'
               // color={color}

               onBlur={field.onBlur}
               onChange={field.onChange}
               value={field.value}
               helperText={<ErrorMessage name={name} />}
               error={form.touched[name] && !!form.errors[name]}
               autoComplete='true'
               // sx={{ color: Color.Silver }}
            />
         )}
      </Field>
   )
}