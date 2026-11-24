/** Mirrors App\Http\Resources\V1\Admin\AdminContactMessageResource. */
export interface AdminContactMessage {
  id: number
  first_name: string
  last_name: string
  email: string
  phone: string
  message: string
  source_page: string | null
  handled_at: string | null
  created_at: string | null
}

/** Mirrors App\Http\Resources\V1\Admin\AdminNewsletterSubscriberResource. */
export interface AdminNewsletterSubscriber {
  id: number
  email: string
  source_page: string | null
  unsubscribed_at: string | null
  created_at: string | null
}

export interface AdminListParams {
  page?: number
  perPage?: number
}
