import { useMemo } from "react";

const useTruncatedAddress = (account) => {
  const truncated = useMemo(
    () => `${account?.substr(0, 6)}...${account?.substr(-4)}`,
    [account]
  );

  return truncated;
};

export const usePercent = (part, all) => {
  return ((part / all) * 100).toFixed(2);
};

export default useTruncatedAddress;
