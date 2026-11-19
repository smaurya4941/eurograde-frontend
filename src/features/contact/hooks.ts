import { useMutation } from '@tanstack/react-query'
import { contactApi } from './api'

export function useSubmitContactMessage() {
  return useMutation({ mutationFn: contactApi.submit })
}
