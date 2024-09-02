"use client";
import { useState } from "react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

const initialCartItems: CartItem[] = [
  {
    id: 1,
    name: "Product 1",
    price: 50,
    quantity: 2,
    imageUrl: "/product1.jpg",
  },
  {
    id: 2,
    name: "Product 2",
    price: 75,
    quantity: 1,
    imageUrl: "/product2.jpg",
  },
];

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

  const updateQuantity = (id: number, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white w-full">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white p-6 rounded-lg shadow-lg mb-6"
              >
                <div className="flex items-center">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="ml-4">
                    <h2 className="text-lg font-semibold text-gray-800">
                      {item.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      ${item.price.toFixed(2)} each
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-l"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 bg-white border-t border-b border-gray-300 text-gray-800">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-r"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="ml-4 text-red-500 hover:text-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Order Summary
            </h2>
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between text-gray-700 mb-2">
                <p>Subtotal</p>
                <p>${total.toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-gray-700 mb-2">
                <p>Shipping</p>
                <p>$5.00</p>
              </div>
              <div className="flex justify-between text-gray-900 font-bold text-xl mt-4">
                <p>Total</p>
                <p>${(total + 5).toFixed(2)}</p>
              </div>
              <button className="mt-8 w-full bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition duration-150 ease-in-out">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-8">Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartPage;
