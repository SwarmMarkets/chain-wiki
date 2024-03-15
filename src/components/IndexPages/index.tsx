import Checkbox from '@src/components/Checkbox'
import Box from '@src/components/ui/Box'
import Button from '@src/components/ui/Button/Button'
import Divider from '@src/components/ui/Divider'
import Flex from '@src/components/ui/Flex'
import Text from '@src/components/ui/Text'
import useNftPermissions from '@src/hooks/permissions/useNftPermissions'
import RoutePaths from '@src/shared/enums/routes-paths'
import { NFTQueryFullData, TokensQueryFullData } from '@src/shared/types/ipfs'
import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { generatePath } from 'react-router-dom'
import { EditableItem, StyledLink } from './styled-components'
import UpdateNftContentButton from '../UpdateContent/UpdateNftContentButton'

interface IndexPagesProps {
  tokens: TokensQueryFullData[] | null
  project: NFTQueryFullData | null
  indexPages?: string[] | null
}

const IndexPages: React.FC<IndexPagesProps> = ({
  tokens,
  project,
  ...props
}) => {
  const { permissions } = useNftPermissions(project?.id)
  const { t } = useTranslation(['project', 'buttons'])
  const [isEdit, setIsEdit] = useState(false)
  const [selectedIndexes, setSelectedIndexes] = useState<string[]>(
    project?.ipfsContent?.indexPages || []
  )

  const handleSaveButton = () => {
    setIsEdit(false)
  }

  const handleEditButton = () => setIsEdit(true)

  const onChangeCheckbox = (tokenId: string) => {
    if (selectedIndexes.includes(tokenId)) {
      setSelectedIndexes(selectedIndexes.filter(id => id !== tokenId))
    } else {
      setSelectedIndexes([...selectedIndexes, tokenId])
    }
  }

  const notEmptyTokens = useMemo(
    () => tokens?.filter(token => token?.ipfsContent?.name),
    [tokens]
  )

  const visibleIndexPages = useMemo(
    () =>
      project?.ipfsContent?.indexPages
        ?.map(id => tokens?.find(token => token?.id === id))
        .filter(token => token?.ipfsContent?.name),
    [tokens, project?.ipfsContent?.indexPages]
  )
  const noTokens = notEmptyTokens?.length === 0
  if (noTokens) {
    return (
      <Box {...props}>
        <Text.h3>{t('indexPages.title')}</Text.h3>
        <Divider my='10px' />
        <Text.p>{t('indexPages.noTokens')}</Text.p>
      </Box>
    )
  }

  const noIndexPages = !visibleIndexPages || visibleIndexPages?.length === 0

  return (
    <Box {...props}>
      <Text.h3>{t('indexPages.title')}</Text.h3>
      <Divider my='10px' />
      {isEdit ? (
        <Flex flexDirection='column' $gap='8px' py='8px'>
          {notEmptyTokens?.map(token => (
            <EditableItem key={token?.id}>
              <Checkbox
                checked={selectedIndexes.includes(token.id)}
                onChange={() => onChangeCheckbox(token.id)}
              />
              <Text ml='5px'>{token?.id}</Text>
            </EditableItem>
          ))}
        </Flex>
      ) : (
        <Flex flexDirection='column' $gap='8px' py='8px'>
          {noIndexPages && <Text>{t('indexPages.noIndexPages')}</Text>}
          {visibleIndexPages?.map(token => (
            <StyledLink
              to={generatePath(RoutePaths.PROJECT + RoutePaths.TOKEN, {
                projectId: project?.id,
                tokenId: token?.id,
              })}
              key={token?.id}
            >
              {token?.id}
            </StyledLink>
          ))}
        </Flex>
      )}

      {permissions.canUpdateContent && (
        <Flex mt='10px'>
          {isEdit && project ? (
            <UpdateNftContentButton
              projectAddress={project.id}
              onSuccess={handleSaveButton}
              projectContentToUpdate={{ indexPages: selectedIndexes }}
            >
              {t('save', { ns: 'buttons' })}
            </UpdateNftContentButton>
          ) : (
            <Button onClick={handleEditButton}>
              {t('edit', { ns: 'buttons' })}
            </Button>
          )}
        </Flex>
      )}
    </Box>
  )
}
export default IndexPages
