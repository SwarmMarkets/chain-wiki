import React from 'react'
import Editor from '@src/components/Editor'

interface EditContentProps {
  name: string
  onSuccessUpdate: () => void
  nftAddress: string
  initialContent: string
  uploadedLogoUrl: string | null
  headerBackground: string
}

const EditContent: React.FC<EditContentProps> = ({
  name,
  onSuccessUpdate,
  nftAddress,
  initialContent,
  uploadedLogoUrl,
  headerBackground,
}) => {
  return (
    <Editor
      name={name}
      onSuccessUpdate={onSuccessUpdate}
      nftAddress={nftAddress}
      initialContent={initialContent}
      logoUrl={uploadedLogoUrl}
      headerBackground={headerBackground}
    />
  )
}

export default EditContent
