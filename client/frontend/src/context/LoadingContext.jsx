import { createContext, useState, useContext } from "react";

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [isLoadingAnimator, setIsLoadingAnimator] = useState(false);

  return (
    <LoadingContext.Provider
      value={{ isLoadingAnimator, setIsLoadingAnimator }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
