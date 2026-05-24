export default function CartDrawer({
  showSummary,
  setShowSummary,
  cart,
  removeFromCart,
  formatTotal,
  total,
  checkoutData,
  setCheckoutData,
  buildWhatsAppMessage
}) {
  if (!showSummary) return null;

  const safeCart = Array.isArray(cart) ? cart : [];

  return (
    <div className="fixed inset-0 z-50 bg-black/40">
      <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl p-4 z-50">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h3 className="font-bold">Carrito</h3>

          <button onClick={() => setShowSummary(false)}>
            ✕
          </button>
        </div>

        {/* ITEMS */}
        <div className="mt-4 space-y-2">
          {safeCart.length === 0 ? (
            <p className="text-sm text-gray-400">
              Tu carrito está vacío
            </p>
          ) : (
            safeCart.map((c) => {
              const price = Number(c?.price?.toString().replace(/[^0-9]/g, "")) || 0;
              const qty = c?.qty || 0;

              return (
                <div
                  key={`${c?.id}-${c?.variantId ?? "no-variant"}`}
                  className="flex justify-between text-sm items-start"
                >

                  <div className="flex-1 pr-2">
                    <span>
                      {c?.name} x{qty}
                    </span>

                    {c?.variantId && (
                      <p className="text-xs text-gray-400">
                        Tono: {c.variantId}
                      </p>
                    )}
                  </div>

                  <div className="text-right">
                    <div className="text-xs text-gray-400">
                      {formatTotal(price)} c/u
                    </div>

                    <span className="font-semibold">
                      {formatTotal(price * qty)}
                    </span>
                  </div>

                  <button
                    onClick={() => removeFromCart(c.id, c.variantId)}
                    className="ml-2 w-6 h-6 rounded-full bg-red-100 text-red-500 flex items-center justify-center"
                  >
                    ×
                  </button>

                </div>
              );
            })
          )}
        </div>

        {/* TOTAL */}
        <p className="mt-4 font-bold">
          Total: {formatTotal(total)}
        </p>

{/* CHECKOUT */}

<div className="mt-4 space-y-3">

<input
placeholder="Nombre"

value={checkoutData.name}

onChange={(e)=>
setCheckoutData({
...checkoutData,
name:e.target.value
})
}

className="
w-full
border
rounded-lg
p-3
text-sm
"
/>

<input

placeholder="Número"

value={checkoutData.phone}

onChange={(e)=>
setCheckoutData({
...checkoutData,
phone:e.target.value
})
}

className="
w-full
border
rounded-lg
p-3
text-sm
"
/>

<input

placeholder="Dirección"

value={checkoutData.address}

onChange={(e)=>
setCheckoutData({
...checkoutData,
address:e.target.value
})
}

className="
w-full
border
rounded-lg
p-3
text-sm
"
/>

<select

value={checkoutData.payment}

onChange={(e)=>
setCheckoutData({
...checkoutData,
payment:e.target.value
})
}

className="
w-full
border
rounded-lg
p-3
text-sm
"

>

<option value="">
Método de pago
</option>

<option value="Transferencia">
Transferencia
</option>

<option value="Efectivo">
Efectivo
</option>

</select>

</div>

        {/* WHATSAPP */}
        <a
          href={`https://wa.me/573017170457?text=${encodeURIComponent(buildWhatsAppMessage())}`}
          className="block mt-4 bg-green-500 text-white text-center py-3 rounded-full"
        >
          Finalizar compra
        </a>

      </div>
    </div>
  );
}