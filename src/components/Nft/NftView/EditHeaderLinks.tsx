import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import TextField from '@src/components/ui/TextField/TextField'
import Button from '@src/components/ui/Button/Button'
import styled from 'styled-components'
import Flex from '@src/components/ui/Flex'
import RequirePermissions from '@src/components/common/RequirePermissions'
import UpdateNftContentButton from '@src/components/UpdateContent/UpdateNftContentButton'
import { getUniqueId, IpfsHeaderLink } from '@src/shared/utils'
import Icon from '@src/components/ui/Icon'
import useNFT from '@src/hooks/subgraph/useNFT'

const DragHandle = styled.div`
  cursor: grab;
  display: flex;
  align-items: center;
  padding: 0 8px;
  user-select: none;
`

const StyledButtonRemove = styled(Button)`
  padding: 2px;
  display: flex;
  align-items: center;
`

interface EditHeaderLinksProps {
  nftAddress: string
}

const EditHeaderLinks: React.FC<EditHeaderLinksProps> = ({ nftAddress }) => {
  const { t } = useTranslation('nft', { keyPrefix: 'settings' })
  const { nft } = useNFT(nftAddress, {
    fetchFullData: true,
  })

  const initialLinks = nft?.headerLinks?.length
    ? nft?.headerLinks
    : [{ id: getUniqueId(), title: '', link: '' }]

  const [links, setLinks] = useState<IpfsHeaderLink[]>(initialLinks)
  const linksToUpdate = links.filter(link => link.link && link.title)

  const [draggingId, setDraggingId] = useState<string | null>(null)
  const [urlErrorId, setUrlErrorId] = useState<string | null>(null)

  const handleInputChange = (id: string, field: string, value: string) => {
    const updatedLinks = links.map(link =>
      link.id === id ? { ...link, [field]: value } : link
    )
    setLinks(updatedLinks)

    if (field === 'link' && !value.startsWith('https://')) {
      setUrlErrorId(id)
    } else {
      setUrlErrorId(null)
    }
  }

  const handleAddLink = () => {
    setLinks([...links, { id: getUniqueId(), title: '', link: '' }])
  }

  const handleRemoveLink = (id: string) => {
    setLinks(links.filter(link => link.id !== id))
  }

  const handleDragStart = (id: string) => {
    setDraggingId(id)
  }

  const handleDrop = (targetId: string) => {
    if (draggingId && draggingId !== targetId) {
      const draggingIndex = links.findIndex(link => link.id === draggingId)
      const targetIndex = links.findIndex(link => link.id === targetId)
      const reorderedLinks = Array.from(links)

      const [draggedLink] = reorderedLinks.splice(draggingIndex, 1)
      reorderedLinks.splice(targetIndex, 0, draggedLink)

      setLinks(reorderedLinks)
      setDraggingId(null)
    }
  }

  return (
    <Flex width='100%' maxWidth='600px' flexDirection='column'>
      <Flex flexDirection='column' flexGrow={0}>
        {links.map(link => (
          <Flex
            key={link.id}
            alignItems='center'
            $gap='8px'
            marginBottom='12px'
            paddingBottom='8px'
            draggable
            onDragStart={() => handleDragStart(link.id)}
            onDragOver={e => e.preventDefault()}
            onDrop={() => handleDrop(link.id)}
          >
            <DragHandle>⋮⋮</DragHandle>
            <TextField
              placeholder={t('editHeaderLinks.placeholders.name')}
              value={link.title}
              onChange={e =>
                handleInputChange(link.id, 'title', e.target.value)
              }
            />
            <TextField
              placeholder={t('editHeaderLinks.placeholders.url')}
              value={link.link}
              onChange={e => handleInputChange(link.id, 'link', e.target.value)}
              error={
                urlErrorId === link.id
                  ? t('editHeaderLinks.formErrorsHttps.name.required')
                  : ''
              }
              style={{ borderColor: urlErrorId === link.id ? 'red' : '' }}
            />
            <StyledButtonRemove onClick={() => handleRemoveLink(link.id)}>
              <Icon style={{ display: 'flex' }} name='dash' />
            </StyledButtonRemove>
          </Flex>
        ))}
      </Flex>

      <Flex
        justifyContent='space-between'
        alignItems='center'
        marginRight='160px'
      >
        <Button size='medium' onClick={handleAddLink}>
          {t('editHeaderLinks.buttonAddLink')}
        </Button>
        <RequirePermissions nftAddress={nftAddress} canUpdateContent>
          <UpdateNftContentButton
            nftAddress={nftAddress}
            ipfsHeaderLinkToUpdate={linksToUpdate}
            disabled={urlErrorId !== null}
          />
        </RequirePermissions>
      </Flex>
    </Flex>
  )
}

export default EditHeaderLinks
