export default function CartButton({
  cart,
  setShowSummary,
  buildWhatsAppMessage
}) {

  return (
    <>
      {cart.length > 0 ? (
        <>
          <button
            onClick={() => setShowSummary(true)}
            className="bg-pink-500 text-white px-4 py-2 rounded-full"
          >
            🛒 {cart.length}
          </button>

          <a
            href={`https://wa.me/573017170457?text=${buildWhatsAppMessage()}`}
            className="bg-green-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition"
          >

            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
              alt="WhatsApp"
              className="w-7 h-7"
            />

          </a>
        </>
      ) : (

        <a
          href={`https://wa.me/573017170457?text=${buildWhatsAppMessage()}`}
          className="fixed bottom-4 right-4 z-50 bg-green-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition"
        >

          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            alt="WhatsApp"
            className="w-7 h-7"
          />

        </a>

      )}
    </>
  );

}