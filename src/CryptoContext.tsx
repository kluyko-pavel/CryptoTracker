import { createContext, useState, useEffect, ReactNode } from "react";
import { IChartInfo, ICryptoContextProps, ICryptoInfo } from "./types";
import { fetchChart, fetchCryptos, fetchSelectedCrypto } from "./apiLogic";
import { getItemInitialState } from "./utils";

export const CryptoContext = createContext<ICryptoContextProps>({
  selectedCrypto: undefined,
  cryptos: [],
  currentPage: 1,
  isLoading: false,
  chartInfo: [],
  bag: [],
  changeCurrentPage: (currentPage: number) => {},
  addToBag: (crypto: ICryptoInfo) => {},
  removeFromBag: (crypto: ICryptoInfo) => {},
  getSelectedCrypto: async (id: string) => {},
  getChartInfo: async (id: string, interval: string) => {},
});

export const CryptoProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCrypto, setSelectedCrypto] = useState<ICryptoInfo | undefined>(
    undefined
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
