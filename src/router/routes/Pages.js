import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const PagesRoutes = [
  {
    path: '/login',
    component: lazy(() => import('../../views/pages/authentication/Login')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/register',
    component: lazy(() => import('../../views/pages/authentication/Register')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/account/verify/:token',
    component: lazy(() => import('../../views/pages/authentication/Verification')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/forgot-password',
    component: lazy(() => import('../../views/pages/authentication/ForgotPassword')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/verification-message',
    component: lazy(() => import('../../views/pages/authentication/VerificationMessage')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/account/activate/:token',
    component: lazy(() => import('../../views/pages/authentication/Verification')),
    layout: 'BlankLayout',
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/reset-password/:token',
    component: lazy(() => import('../../views/pages/authentication/ResetPassword')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/misc/coming-soon',
    component: lazy(() => import('../../views/pages/misc/ComingSoon')),
    layout: 'BlankLayout',
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/misc/not-authorized',
    component: lazy(() => import('../../views/pages/misc/NotAuthorized')),
    layout: 'BlankLayout',
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/misc/maintenance',
    component: lazy(() => import('../../views/pages/misc/Maintenance')),
    layout: 'BlankLayout',
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/misc/error',
    component: lazy(() => import('../../views/pages/misc/Error')),
    layout: 'BlankLayout',
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/profile/complete',
    component: lazy(() => import('../../views/profile/UpdateProfile'))
  },
  {
    path: '/contact',
    component: lazy(() => import('../../views/pages/contact/Contact')),
    layout: 'BlankLayout'
  },
  {
    path: '/ACE_platform',
    component: lazy(() => import('../../views/ACE_Platform')),
    layout: 'BlankLayout'
  },
  {
    path: '/profile',
    component: lazy(() => import('../../views/profile/index')),
    layout: 'BlankLayout'
  },
  {
    path: '/account-settings',
    component: lazy(() => import('../../views/profile/index')),
    layout: 'BlankLayout'
  },
  {
    path: '/dashboard',
    component: lazy(() => import('../../views/dashboard/index')),
    layout: 'BlankLayout'
  },
  {
    path: '/privacy-policy',
    component: lazy(() => import('../../views/PrivacyPolicy/index')),
    layout: 'BlankLayout',
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/terms',
    component: lazy(() => import('../../views/TermsOfService/index')),
    layout: 'BlankLayout',
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/folder',
    component: lazy(() => import('../../views/Folders/index')),
    layout: 'BlankLayout'
  }
]

export default PagesRoutes
