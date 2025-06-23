import staticConfig from 'src/config'
import { createThirdwebClient } from 'thirdweb/dist/types/client/client'

export const thirdwebClient = createThirdwebClient({
  clientId: staticConfig.thirdWebClientId,
})
