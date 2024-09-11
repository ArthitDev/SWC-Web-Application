import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { PredictResponse } from 'services/predictService';

interface PredictContextProps {
  result: PredictResponse | null;
  setResult: (result: PredictResponse | null) => void; // อนุญาตให้รับค่า null
}

const PredictContext = createContext<PredictContextProps | undefined>(
  undefined
);

export const usePredict = () => {
  const context = useContext(PredictContext);
  if (!context) {
    throw new Error('usePredict must be used within a PredictProvider');
  }
  return context;
};

export const PredictProvider = ({ children }: { children: ReactNode }) => {
  const [result, setResultState] = useState<PredictResponse | null>(null);

  const setResult = (newResult: PredictResponse | null) => {
    setResultState(newResult);
    if (newResult) {
      localStorage.setItem('predictResult', JSON.stringify(newResult));
    } else {
      localStorage.removeItem('predictResult');
    }
  };

  useEffect(() => {
    const storedResult = localStorage.getItem('predictResult');
    if (storedResult) {
      setResultState(JSON.parse(storedResult));
    }
  }, []);

  return (
    <PredictContext.Provider value={{ result, setResult }}>
      {children}
    </PredictContext.Provider>
  );
};
