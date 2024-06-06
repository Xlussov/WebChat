import { useEffect, useState, ComponentType, FC, SetStateAction, Dispatch } from 'react'
import { getAllUsers } from '../../app/service/api-user-service'

export interface AuthProps {
  isAuthenticated: boolean
  setAuth?: Dispatch<SetStateAction<boolean>>
}

export const withAuth = (WrappedComponent: ComponentType<AuthProps>) => {
  const WithAuth: FC<AuthProps> = props => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
      getAllUsers().then((response: any) => {
        if (response?.response) {
          setIsAuthenticated(true)
        } else {
          setIsAuthenticated(false)
        }
        setIsLoading(false)
      })
    }, [])

    return isLoading ? null : (
      <WrappedComponent {...props} setAuth={setIsAuthenticated} isAuthenticated={isAuthenticated} />
    )
  }
  return WithAuth
}
