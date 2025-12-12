import { useContext, useRef } from "react";

import logo from "/logo.png";
import { CartContext } from "../store/cart-context.jsx";
import CartModal from "./CartModal.jsx";

function Header() {
  const { items } = useContext(CartContext);
  const modal = useRef(null);

  const cartQuantity = items.length;
  let modalActions = <button>Close</button>;

  if (cartQuantity > 0) {
    modalActions = (
      <>
        <button>Close</button>
        <button>Checkout</button>
      </>
    );
  }

  return (
    <>
      <CartModal title="Your Cart" actions={modalActions} ref={modal} />

      <header id="main-header">
        <div id="main-title">
          <img src={logo} alt="Elegant model" />

          <h1>Elegant Context</h1>
        </div>

        <p>
          <button onClick={() => modal.current.open()}>
            Cart {cartQuantity ? cartQuantity : ""}
          </button>
        </p>
      </header>
    </>
  );
}

export default Header;
