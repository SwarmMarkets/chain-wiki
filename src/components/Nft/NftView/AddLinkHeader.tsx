import React, { useState } from 'react'
import { FiMinus } from 'react-icons/fi'
import { SettingsLayout } from './SettingsLayout'
import { useTranslation } from 'react-i18next'
import TextField from '@src/components/ui/TextField/TextField'
import Button from '@src/components/ui/Button/Button'
import Flex from '@src/components/ui/Flex'
import styled from 'styled-components'

const LinkRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  position: relative;
  padding-bottom: 8px;
`

const DragHandle = styled.div`
  cursor: grab;
  display: flex;
  align-items: center;
  padding: 0 8px;
  user-select: none;
`

const StyledButtonAdd = styled(Button)`
  padding: 4px;
  display: flex;
  align-items: center;
`

interface LinkItem {
  id: string
  title: string
  url: string
}

const AddLinkHeader: React.FC = () => {
  const { t } = useTranslation('nft')
  const [links, setLinks] = useState<LinkItem[]>([
    { id: '1', title: '', url: '' },
  ])
  const [draggingId, setDraggingId] = useState<string | null>(null)

  const handleInputChange = (id: string, field: string, value: string) => {
    const updatedLinks = links.map(link =>
      link.id === id ? { ...link, [field]: value } : link
    )
    setLinks(updatedLinks)
  }

  const handleAddLink = () => {
    setLinks([...links, { id: Date.now().toString(), title: '', url: '' }])
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
    <Flex
      borderRadius='8px'
      width='100%'
      maxWidth='600px'
      flexDirection='column'
    >
      <SettingsLayout
        title={t('roleManager.navigation.title')}
        description={t('roleManager.navigation.description')}
      >
        {links.map(link => (
          <LinkRow
            key={link.id}
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
              value={link.url}
              onChange={e => handleInputChange(link.id, 'url', e.target.value)}
            />
            <StyledButtonAdd onClick={() => handleRemoveLink(link.id)}>
              <FiMinus />
            </StyledButtonAdd>
          </LinkRow>
        ))}
      </SettingsLayout>

      <Flex
        justifyContent='space-between'
        alignItems='center'
        marginRight='160px'
      >
        <Button onClick={handleAddLink} size='medium'>
          Add link
        </Button>
        <Button size='medium'>Publish</Button>
      </Flex>
    </Flex>
  )
}

export default AddLinkHeader
