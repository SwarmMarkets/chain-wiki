export interface VoteProposal {
  address: string;
  sig: string;
  hash: string;
  data: Data;
}

export interface Data {
  domain: Domain;
  types: Types;
  message: Message;
}

export interface Domain {
  name: string;
  version: string;
}

export interface Types {
  Proposal?: (ProposalEntity)[] | null;
}

export interface ProposalEntity {
  name: string;
  type: string;
}

export interface Message {
  space: string;
  type: string;
  title: string;
  body: string;
  discussion: string;
  choices?: (string)[] | null;
  start: number;
  end: number;
  snapshot: number;
  plugins: string;
  app: string;
  from: string;
  timestamp: number;
}
