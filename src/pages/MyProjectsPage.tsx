import ProjectList from '@src/components/Project/ProjectList'
import ProjectSkeletonList from '@src/components/Project/ProjectSkeletonList'
import Box from '@src/components/ui/Box'
import ButtonGroup from '@src/components/ui/Button/ButtonGroup'
import useNFTs from '@src/hooks/subgraph/useNFTs'
import { ProjectButtonOptions } from '@src/shared/enums/projects/button-options'
import { ButtonOption } from '@src/shared/types/ui-components'
import { useAddress } from '@thirdweb-dev/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const MyProjectsPage = () => {
  const { t } = useTranslation('projects')
  const address = useAddress() || ''
  const [selectedOption, setSelectedOption] = useState<string>(
    ProjectButtonOptions.ALL
  )
  const { fullNfts, loadingNfts, refetchingNfts, refetch } = useNFTs(
    {
      variables: {
        filter: {
          or: [
            { admins_contains_nocase: [address] },
            { issuers_contains_nocase: [address] },
            { editors_contains_nocase: [address] },
          ],
        },
      },
      skip: !address,
    },
    { fetchFullData: true }
  )
  const skeletonsAreVisible = loadingNfts && !refetchingNfts

  const options: ButtonOption[] = [
    { value: ProjectButtonOptions.ALL, label: t('filter.all') },
    { value: ProjectButtonOptions.ADMIN, label: t('filter.admin') },
    { value: ProjectButtonOptions.EDITOR, label: t('filter.editor') },
    { value: ProjectButtonOptions.ISSUER, label: t('filter.issuer') },
  ]

  const handleSelect = (value: string) => {
    if (value === ProjectButtonOptions.ALL) {
      refetch({
        filter: {
          or: [
            { admins_contains_nocase: [address] },
            { issuers_contains_nocase: [address] },
            { editors_contains_nocase: [address] },
          ],
        },
      })
    } else if (value === ProjectButtonOptions.ADMIN) {
      refetch({
        filter: {
          admins_contains_nocase: [address],
        },
      })
    } else if (value === ProjectButtonOptions.EDITOR) {
      refetch({
        filter: {
          editors_contains_nocase: [address],
        },
      })
    } else {
      refetch({
        filter: {
          issuers_contains_nocase: [address],
        },
      })
    }
    setSelectedOption(value)
  }

  return (
    <>
      <h1>{t('myProjectsTitle')}</h1>
      <ButtonGroup
        mt={20}
        options={options}
        selectedValue={selectedOption}
        onSelect={handleSelect}
      />
      <Box mt={20}>
        {fullNfts && !skeletonsAreVisible && (
          <ProjectList addProjectCard projects={fullNfts} />
        )}
        {skeletonsAreVisible && <ProjectSkeletonList />}
      </Box>
    </>
  )
}

export default MyProjectsPage
