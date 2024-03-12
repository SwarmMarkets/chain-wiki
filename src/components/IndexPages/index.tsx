import Checkbox from '@src/components/Checkbox'
import Box from '@src/components/ui/Box'
import Button from '@src/components/ui/Button/Button'
import Divider from '@src/components/ui/Divider'
import Flex from '@src/components/ui/Flex'
import Text from '@src/components/ui/Text'
import useProjectPermissions from '@src/hooks/permissions/useProjectPermissions'
import RoutePaths from '@src/shared/enums/routes-paths'
import { NFTQueryFullData, TokensQueryFullData } from '@src/shared/types/ipfs'
import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { generatePath } from 'react-router-dom'
import { EditableItem, StyledLink } from './styled-components'
import UpdateProjectContentButton from '../UpdateContent/UpdateProjectContentButton'

interface IndexPagesProps {
  articles: TokensQueryFullData[] | null
  project: NFTQueryFullData
  indexPages?: string[] | null
}

const IndexPages: React.FC<IndexPagesProps> = ({
  articles,
  project,
  ...props
}) => {
  const { permissions } = useProjectPermissions(project.id)
  const { t } = useTranslation(['project', 'buttons'])
  const [isEdit, setIsEdit] = useState(false)
  const [selectedIndexes, setSelectedIndexes] = useState<string[]>(
    project.ipfsContent?.indexPages || []
  )

  const handleSaveButton = () => {
    setIsEdit(false)
  }

  const handleEditButton = () => setIsEdit(true)

  const onChangeCheckbox = (articleId: string) => {
    if (selectedIndexes.includes(articleId)) {
      setSelectedIndexes(selectedIndexes.filter(id => id !== articleId))
    } else {
      setSelectedIndexes([...selectedIndexes, articleId])
    }
  }

  const notEmptyArticles = useMemo(
    () => articles?.filter(article => article?.ipfsContent?.name),
    [articles]
  )

  const visibleIndexPages = useMemo(
    () =>
      project.ipfsContent?.indexPages
        ?.map(id => articles?.find(article => article?.id === id))
        .filter(article => article?.ipfsContent?.name),
    [articles, project.ipfsContent?.indexPages]
  )
  const noArticles = notEmptyArticles?.length === 0
  if (noArticles) {
    return (
      <Box {...props}>
        <Text.h3>{t('indexPages.title')}</Text.h3>
        <Divider my='10px' />
        <Text.p>{t('indexPages.noArticles')}</Text.p>
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
          {notEmptyArticles?.map(article => (
            <EditableItem key={article?.id}>
              <Checkbox
                checked={selectedIndexes.includes(article.id)}
                onChange={() => onChangeCheckbox(article.id)}
              />
              <Text ml='5px'>{article?.ipfsContent?.name}</Text>
            </EditableItem>
          ))}
        </Flex>
      ) : (
        <Flex flexDirection='column' $gap='8px' py='8px'>
          {noIndexPages && <Text>{t('indexPages.noIndexPages')}</Text>}
          {visibleIndexPages?.map(article => (
            <StyledLink
              to={generatePath(RoutePaths.PROJECT + RoutePaths.ARTICLE, {
                projectId: project.id,
                articleId: article?.id,
              })}
              key={article?.id}
            >
              {article?.ipfsContent?.name}
            </StyledLink>
          ))}
        </Flex>
      )}

      {permissions.canUpdateContent && (
        <Flex mt='10px'>
          {isEdit ? (
            <UpdateProjectContentButton
              projectAddress={project.id}
              onSuccess={handleSaveButton}
              projectContentToUpdate={{ indexPages: selectedIndexes }}
            >
              {t('save', { ns: 'buttons' })}
            </UpdateProjectContentButton>
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
