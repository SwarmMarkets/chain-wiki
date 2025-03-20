import React, { useState } from 'react'
import { HexColorPicker } from 'react-colorful'
import { useTranslation } from 'react-i18next'
import UpdateNftContentButton from 'src/components/UpdateContent/UpdateNftContentButton'
import ColorField from 'src/components/common/ColorFIeld'
import RequirePermissions from 'src/components/common/RequirePermissions'
import Button from 'src/components/ui-kit/Button/Button'
import Icon from 'src/components/ui-kit/Icon/Icon'
import IconButton from 'src/components/ui-kit/IconButton'
import TextField from 'src/components/ui-kit/TextField/TextField'
import useClickAway from 'src/components/ui-kit/hooks/useClickAway'
import useEditHeaderLinks from 'src/hooks/forms/useEditHeaderLinks'
import useEffectCompare from 'src/hooks/useEffectCompare'
import { getUniqueId, NFTWithMetadata } from 'src/shared/utils'

interface EditHeaderLinksProps {
  nft: NFTWithMetadata
}

const EditHeaderLinks: React.FC<EditHeaderLinksProps> = ({ nft }) => {
  const { t } = useTranslation('nft', { keyPrefix: 'settings' })

  const initialLinks = nft?.headerLinksContent?.headerLinks?.length
    ? nft?.headerLinksContent?.headerLinks
    : [{ id: getUniqueId(), title: '', link: '' }]

  const {
    form,
    headerLinks,
    fieldArray: { fields, append, remove, move },
    errors,
  } = useEditHeaderLinks(initialLinks)

  const [linksColor, setLinksColor] = useState('#ffffff')
  useEffectCompare(() => {
    if (nft.headerLinksContent?.color)
      setLinksColor(nft.headerLinksContent.color)
  }, [nft.headerLinksContent?.color])

  const [draggingId, setDraggingId] = useState(null)

  return (
    <form className='w-full max-w-lg flex flex-col'>
      <div className='flex flex-col'>
        {fields.map((link, index) => {
          const { onChange: onChangeTitle, ...registerTitle } = form.register(
            `headerLinks.${index}.title`
          )
          const { onChange: onChangeLink, ...registerLink } = form.register(
            `headerLinks.${index}.link`
          )

          return (
            <div
              key={link.id}
              className='flex items-center gap-2 cursor-grab'
              draggable
              onDragStart={() => setDraggingId(link.id)}
              onDragOver={e => e.preventDefault()}
              onDrop={() => {
                if (draggingId !== link.id) {
                  const draggingIndex = fields.findIndex(
                    l => l.id === draggingId
                  )
                  const targetIndex = fields.findIndex(l => l.id === link.id)
                  move(draggingIndex, targetIndex)
                  setDraggingId(null)
                }
              }}
            >
              <div className='pt-2 pb-5'>⋮⋮</div>
              <TextField
                {...registerTitle}
                inputProps={{
                  placeholder: t('editHeaderLinks.placeholders.title'),
                  onChange: onChangeTitle,
                  ...registerTitle,
                }}
                errorMessage={errors.headerLinks?.[index]?.title?.message}
              />
              <TextField
                {...registerLink}
                inputProps={{
                  placeholder: t('editHeaderLinks.placeholders.link'),
                  onChange: onChangeLink,
                  ...registerLink,
                }}
                errorMessage={errors.headerLinks?.[index]?.link?.message}
              />
              <IconButton
                className='p-1 mb-3 flex items-center'
                onClick={() => remove(index)}
              >
                <Icon name='dash' size={14} />
              </IconButton>
            </div>
          )
        })}
      </div>

      <div className=' mb-5'>
        <Button
          onClick={e => {
            e.preventDefault()
            append({ title: '', link: '' })
          }}
        >
          {t('editHeaderLinks.buttonAddLink')}
        </Button>
      </div>

      <div>
        <h3 className='typo-title1 text-main-accent font-semibold mb-1'>
          {t('linksColor.title')}
        </h3>
        <p>{t('linksColor.description')}</p>
        <ColorField
          color={linksColor}
          onChange={setLinksColor}
          className='mt-2'
        />
        <RequirePermissions nftAddress={nft.id}>
          <UpdateNftContentButton
            className='mt-2 w-full'
            nftAddress={nft.id}
            ipfsHeaderLinkToUpdate={{ headerLinks, color: linksColor }}
            disabled={!form.formState.isValid}
          />
        </RequirePermissions>
      </div>
    </form>
  )
}

export default EditHeaderLinks
