import { Grid, FileText, CheckSquare, Calendar, List, UserCheck, User, Users, Home } from 'react-feather'

export default [
  {
    header: 'Apps & Pages'
  },
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: <Home size={20} />,
    navLink: '/dashboard'
  },
  {
    id: 'create-campaign',
    title: 'Create Campaign',
    icon: <Grid size={20} />,
    navLink: '/campaigns'
  },
  /*{
    id: 'library',
    title: 'Library',
    icon: <FileText size={20} />,
    navLink: '/library'
  },
  {
    id: 'hire-actors',
    title: 'Hire Actors',
    icon: <UserCheck size={20} />,
    navLink: '/hire-actors'
  },*/
  {
    id: 'recipients',
    title: 'Recipients',
    icon: <UserCheck size={20} />,
    navLink: '/recipients'
  },
  /*{
    id: 'groups',
    title: 'Groups',
    icon: <Users size={20} />,
    navLink: '/groups'
  },
  {
    id: 'old-recipients',
    title: 'Old Recipients',
    icon: <UserCheck size={20} />,
    navLink: '/old-recipients'
  },*/
  {
    id: 'profile',
    title: 'Profile',
    icon: <User size={20} />,
    navLink: '/profile'
  }
]
