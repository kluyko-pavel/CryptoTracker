export interface ICryptoResponse {
  data: ICryptoInfo[];
  timestamp: number;
}

export interface ISelectedCryptoResponse {
  data: ICryptoInfo;
  timestamp: number;
}

export interface IChartInfoResponse {
  data: IChartInfo[];
  timestamp: number;
}

export interface ICryptoInfo {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string;
  maxSupply: any;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  changePercent24Hr: string;
  vwap24Hr: string;
  quantity?: number;
}

export interface IChartInfo {
  priceUsd: string;
  time: number;
  date: string;
}
