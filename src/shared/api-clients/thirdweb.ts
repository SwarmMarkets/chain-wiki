import staticConfig from 'src/config'
import { createThirdwebClient } from 'thirdweb'

export const thirdwebClient = createThirdwebClient({
  clientId: staticConfig.thirdWebClientId,
})
