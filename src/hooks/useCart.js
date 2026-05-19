import { useState } from "react";

export function useCart() {
  const [cart, setCart] = useState([]);

  const normalize = (v) => v ?? null;

  const addToCart = (product, variantId = null) => {
    const vId = normalize(variantId);

    setCart((prev) => {
      const exists = prev.find(
        (p) => p.id === product.id && normalize(p.variantId) === vId
      );

      if (exists) {
        return prev.map((p) =>
          p.id === product.id && normalize(p.variantId) === vId
            ? { ...p, qty: p.qty + 1 }
            : p
        );
      }

      return [...prev, { ...product, variantId: vId, qty: 1 }];
    });
  };

  const removeFromCart = (productId, variantId) => {
    const vId = normalize(variantId);

    setCart((prev) =>
      prev.filter(
        (item) =>
          !(item.id === productId && normalize(item.variantId) === vId)
      )
    );
  };

  const decreaseQty = (productId, variantId) => {
    const vId = normalize(variantId);

    setCart((prev) => {
      const item = prev.find(
        (p) => p.id === productId && normalize(p.variantId) === vId
      );

      if (!item) return prev;

      if (item.qty === 1) {
        return prev.filter(
          (p) => !(p.id === productId && normalize(p.variantId) === vId)
        );
      }

      return prev.map((p) =>
        p.id === productId && normalize(p.variantId) === vId
          ? { ...p, qty: p.qty - 1 }
          : p
      );
    });
  };

  const getQty = (productId, variantId) => {
    const vId = normalize(variantId);

    const item = cart.find(
      (p) => p.id === productId && normalize(p.variantId) === vId
    );

    return item ? item.qty : 0;
  };

  const parsePrice = (price) =>
    Number(price?.toString().replace(/[^0-9]/g, "")) || 0;

  const total = cart.reduce(
    (acc, item) => acc + parsePrice(item.price) * item.qty,
    0
  );

  const formatTotal = (v) => "$" + v.toLocaleString("es-CO");

  const buildWhatsAppMessage = () => {
    if (cart.length === 0) return "Hola, quiero hacer un pedido";

    const items = cart
      .map((p, i) => {
        let text = `${i + 1}. ${p.name} x${p.qty} - ${p.price}`;
        if (p.variantId) text += ` (Tono ${p.variantId})`;
        return text;
      })
      .join("%0A");

    return `Hola, quiero este pedido:%0A${items}%0A%0ATotal: ${formatTotal(
      total
    )}`;
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    decreaseQty,
    getQty,
    total,
    formatTotal,
    buildWhatsAppMessage,
  };
}