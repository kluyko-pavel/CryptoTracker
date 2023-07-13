import { createContext, useState, useEffect, ReactNode } from "react";
import { IChartInfo, ICryptoContextProps, ICryptoInfo } from "./types";
import { fetchChart, fetchCryptos, fetchSelectedCrypto } from "./apiLogic";
import { getItemInitialState } from "./utils";

export const CryptoContext = createContext<ICryptoContextProps>({
  selectedCrypto: {} as ICryptoInfo,
  cryptos: [] as ICryptoInfo[],
  currentPage: 1,
  isLoading: false,
  chartInfo: [] as IChartInfo[],
  bag: [] as ICryptoInfo[],
  changeCurrentPage: (currentPage: number): void => {},
  addToBag: (crypto: ICryptoInfo): void => {},
  removeFromBag: (crypto: ICryptoInfo): void => {},
  getSelectedCrypto: (id: string): Promise<void> => Promise.resolve(),
  getChartInfo: (id: string, interval: string): Promise<void> =>
    Promise.resolve(),
});

export const CryptoProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCrypto, setSelectedCrypto] = useState<ICryptoInfo>(
    {} as ICryptoInfo
  );
  const [cryptos, setCryptos] = useState<ICryptoInfo[]>([]);
  const [bag, setBag] = useState<ICryptoInfo[]>(getItemInitialState("bag"));
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [chartInfo, setChartInfo] = useState<IChartInfo[]>([]);

  useEffect(() => {
    const fetchCryptosData = async () => {
      setIsLoading(true);
      const data = await fetchCryptos(10, currentPage);
      setCryptos(data);
      setIsLoading(false);
    };

    fetchCryptosData();
  }, [currentPage]);

  const getSelectedCrypto = async (id: string): Promise<void> => {
    setIsLoading(true);
    const data = await fetchSelectedCrypto(id);
    setSelectedCrypto(data);
    setIsLoading(false);
  };

  const getChartInfo = async (id: string, interval: string): Promise<void> => {
    const data = await fetchChart(id, interval);
    setChartInfo(data);
  };

  const addToBag = (crypto: ICryptoInfo): void => {
    setBag([...bag, crypto]);
    localStorage.setItem("bag", JSON.stringify([...bag, crypto]));
  };

  const removeFromBag = (crypto: ICryptoInfo): void => {
    setBag(bag.filter((item: ICryptoInfo) => item.id !== crypto.id));
    localStorage.setItem(
      "bag",
      JSON.stringify(bag.filter((item: ICryptoInfo) => item.id !== crypto.id))
    );
  };

  const changeCurrentPage = (currentPage: number): void => {
    setCurrentPage(currentPage);
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
