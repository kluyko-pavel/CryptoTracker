import { CRYPTO_INFO_URL } from "./constants";
import {
  IChartInfo,
  IChartInfoResponse,
  ICryptoInfo,
  ICryptoResponse,
  ISelectedCryptoResponse,
} from "./types";

export const fetchCryptos = async (
  limit: number,
  currentPage: number
): Promise<ICryptoInfo[]> => {
  const resp: Response = await fetch(
    `${CRYPTO_INFO_URL}?limit=${limit}&offset=${(currentPage - 1) * limit}`
  );
  if (resp.ok) {
    const res: ICryptoResponse = await resp.json();
    return res.data;
  }
  return [];
};

export const fetchSelectedCrypto = async (id: string): Promise<ICryptoInfo> => {
  const resp: Response = await fetch(`${CRYPTO_INFO_URL}/${id}`);
  if (resp.ok) {
    const res: ISelectedCryptoResponse = await resp.json();
    return res.data;
  }
  return {} as ICryptoInfo;
};

export const fetchChart = async (
  id: string,
  interval: string
): Promise<IChartInfo[]> => {
  const resp: Response = await fetch(
    `${CRYPTO_INFO_URL}/${id}/history?interval=${interval}`
  );
  if (resp.ok) {
    const res: IChartInfoResponse = await resp.json();
    return res.data;
  }
  return [];
};
