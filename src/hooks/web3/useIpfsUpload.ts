import { useMutation } from '@tanstack/react-query'
import { thirdwebClient } from 'src/shared/api-clients/thirdweb'
import { UploadableFile } from 'thirdweb/dist/types/storage/upload/types'
import { upload } from 'thirdweb/storage'

export const useIpfsUpload = () => {
  return useMutation<string | string[], unknown, UploadableFile[]>({
    mutationFn: async (files: UploadableFile[]) => {
      return await upload({
        client: thirdwebClient,
        files,
      })
    },
  })
}
