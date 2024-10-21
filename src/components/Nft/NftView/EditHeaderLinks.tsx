import React, { useState } from 'react'
import { FiMinus } from 'react-icons/fi'
import { SettingsLayout } from './SettingsLayout'
import { useTranslation } from 'react-i18next'
import TextField from '@src/components/ui/TextField/TextField'
import Button from '@src/components/ui/Button/Button'
import styled from 'styled-components'
import Flex from '@src/components/ui/Flex'
import RequirePermissions from '@src/components/common/RequirePermissions'
import UpdateNftContentButton from '@src/components/UpdateContent/UpdateNftContentButton'
import { getUniqueId } from '@src/shared/utils'

const DragHandle = styled.div`
  cursor: grab;
  display: flex;
  align-items: center;
  padding: 0 8px;
  user-select: none;
`

const StyledButtonRemove = styled(Button)`
  padding: 4px;
  display: flex;
  align-items: center;
`

interface LinkItem {
  id: string
  title: string
  link: string
}

interface EditHeaderLinksProps {
  nftAddress: string
}

const EditHeaderLinks: React.FC<EditHeaderLinksProps> = ({ nftAddress }) => {
  const { t } = useTranslation('nft')
  const [links, setLinks] = useState<LinkItem[]>([
    { id: '1', title: '', link: '' },
  ])
  const [draggingId, setDraggingId] = useState<string | null>(null)

  const handleInputChange = (id: string, field: string, value: string) => {
    const updatedLinks = links.map(link =>
      link.id === id ? { ...link, [field]: value } : link
    )
    setLinks(updatedLinks)
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
        <SettingsLayout
          title={t('roleManager.navigation.title')}
          description={t('roleManager.navigation.description')}
        >
          {links.map(link => (
            <Flex
              key={link.id}
              alignItems='center'
              $gap='8px'
              marginBottom='8px'
              paddingBottom='8px'
              draggable
              onDragStart={() => handleDragStart(link.id)}
              onDragOver={e => e.preventDefault()}
              onDrop={() => handleDrop(link.id)}
            >
              <DragHandle>⋮⋮</DragHandle>
              <TextField
                placeholder='Title'
                value={link.title}
                onChange={e =>
                  handleInputChange(link.id, 'title', e.target.value)
                }
              />
              <TextField
                placeholder='URL'
                value={link.link}
                onChange={e =>
                  handleInputChange(link.id, 'link', e.target.value)
                }
              />
              <StyledButtonRemove onClick={() => handleRemoveLink(link.id)}>
                <FiMinus />
              </StyledButtonRemove>
            </Flex>
          ))}
        </SettingsLayout>
      </Flex>

      <Flex
        justifyContent='space-between'
        alignItems='center'
        marginRight='160px'
      >
        <Button size='medium' onClick={handleAddLink}>
          {t('roleManager.navigation.buttonAddLink')}
        </Button>
        <RequirePermissions nftAddress={nftAddress} canUpdateContent>
          <UpdateNftContentButton
            mt={3}
            // onSuccess={onSuccessUpdate}
            nftAddress={nftAddress}
            ipfsHeaderLinkToUpdate={links}
          />
        </RequirePermissions>
      </Flex>
    </Flex>
  )
}

export default EditHeaderLinks
