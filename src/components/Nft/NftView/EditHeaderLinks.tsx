import React, { useState, useRef, useEffect, MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { HexColorPicker } from 'react-colorful'
import useEditHeaderLinks from 'src/hooks/forms/useEditHeaderLinks'
import { getUniqueId } from 'src/shared/utils'
import RequirePermissions from 'src/components/common/RequirePermissions'
import UpdateNftContentButton from 'src/components/UpdateContent/UpdateNftContentButton'
import Icon from 'src/components/ui-kit/Icon/Icon'
import { useHeaderColorContext } from './HeaderColorContext'
import useNFT from 'src/hooks/subgraph/useNFT'
import TextField from 'src/components/ui-kit/TextField/TextField'
import Button from 'src/components/ui-kit/Button/Button'
import IconButton from 'src/components/ui-kit/IconButton'
import useClickAway from 'src/components/ui-kit/hooks/useClickAway'

interface EditHeaderLinksProps {
  nftAddress: string
}

const EditHeaderLinks: React.FC<EditHeaderLinksProps> = ({ nftAddress }) => {
  const { t } = useTranslation('nft', { keyPrefix: 'settings' })
  const { nft } = useNFT(nftAddress, { fetchFullData: true })

  const initialLinks = nft?.headerLinksContent?.headerLinks?.length
    ? nft?.headerLinksContent?.headerLinks
    : [{ id: getUniqueId(), title: '', link: '' }]

  const {
    form,
    headerLinks,
    fieldArray: { fields, append, remove, move },
    errors,
  } = useEditHeaderLinks(initialLinks)

  const { linksColor, setLinksColor } = useHeaderColorContext()
  const [draggingId, setDraggingId] = useState(null)

  const colorPicker = useClickAway()

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
        <div className='flex items-center mt-2'>
          <TextField
            value={linksColor}
            onChange={e => setLinksColor(e)}
            className='w-24'
          />
          <div
            className='w-6 h-6 ml-2 border rounded cursor-pointer relative'
            style={{ backgroundColor: linksColor }}
            onClick={() => colorPicker.toggle()}
          >
            {colorPicker.active && (
              <div
                ref={colorPicker.ref}
                className='absolute bottom-8 left-0 z-10 rounded'
                onClick={e => e.stopPropagation()}
              >
                <HexColorPicker color={linksColor} onChange={setLinksColor} />
              </div>
            )}
          </div>
        </div>
        <RequirePermissions nftAddress={nftAddress}>
          <UpdateNftContentButton
            className='mt-2 w-full'
            nftAddress={nftAddress}
            ipfsHeaderLinkToUpdate={{ headerLinks, color: linksColor }}
            disabled={!form.formState.isValid}
          />
        </RequirePermissions>
      </div>
    </form>
  )
}

export default EditHeaderLinks
