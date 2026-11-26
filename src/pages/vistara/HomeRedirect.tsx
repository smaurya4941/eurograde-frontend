import { Navigate } from 'react-router'

/** The Home page is shared; `/vistara` simply opens it. */
export default function HomeRedirect() {
  return <Navigate to="/" replace />
}
