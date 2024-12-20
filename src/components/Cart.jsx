import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeItems } from "../slice/CartSlice";
import { CDN_url } from "../utils/constants";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const user = useSelector((store) => store.user);
  const location = useSelector((store) => store.location);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [paymentStep, setPaymentStep] = useState("select"); // 'select', 'upi', 'card'

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleRemoveItem = () => {
    dispatch(removeItems());
  };

  const getTotal = () => {
    return cartItems.reduce(
      (total, item) =>
        total + (item.card.info.price || item.card.info.defaultPrice),
      0
    );
  };

  const handlePayment = () => {
    if (!location) {
      toast.error("Please add a delivery location");
      return;
    }
    setIsPaymentModalOpen(true);
  };

  const processUPIPayment = (upiId) => {
    setPaymentMethod("UPI");
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsPaymentModalOpen(false);
      setShowSuccess(true);
    }, 2000);
  };

  const processCardPayment = (cardData) => {
    setPaymentMethod("CARD");
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsPaymentModalOpen(false);
      setShowSuccess(true);
    }, 2000);
  };

  const processCODPayment = () => {
    setPaymentMethod("COD");
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsPaymentModalOpen(false);
      setShowSuccess(true);
    }, 1000);
  };

  const UPIForm = () => {
    const [upiId, setUpiId] = useState("");

    return (
      <div className="p-4">
        <h3 className="text-xl font-bold mb-4">UPI Payment</h3>
        <div className="flex items-center">
          <input
            type="text"
            className="w-full px-4 py-3 rounded-l-lg bg-transparent border focus:outline-none"
            placeholder="Enter UPI ID"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
          />
          <button
            className="px-6 py-3 bg-orange-500 text-white rounded-r-lg hover:bg-orange-600 transition-colors"
            onClick={() => processUPIPayment(upiId)}
          >
            Pay Now
          </button>
        </div>
      </div>
    );
  };

  const CardForm = () => {
    const [cardData, setCardData] = useState({
      number: "",
      name: "",
      expiry: "",
      cvv: "",
    });

    const handleChange = (e) => {
      setCardData({
        ...cardData,
        [e.target.name]: e.target.value,
      });
    };

    return (
      <div className="p-4">
        <h3 className="text-xl font-bold mb-4">Card Payment</h3>
        <div className="space-y-4">
          <input
            type="text"
            name="number"
            className="w-full px-4 py-3 rounded-lg bg-transparent border focus:outline-none"
            placeholder="Card Number"
            value={cardData.number}
            onChange={handleChange}
            maxLength="16"
          />

          <input
            type="text"
            name="name"
            className="w-full px-4 py-3 rounded-lg bg-transparent border focus:outline-none"
            placeholder="Card Holder Name"
            value={cardData.name}
            onChange={handleChange}
          />

          <div className="flex gap-4">
            <input
              type="text"
              name="expiry"
              className="w-full px-4 py-3 rounded-lg bg-transparent border focus:outline-none"
              placeholder="MM/YY"
              value={cardData.expiry}
              onChange={handleChange}
              maxLength="5"
            />

            <input
              type="text"
              name="cvv"
              className="w-full px-4 py-3 rounded-lg bg-transparent border focus:outline-none"
              placeholder="CVV"
              value={cardData.cvv}
              onChange={handleChange}
              maxLength="3"
            />
          </div>

          <button
            className="w-full px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            onClick={() => processCardPayment(cardData)}
          >
            Pay Now
          </button>
        </div>
      </div>
    );
  };

  const getPaymentModalContent = () => {
    switch (paymentStep) {
      case "upi":
        return <UPIForm />;
      case "card":
        return <CardForm />;
      default:
        return (
          <div className="space-y-4">
            <button
              onClick={() => setPaymentStep("upi")}
              className="w-full py-4 px-6 border rounded-lg hover:bg-gray-50 transition-colors flex items-center"
            >
              <div className="w-8 h-8 flex items-center justify-center bg-green-100 rounded-full mr-4">
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-gray-800">UPI</p>
                <p className="text-sm text-gray-500">Pay using UPI apps</p>
              </div>
            </button>
            <button
              onClick={() => setPaymentStep("card")}
              className="w-full py-4 px-6 border rounded-lg hover:bg-gray-50 transition-colors flex items-center"
            >
              <div className="w-8 h-8 flex items-center justify-center bg-blue-100 rounded-full mr-4">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-gray-800">Credit/Debit Card</p>
                <p className="text-sm text-gray-500">
                  Pay using any credit or debit card
                </p>
              </div>
            </button>
            <button
              onClick={processCODPayment}
              className="w-full py-4 px-6 border rounded-lg hover:bg-gray-50 transition-colors flex items-center"
            >
              <div className="w-8 h-8 flex items-center justify-center bg-orange-100 rounded-full mr-4">
                <svg
                  className="w-5 h-5 text-orange-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-gray-800">Cash on Delivery</p>
                <p className="text-sm text-gray-500">Pay at your doorstep</p>
              </div>
            </button>
          </div>
        );
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="w-64 h-64 mb-8">
          <img
            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0"
            alt="Empty Cart"
            className="w-full h-full object-contain"
          />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Your cart is empty
        </h2>
        <p className="text-gray-600 mb-6">
          Good food is always cooking! Go ahead, order some yummy items from the
          menu.
        </p>
        <a
          href="/"
          className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium"
        >
          Browse Restaurants
        </a>
      </div>
    );
  }

  const total = getTotal();
  const deliveryFee = 40;
  const platformFee = 3;
  const gst = Math.round(total * 0.05) / 100;
  const finalTotal = total / 100 + deliveryFee + platformFee + gst;

  const ProcessingModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
        <p className="text-lg text-gray-800">
          {paymentMethod === "UPI" && "Processing UPI Payment..."}
          {paymentMethod === "CARD" && "Processing Card Payment..."}
          {paymentMethod === "COD" && "Confirming Order..."}
        </p>
      </div>
    </div>
  );

  const SuccessModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg text-center max-w-md relative">
        <button
          onClick={() => {
            setShowSuccess(false);
          }}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {paymentMethod === "COD" ? "Order Placed!" : "Payment Successful!"}
        </h2>
        <div className="space-y-3 mb-6">
          <p className="text-gray-600">
            {paymentMethod === "COD"
              ? "Your order has been placed successfully. Please keep cash ready at delivery."
              : "Your payment has been processed successfully!"}
          </p>
          <p className="text-green-600 font-medium">
            Your order will be delivered to your doorstep soon!
          </p>
          <p className="text-sm text-gray-500">
            Estimated delivery time: 30-45 minutes
          </p>
        </div>
        <button
          onClick={() => {
            setShowSuccess(false);
            dispatch(clearCart());
            navigate("/");
          }}
          className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
        >
          Back to Home
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-6">
        <div className="md:w-8/12">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">
                Cart ({cartItems.length} items)
              </h1>
              <button
                className="text-red-500 hover:text-red-600 font-medium"
                onClick={handleClearCart}
              >
                Clear Cart
              </button>
            </div>

            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.card.info.id}
                  className="flex items-start border-b border-gray-100 last:border-0 pb-4 last:pb-0"
                >
                  {item.card.info.imageId && (
                    <img
                      src={CDN_url + item.card.info.imageId}
                      alt={item.card.info.name}
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                  )}
                  <div className="ml-4 flex-1">
                    <h3 className="font-medium text-gray-800">
                      {item.card.info.name}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                      ₹
                      {(item.card.info.price || item.card.info.defaultPrice) /
                        100}
                    </p>
                    <button
                      onClick={handleRemoveItem}
                      className="mt-2 text-red-500 text-sm hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="md:w-4/12">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Bill Details
            </h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Item Total</span>
                <span>₹{total / 100}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee</span>
                <span>₹{deliveryFee}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Platform Fee</span>
                <span>₹{platformFee}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>GST</span>
                <span>₹{gst}</span>
              </div>
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between font-bold text-gray-800">
                  <span>Total Amount</span>
                  <span>₹{finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handlePayment}
              className="w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition-colors"
            >
              PROCEED TO PAY ₹{finalTotal.toFixed(2)}
            </button>
          </div>
        </div>
      </div>

      {isPaymentModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold text-gray-800">
                {paymentStep === "select"
                  ? "Select Payment Method"
                  : paymentStep === "upi"
                  ? "UPI Payment"
                  : "Card Payment"}
              </h2>
              <button
                onClick={() => {
                  setIsPaymentModalOpen(false);
                  setPaymentStep("select");
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            {getPaymentModalContent()}
          </div>
        </div>
      )}

      {isProcessing && <ProcessingModal />}

      {showSuccess && <SuccessModal />}
    </div>
  );
};

export default Cart;
