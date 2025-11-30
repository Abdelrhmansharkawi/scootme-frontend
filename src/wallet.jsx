import React, { useState } from "react";
import {
  ArrowLeft,
  History,
  Wallet,
  Plus,
  ArrowUpRight,
  CreditCard,
  Trash2,
  Check,
} from "lucide-react";

// --- MOCK DATA FOR BACKEND DEVELOPER REFERENCE ---
// The backend should return data in this structure
const MOCK_WALLET_DATA = {
  balance: 1248.5,
  currency: "$",
  paymentMethods: [
    {
      id: "pm_1",
      type: "mastercard",
      providerName: "Mastercard",
      details: "**** **** **** 4242",
      expiry: "12/25",
      isDefault: true,
      email: null,
    },
    {
      id: "pm_2",
      type: "visa",
      providerName: "Visa",
      details: "**** **** **** 8888",
      expiry: "09/26",
      isDefault: false,
      email: null,
    },
    {
      id: "pm_3",
      type: "paypal",
      providerName: "PayPal",
      details: "john.doe@example.com",
      expiry: null,
      isDefault: false,
      email: "john.doe@example.com",
    },
  ],
};

/**
 * PaymentMethodCard Component
 * Renders a single payment method (Credit Card or PayPal)
 */
const PaymentMethodCard = ({ method, onRemove, onSetDefault }) => {
  return (
    <div className="border border-gray-100 rounded-2xl p-5 mb-4 last:mb-0 hover:shadow-sm transition-shadow bg-white">
      <div className="flex items-start gap-4">
        {/* Icon Placeholder - In a real app, use SVGs for Visa/Mastercard/Paypal */}
        <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center text-gray-500 shrink-0">
          <CreditCard size={20} />
        </div>

        <div className="flex-1">
          {/* Header: Name + Default Badge */}
          <div className="flex items-center gap-3 mb-1">
            <h3 className="font-semibold text-gray-900">
              {method.providerName}
            </h3>
            {method.isDefault && (
              <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">
                Default
              </span>
            )}
          </div>

          {/* Details (Number or Email) */}
          <p className="text-gray-500 text-sm font-medium mb-1">
            {method.email ? method.email : method.details}
          </p>

          {/* Expiry Date */}
          {method.expiry && (
            <p className="text-gray-400 text-xs mb-4">
              Expires {method.expiry}
            </p>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 mt-4">
            <button
              onClick={() => onRemove(method.id)}
              className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-medium text-orange-600 hover:bg-orange-50 transition-colors">
              Remove
            </button>

            {method.isDefault ? (
              <button className="px-5 py-2 bg-[#FF5500] text-white rounded-lg text-xs font-bold shadow-sm shadow-orange-200">
                Pay
              </button>
            ) : (
              <button
                onClick={() => onSetDefault(method.id)}
                className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                Set Default
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function WalletScreen() {
  // Use mock data
  const data = MOCK_WALLET_DATA;
  const [paymentMethods, setPaymentMethods] = useState(data.paymentMethods);

  // Handlers
  const handleRemove = (id) => {
    console.log("Removing method:", id);
    // In real app: API call -> setPaymentMethods
  };

  const handleSetDefault = (id) => {
    console.log("Setting default:", id);
    // In real app: API call -> setPaymentMethods
  };

  const handleGoBack = () => console.log("Back clicked");

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 p-6 md:p-8">
      {/* --- HEADER --- */}
      <div className="max-w-6xl mx-auto mb-8 flex items-start justify-between">
        <div className="flex items-start gap-4">
          <button
            onClick={handleGoBack}
            className="p-1 hover:bg-gray-100 rounded-full transition mt-1">
            <ArrowLeft size={28} className="text-black" />
          </button>
          <div>
            <h1 className="text-3xl font-medium text-gray-900 mb-1">
              Payments & Wallet
            </h1>
            <p className="text-gray-500 text-sm">
              Manage your payment methods, wallet balance, and transaction
              history
            </p>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full text-gray-900">
          <History size={24} />
        </button>
      </div>

      {/* --- MAIN CONTENT GRID --- */}
      {/* Changed to md:grid-cols-3 and added items-start for better desktop alignment */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* --- LEFT COL: WALLET BALANCE --- */}
        <div className="md:col-span-1">
          <div className="bg-[#FF5500] rounded-3xl p-8 text-white shadow-xl shadow-orange-200 relative overflow-hidden h-fit">
            {/* Label */}
            <div className="flex items-center gap-2 mb-4 opacity-90">
              <Wallet size={20} />
              <span className="text-sm font-medium">Wallet Balance</span>
            </div>

            {/* Balance Amount */}
            <div className="text-5xl font-medium mb-8 tracking-tight">
              {data.currency}
              {data.balance.toFixed(2)}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button className="flex-1 bg-white text-gray-900 py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                <ArrowUpRight size={18} />
                Withdraw
              </button>
              <button className="flex-1 bg-[#1A1A1A] text-white py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-black transition-colors">
                <Plus size={18} />
                Add
              </button>
            </div>

            {/* Background Decoration */}
            <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-white opacity-10 rounded-full blur-2xl pointer-events-none"></div>
          </div>
        </div>

        {/* --- RIGHT COL: PAYMENT METHODS --- */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
            {/* Section Header */}
            <div className="mb-6">
              <h2 className="text-xl font-medium text-gray-900">
                Payment Methods
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Manage your saved payment methods
              </p>
            </div>

            {/* Add Method Button */}
            <button className="w-full bg-[#FF5500] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 mb-8 hover:bg-orange-600 transition-colors shadow-lg shadow-orange-100">
              <Plus size={20} />
              Add Method
            </button>

            {/* Payment Methods List */}
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <PaymentMethodCard
                  key={method.id}
                  method={method}
                  onRemove={handleRemove}
                  onSetDefault={handleSetDefault}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
