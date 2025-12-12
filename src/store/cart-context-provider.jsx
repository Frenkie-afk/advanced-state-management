import { useReducer } from "react";

import { CartContext } from "./cart-context.jsx";
import { DUMMY_PRODUCTS } from "../dummy-products.js";

const ACTIONS = {
  ADD_ITEM: "ADD_ITEM",
  UPDATE_ITEM: "UPDATE_ITEM",
};

function cartReducer(state, action) {
  if (action.type === ACTIONS.ADD_ITEM) {
    const updatedItems = [...state.items];
    const existingCartItemIndex = updatedItems.findIndex(
      (cartItem) => cartItem.id === action.payload,
    );
    const existingCartItem = updatedItems[existingCartItemIndex];

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      const product = DUMMY_PRODUCTS.find(
        (product) => product.id === action.payload,
      );
      updatedItems.push({
        id: action.payload,
        name: product.title,
        price: product.price,
        quantity: 1,
      });
    }

    return {
      ...state, // not needed here because we have only one property
      items: updatedItems,
    };
  }

  if (action.type === ACTIONS.UPDATE_ITEM) {
    const updatedItems = [...state.items];
    const updatedItemIndex = updatedItems.findIndex(
      (cartItem) => cartItem.id === action.payload.productId,
    );
    const updatedItem = {
      ...updatedItems[updatedItemIndex],
    };

    updatedItem.quantity += action.payload.amount;

    if (updatedItem.quantity <= 0) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      updatedItems[updatedItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
    };
  }

  return state;
}

function CartContextProvider({ children }) {
  const [cartState, cartDispatch] = useReducer(cartReducer, {
    items: [],
  });

  function handleAddItemToCart(id) {
    cartDispatch({
      type: ACTIONS.ADD_ITEM,
      payload: id,
    });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    cartDispatch({
      type: ACTIONS.UPDATE_ITEM,
      payload: {
        productId,
        amount,
      },
    });
  }

  // console.log(shoppingCart);

  const ctxValue = {
    items: cartState.items,
    addItemToCart: handleAddItemToCart,
    updateItemQuantity: handleUpdateCartItemQuantity,
  };

  return <CartContext value={ctxValue}>{children}</CartContext>;
}

export default CartContextProvider;
