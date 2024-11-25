import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import SettingCard from '@src/components/Settings/SettingCard'
import useEditHeaderLinks from '@src/hooks/forms/useEditHeaderLinks'
import { getUniqueId } from '@src/shared/utils'
import RequirePermissions from '@src/components/common/RequirePermissions'
import UpdateNftContentButton from '@src/components/UpdateContent/UpdateNftContentButton'
import Flex from '@src/components/ui/Flex'
import TextField from '@src/components/ui/TextField/TextField'
import Icon from '@src/components/ui/Icon'
import Button from '@src/components/ui/Button/Button'
import { ColorBox, ColorInputWrapper, PickerWrapper } from './styled-components'
import { useHeaderColorContext } from './HeaderColorContext'
import { HexColorPicker } from 'react-colorful'
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
  const { nft } = useNFT(nftAddress, { fetchFullData: true })

  const initialLinks = nft?.headerLinks?.length
    ? nft?.headerLinks
    : [{ id: getUniqueId(), title: '', link: '' }]

  const {
    form,
    headerLinks,
    fieldArray: { fields, append, remove, move },
    errors,
  } = useEditHeaderLinks(initialLinks)

  const { linksColor, setLinksColor } = useHeaderColorContext()
  const [draggingId, setDraggingId] = useState<string | null>(null)
  const [isColorPickerVisible, setIsColorPickerVisible] = useState(false)

  const pickerRef = useRef<HTMLDivElement>(null)

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

  const toggleColorPicker = () => {
    setIsColorPickerVisible(prev => !prev)
  }

  const handleColorChange = (newColor: string) => {
    setLinksColor(newColor) // This updates both state and localStorage
  }

  const closeColorPicker = (e: MouseEvent) => {
    if (
      pickerRef.current &&
      !pickerRef.current.contains(e.target as Node) &&
      isColorPickerVisible
    ) {
      setIsColorPickerVisible(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', closeColorPicker)
    return () => {
      document.removeEventListener('mousedown', closeColorPicker)
    }
  }, [isColorPickerVisible])

  const isValid = form.formState.isValid

  return (
    <Flex as='form' width='100%' maxWidth='600px' flexDirection='column'>
      <Flex flexDirection='column' flexGrow={0}>
        {fields.map((link, index) => (
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
              inputProps={{
                ...form.register(`headerLinks.${index}.title`),
                height: '35px',
              }}
              placeholder={t('editHeaderLinks.placeholders.title')}
              error={errors.headerLinks?.[index]?.title?.message}
            />
            <TextField
              inputProps={{
                ...form.register(`headerLinks.${index}.link`),
                height: '35px',
              }}
              placeholder={t('editHeaderLinks.placeholders.link')}
              error={errors.headerLinks?.[index]?.link?.message}
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
        marginBottom='20px'
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
            nftAddress={nftAddress}
            ipfsHeaderLinkToUpdate={{
              headerLinks: headerLinks,
              color: linksColor,
            }}
            disabled={!isValid}
            onSuccess={() => console.log('Links color updated!')}
          />
        </RequirePermissions>
      </Flex>

      <SettingCard
        title={t('linksColor.title')}
        description={t('linksColor.description')}
      >
        <ColorInputWrapper alignItems={'center'}>
          <TextField
            width={85}
            value={linksColor}
            inputProps={{
              onChange: e => handleColorChange(e.currentTarget.value),
            }}
          />
          <ColorBox
            color={linksColor}
            onClick={toggleColorPicker}
            marginLeft={10}
            width={24}
            height={24}
            justifyContent={'center'}
          />
          {isColorPickerVisible && (
            <PickerWrapper ref={pickerRef} marginLeft={95}>
              <HexColorPicker color={linksColor} onChange={handleColorChange} />
            </PickerWrapper>
          )}
        </ColorInputWrapper>
      </SettingCard>
    </Flex>
  )
}

export default EditHeaderLinks
