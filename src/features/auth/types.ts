/** Mirrors App\Http\Resources\V1\UserResource. */
export interface User {
  id: number
  name: string
  email: string
  email_verified_at: string | null
  is_admin: boolean
  created_at: string | null
}
