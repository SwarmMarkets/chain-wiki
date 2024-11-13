import RequirePermissions from '@src/components/common/RequirePermissions'
import Button from '@src/components/ui/Button/Button'
import Flex from '@src/components/ui/Flex'
import Icon from '@src/components/ui/Icon'
import TextField from '@src/components/ui/TextField/TextField'
import UpdateNftContentButton from '@src/components/UpdateContent/UpdateNftContentButton'
import useNFT from '@src/hooks/subgraph/useNFT'
import { getUniqueId } from '@src/shared/utils'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import useEditHeaderLinks from '@src/hooks/forms/useEditHeaderLinks'

interface EditHeaderLinksProps {
  nftAddress: string
}

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

const EditHeaderLinks: React.FC<EditHeaderLinksProps> = ({ nftAddress }) => {
  const { t } = useTranslation('nft', { keyPrefix: 'settings' })

  const { nft } = useNFT(nftAddress, { fetchFullData: true })
  const initialLinks = nft?.headerLinks?.length
    ? nft?.headerLinks
    : [{ id: getUniqueId(), title: '', link: '' }]
  const {
    form,
    fieldArray: { fields, append, remove, move },
  } = useEditHeaderLinks(initialLinks)

  const [draggingId, setDraggingId] = useState<string | null>(null)

  const handleAddLink = () => {
    append({ title: '', link: '' })
  }

  const handleRemoveLink = (index: number) => {
    remove(index)
  }

  const handleDragStart = (id: string) => {
    setDraggingId(id)
  }

  const handleDrop = (targetId: string) => {
    if (draggingId && draggingId !== targetId) {
      const draggingIndex = fields.findIndex(link => link.id === draggingId)
      const targetIndex = fields.findIndex(link => link.id === targetId)
      move(draggingIndex, targetIndex)
      setDraggingId(null)
    }
  }

  console.log(form.formState.errors)

  return (
    <Flex as='form' width='100%' maxWidth='600px' flexDirection='column'>
      <Flex
        flexDirection='column'
        flexGrow={0}
        onSubmit={() =>
          form.handleSubmit(() => {
            console.log('SUBMIT')
          })
        }
      >
        {fields.map((link, index) => (
          <Flex
            key={link.id}
            alignItems='center'
            $gap='8 px'
            marginBottom='12px'
            paddingBottom='8px'
            draggable
            onDragStart={() => handleDragStart(link.id)}
            onDragOver={e => e.preventDefault()}
            onDrop={() => handleDrop(link.id)}
          >
            <DragHandle>⋮⋮</DragHandle>
            <TextField
              inputProps={{
                ...form.register(`headerLink.${index}.title`),
                height: '40px',
              }}
              placeholder={t('editHeaderLinks.placeholders.name')}
              error={form.formState.errors?.[
                `headerLink[${index}].title`
              ]?.message?.toString()}
            />
            <TextField
              inputProps={{
                ...form.register(`headerLink.${index}.link`),
                height: '40px',
              }}
              placeholder={t('editHeaderLinks.placeholders.link')}
              error={form.formState.errors?.[
                `headerLink[${index}].link`
              ]?.message?.toString()}
            />
            <StyledButtonRemove onClick={() => handleRemoveLink(index)}>
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
        <Button
          size='medium'
          onClick={e => {
            e.preventDefault()
            handleAddLink()
          }}
        >
          {t('editHeaderLinks.buttonAddLink')}
        </Button>
        <RequirePermissions nftAddress={nftAddress}>
          <UpdateNftContentButton
            onClick={form.handleSubmit(() => {})}
            nftAddress={nftAddress}
            ipfsHeaderLinkToUpdate={fields}
            disabled={!!form.formState.errors.headerLink}
          />
        </RequirePermissions>
      </Flex>
    </Flex>
  )
}

export default EditHeaderLinks
