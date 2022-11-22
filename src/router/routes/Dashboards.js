import { lazy } from 'react'

const DashboardRoutes = [
  // Dashboards
  {
    path: '/projects',
    component: lazy(() => import('../../views/Projects/drone_dashboard')),
    layout: 'BlankLayout'
  },
  {
    path: '/profile',
    component: lazy(() => import('../../views/profile')),
    exact: true
  }
]

export default DashboardRoutes
