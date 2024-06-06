// Icons
// import DashboardIcon from '@mui/icons-material/Dashboard'
// import PersonIcon from '@mui/icons-material/Person'
// import GroupIcon from '@mui/icons-material/Group'
// import EditIcon from '@mui/icons-material/Edit'
// import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import { BorderColor } from '@mui/icons-material'


// pages
import Main from "../../../layouts/Main"
// import { AllUsers } from "./pages/AllUsers/AllUsers";
// import EditProfile from "./pages/EditProfile/EditProfile";
// import { News } from './pages/News/News';
// import AddNewUser from './pages/AddNewUser/AddNewUser';
// import UserProfile from './pages/user-profile/profile';
// import EditUser from './pages/EditUser/EditUser'


export interface IAdminRoute {
   path: string
   name: string
   // icon: JSX.Element
   component: JSX.Element
   layout: string
   id: string
   role: string[]
}


export const routes: IAdminRoute[] = [
  {
    path: '/main',
    name: 'main',
   //  icon: <DashboardIcon />,
    component: <Main/>,
    layout: '/admin',
    id: '1',
    role: ['USER', 'ADMINISTRATOR', 'DEV']
  },
//   {
//     path: '/user-profile',
//     name: 'User Profile',
//     icon: <PersonIcon />,
//     component: <UserProfile/>,
//     layout: '/admin',
//     id: '2',
//     role: ['USER', 'ADMINISTRATOR', 'DEV']
//   },
//   {
//     path: '/all-users',
//     name: 'All users',
//     icon: <GroupIcon />,
//     component: <AllUsers/>,
//     layout: '/admin',
//     id: '3',
//     role: ['ADMINISTRATOR']
//   },
//   {
//     path: '/edit-profile',
//     name: 'Edit Profile',
//     icon: <EditIcon />,
//     component: <EditProfile/>,
//     layout: '/admin',
//     id: '4',
//     role: ['USER', 'ADMINISTRATOR', 'DEV']
//   },
//   {
//     path: '/add-new-user',
//     name: 'Add new User',
//     icon: <PersonAddIcon />,
//     component: <AddNewUser/>,
//     layout: '/admin',
//     id: '5',
//     role: ['ADMINISTRATOR']
//   },
//   {
//     path: '/edit-user',
//     name: 'Edit User',
//     icon: <BorderColor />,
//     component: <EditUser/>,
//     layout: '/admin',
//     id: '6',
//     role: ['ADMINISTRATOR']
//   },
]