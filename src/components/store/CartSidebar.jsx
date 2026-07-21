import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingCart, Trash2, CreditCard, Loader2 } from "lucide-react";

export default function CartSidebar({ open, onClose, cart, onUpdateQty, onRemove, onCheckout, checkingOut }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-900 z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-blue-600" />
                <span className="font-bold text-gray-900 dark:text-white text-lg">Your Cart</span>
                {itemCount > 0 && (
                  <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">{itemCount}</span>
                )}
              </div>
              <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            {/* HSA/FSA badge */}
            <div className="mx-5 mt-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl px-4 py-2 flex items-center gap-2">
              <span className="text-green-700 dark:text-green-400 text-xs font-semibold">✓ All items are HSA/FSA eligible</span>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-3">
                  <ShoppingCart className="w-12 h-12 opacity-30" />
                  <p className="text-sm">Your cart is empty</p>
                  <p className="text-xs">Add HSA/FSA eligible products to get started</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.product_id} className="flex gap-3 bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                    <img src={item.image} alt={item.product_name} className="w-16 h-16 object-cover rounded-lg flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white leading-snug line-clamp-2">{item.product_name}</p>
                      <p className="text-xs text-blue-600 dark:text-blue-400 mt-0.5">{item.category}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1.5">
                          <button onClick={() => onUpdateQty(item.product_id, item.quantity - 1)}
                            className="w-6 h-6 rounded-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center hover:bg-blue-50 transition-colors">
                            <Minus className="w-3 h-3 text-gray-600 dark:text-gray-300" />
                          </button>
                          <span className="text-sm font-bold text-gray-900 dark:text-white w-5 text-center">{item.quantity}</span>
                          <button onClick={() => onUpdateQty(item.product_id, item.quantity + 1)}
                            className="w-6 h-6 rounded-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center hover:bg-blue-50 transition-colors">
                            <Plus className="w-3 h-3 text-gray-600 dark:text-gray-300" />
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-gray-900 dark:text-white">${(item.price * item.quantity).toFixed(2)}</span>
                          <button onClick={() => onRemove(item.product_id)} className="w-6 h-6 flex items-center justify-center text-red-400 hover:text-red-600 transition-colors">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-5 border-t border-gray-200 dark:border-gray-700 space-y-3">
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>Subtotal ({itemCount} items)</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>HSA/FSA Eligible</span>
                  <span className="text-green-600 font-semibold">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-gray-900 dark:text-white text-base pt-1 border-t border-gray-200 dark:border-gray-700">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <button
                  onClick={onCheckout}
                  disabled={checkingOut}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  {checkingOut ? <Loader2 className="w-4 h-4 animate-spin" /> : <CreditCard className="w-4 h-4" />}
                  {checkingOut ? "Redirecting to Stripe…" : "Pay with HSA/FSA Card"}
                </button>
                <p className="text-center text-xs text-gray-400">Secured by Stripe · Test mode active</p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}