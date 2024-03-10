import Checkbox from '@src/components/Checkbox'
import Box from '@src/components/ui/Box'
import Button from '@src/components/ui/Button/Button'
import Divider from '@src/components/ui/Divider'
import Flex from '@src/components/ui/Flex'
import Text from '@src/components/ui/Text'
import useProjectPermissions from '@src/hooks/permissions/useProjectPermissions'
import RoutePaths from '@src/shared/enums/routes-paths'
import { TokensQueryFullData } from '@src/shared/types/ipfs'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { generatePath } from 'react-router-dom'
import { EditableItem, StyledLink } from './styled-components'

interface ArticlesPreviewProps {
  articles: TokensQueryFullData[] | null
  projectAddress: string
}

const ArticlesPreview: React.FC<ArticlesPreviewProps> = ({
  articles,
  projectAddress,
  ...props
}) => {
  const { permissions } = useProjectPermissions(projectAddress)
  const { t } = useTranslation(['article', 'buttons'])
  const [isEdit, setIsEdit] = useState(false)
  const [checkboxes, setCheckboxes] = useState<Record<string, boolean>>({})

  const handleSaveButton = () => {
    setIsEdit(false)
  }

  const handleEditButton = () => setIsEdit(true)

  const onChangeCheckbox = (articleId: string) => {
    setCheckboxes(prev => ({ ...prev, [articleId]: !prev[articleId] }))
  }

  return (
    <Box {...props}>
      <Text.h3>{t('articlesPreview.title')}</Text.h3>
      <Divider my='10px' />
      <Flex flexDirection='column' $gap='8px' py='8px'>
        {articles?.map(article =>
          isEdit ? (
            <EditableItem key={article?.id}>
              <Checkbox
                checked={checkboxes[article.id]}
                onChange={() => onChangeCheckbox(article.id)}
              />
              <Text ml='5px'>{article?.ipfsContent?.name}</Text>
            </EditableItem>
          ) : (
            <StyledLink
              to={generatePath(RoutePaths.PROJECT + RoutePaths.ARTICLE, {
                projectId: projectAddress,
                articleId: article.id,
              })}
              key={article?.id}
            >
              {article?.ipfsContent?.name}
            </StyledLink>
          )
        )}
      </Flex>
      {permissions.canUpdateContent && (
        <Flex mt='10px'>
          {isEdit ? (
            <Button onClick={handleSaveButton}>
              {t('save', { ns: 'buttons' })}
            </Button>
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
export default ArticlesPreview
