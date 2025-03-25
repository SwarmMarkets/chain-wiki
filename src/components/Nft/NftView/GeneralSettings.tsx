import React, { useState } from 'react'
import TextField from 'src/components/ui-kit/TextField/TextField'
import Flex from 'src/components/ui/Flex'
import useNFT from 'src/hooks/subgraph/useNFT'

interface GeneralSettingsProps {
  nftAddress: string
}

const GeneralSettings: React.FC<GeneralSettingsProps> = ({ nftAddress }) => {
  const { nft } = useNFT(nftAddress, { disableRefetch: true })
  const [name, setName] = useState<string | null>(null)

  const handleNameChange = (name: string) => {
    setName(name)
  }

  const nameValue = name === null ? nft?.name : name

  return (
    <Flex flexDirection='column' $gap='16px'>
      <TextField
        value={nameValue}
        onChange={handleNameChange}
        inputProps={{ placeholder: 'Enter site name' }}
      />
    </Flex>
  )
}

export default GeneralSettings
