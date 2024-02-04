import { NfTsQuery } from '@src/queries/gql/graphql';
import React from 'react';
import Grid from '../ui/Grid';
import Card from '../ui/Card';

interface PeojectListProps {
  projects: NfTsQuery['nfts'];
}

const PeojectList: React.FC<PeojectListProps> = ({ projects }) => {
  return (
    <Grid gap="20px" minColumnWidth="250px">
      {projects.map((project) => (
        <Card title={project.name} key={project.id}>
          Content
        </Card>
      ))}
    </Grid>
  );
};

export default PeojectList;
