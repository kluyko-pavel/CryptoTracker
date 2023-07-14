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
  try {
    const resp: Response = await fetch(
      `${CRYPTO_INFO_URL}?limit=${limit}&offset=${(currentPage - 1) * limit}`
    );

    if (resp.ok) {
      const res: ICryptoResponse = await resp.json();
      return res.data;
    } else {
      throw new Error("Failed to fetch cryptos");
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const fetchSelectedCrypto = async (id: string): Promise<ICryptoInfo> => {
  try {
    const resp: Response = await fetch(`${CRYPTO_INFO_URL}/${id}`);

    if (resp.ok) {
      const res: ISelectedCryptoResponse = await resp.json();
      return res.data;
    } else {
      throw new Error("Failed to fetch selected crypto");
    }
  } catch (error) {
    console.log(error);
    return {} as ICryptoInfo;
  }
};

export const fetchChart = async (
  id: string,
  interval: string
): Promise<IChartInfo[]> => {
  try {
    const resp: Response = await fetch(
      `${CRYPTO_INFO_URL}/${id}/history?interval=${interval}`
    );

    if (resp.ok) {
      const res: IChartInfoResponse = await resp.json();
      return res.data;
    } else {
      throw new Error("Failed to fetch chart info");
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};
