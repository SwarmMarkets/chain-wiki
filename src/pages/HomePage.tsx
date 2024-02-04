import { useEffect, useState } from 'react';
import ProjectList from '@src/components/Project/ProjectList';
import useNFTs from '@src/hooks/subgraph/useNFTs';
// import { generatePath, useNavigate } from 'react-router-dom';
// import RoutePaths from '@src/shared/enums/routes-paths';
import ProjectListSkeletons from '@src/components/Project/ProjectListSkeletons';
import Box from '@src/components/ui/Box';
import { useStorage } from '@thirdweb-dev/react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const HomePage = () => {
  // const navigate = useNavigate();

  // const handleClick = () => {
  //   navigate(generatePath(RoutePaths.PROJECT, { projectId: id }));
  // };
  const { t } = useTranslation('projects');
  const { nfts, loadingNfts, error, refetchingNfts } = useNFTs(
    {},
    { fetchFullData: true }
  );

  const skeletonsAreVisible = loadingNfts && !refetchingNfts;
  console.log(nfts);
  useEffect(() => {
    if (error) {
      console.log('error', error);
    }
  }, [error]);

  return (
    <>
      <h1>{t('title')}</h1>
      {nfts && (
        <Box mt={20}>
          {skeletonsAreVisible && <ProjectListSkeletons />}
          <ProjectList projects={nfts} />
        </Box>
      )}
    </>
  );
};

export default HomePage;
