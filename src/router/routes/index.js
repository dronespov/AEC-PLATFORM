// ** Routes Imports
import AppRoutes from './Apps'
import PagesRoutes from './Pages'
import DashboardRoutes from './Dashboards'

// ** Document title
const TemplateTitle = '%s - DronePOV Customer Panel'

// ** Default Route
const DefaultRoute = '/dashboard'

// ** Merge Routes
const Routes = [
  ...DashboardRoutes,
  ...AppRoutes,
  ...PagesRoutes
]

export { DefaultRoute, TemplateTitle, Routes }
