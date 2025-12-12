import { createPortal } from "react-dom";
import { useImperativeHandle, useRef } from "react";
import Cart from "./Cart.jsx";

function CartModal({ title, actions, ref }) {
  const dialog = useRef(null);

  useImperativeHandle(ref, () => ({
    open() {
      dialog.current.showModal();
    },
  }));

  return createPortal(
    <dialog id="modal" ref={dialog}>
      {title && <h2>{title}</h2>}

      <Cart />

      <form method="dialog" id="modal-actions">
        {actions}
      </form>
    </dialog>,
    document.getElementById("modal"),
  );
}

export default CartModal;
