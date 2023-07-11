import { createContext, useState, useEffect } from "react";
import { CRYPTO_INFO_URL } from "./constants";
import {
  IChartInfo,
  IChartInfoResponse,
  ICryptoInfo,
  ICryptoResponse,
  ISelectedCryptoResponse,
} from "./types";

export const CryptoContext = createContext({
  selectedCrypto: {} as ICryptoInfo,
  cryptos: [] as ICryptoInfo[],
  currentPage: 1,
  isLoading: false,
  chartInfo: [] as IChartInfo[],
  bag: [] as ICryptoInfo[],
  changeCurrentPage: (currentPage: number) => {},
  addToBag: (crypto: ICryptoInfo) => {},
  removeFromBag: (crypto: ICryptoInfo) => {},
  getSelectedCrypto: (id: string) => {},
  getChartInfo: (id: string, interval: string) => {},
});

export const CryptoProvider = ({ children }: { children: any }) => {
  const [selectedCrypto, setSelectedCrypto] = useState({} as ICryptoInfo);
  const [cryptos, setCryptos] = useState([] as ICryptoInfo[]);
  const [bag, setBag] = useState([] as ICryptoInfo[]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [chartInfo, setChartInfo] = useState([] as IChartInfo[]);

  useEffect(() => {
    const fetchCryptos = async (limit: number, currentPage: number) => {
      setIsLoading(true);
      const resp: Response = await fetch(
        `${CRYPTO_INFO_URL}?limit=${limit}&offset=${(currentPage - 1) * limit}`
      );
      if (resp.ok) {
        const res: ICryptoResponse = await resp.json();
        setCryptos(res.data);
      }
      setIsLoading(false);
    };

    fetchCryptos(10, currentPage);
  }, [currentPage]);

  const fetchSelectedCrypto = async (id: string) => {
    setIsLoading(true);
    const resp: Response = await fetch(`${CRYPTO_INFO_URL}/${id}`);
    if (resp.ok) {
      const res: ISelectedCryptoResponse = await resp.json();
      setSelectedCrypto(res.data);
    }
    setIsLoading(false);
  };

  const fetchChart = async (id: string, interval: string) => {
    const resp: Response = await fetch(
      `${CRYPTO_INFO_URL}/${id}/history?interval=${interval}`
    );
    if (resp.ok) {
      const res: IChartInfoResponse = await resp.json();
      setChartInfo(res.data);
    }
  };

  const getSelectedCrypto = async (id: string) => {
    await fetchSelectedCrypto(id);
  };

  const addToBag = (crypto: ICryptoInfo) => {
    setBag([...bag, crypto]);
  };

  const removeFromBag = (crypto: ICryptoInfo) => {
    setBag(bag.filter((item: ICryptoInfo) => item.id !== crypto.id));
  };

  const changeCurrentPage = (currentPage: number) => {
    setCurrentPage(currentPage);
  };

  const getChartInfo = (id: string, interval: string) => {
    fetchChart(id, interval);
  };

  return (
    <CryptoContext.Provider
      value={{
        selectedCrypto,
        cryptos,
        chartInfo,
        currentPage,
        bag,
        isLoading,
        getChartInfo,
        changeCurrentPage,
        addToBag,
        removeFromBag,
        getSelectedCrypto,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};
