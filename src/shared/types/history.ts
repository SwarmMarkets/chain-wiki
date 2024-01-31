export interface HistoryItem {
  id: number;
  updatedAt: number;
  editor: string;
  newURI: string;
  previousURI: string;
  nft: string;
  token: string;
}

export interface HistoryItemIpfsData {
  name: string;
  htmlContent: string;
}