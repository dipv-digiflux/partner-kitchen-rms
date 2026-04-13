import { commonAjax } from '@/components/crud/commonCrud/commonAjax'
import type { UserProfileDetails, UserProfileDetailsResponse } from '@/types/userProfile.types'
import { useQuery } from '@tanstack/react-query'

export const useUserProfileData = () => {
  return useQuery<UserProfileDetails>({
    queryKey: ['user-profile-details'],
    queryFn: async () => {
      const jsonData = (await commonAjax({ url: '/user/profile-details', type: 'GET' })) as UserProfileDetailsResponse
      return {
        permissions: jsonData.data.permissions,
        data: jsonData,
      }
    },
  })
}
