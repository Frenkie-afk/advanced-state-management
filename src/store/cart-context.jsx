import { createContext } from "react";

export const CartContext = createContext({
  items: [],
  // not necessary, it's convenient for auto-completion when using useContext and destructuring
  addItemToCart: () => {},
  updateItemQuantity: () => {},
});
