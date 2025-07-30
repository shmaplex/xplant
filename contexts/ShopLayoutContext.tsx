import React, { createContext, useContext } from "react";

type ShopLayoutContextType = {
  isShopPage: boolean;
};

const ShopLayoutContext = createContext<ShopLayoutContextType>({
  isShopPage: false,
});

export const useShopLayoutContext = () => useContext(ShopLayoutContext);

export default ShopLayoutContext;
