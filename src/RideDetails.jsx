import React from "react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Timer,
  Zap,
  Battery,
  DollarSign,
  Download,
  MapPin,
} from "lucide-react";

// --- MOCK DATA FOR BACKEND DEVELOPER REFERENCE ---
// The backend should return data in this structure
const MOCK_RIDE_DATA = {
  status: "Completed Ride",
  paymentStatus: "Paid",
  date: "November 1, 2025",
  timeRange: "2:45 PM - 3:02 PM",
  distance: "3.2 km",
  duration: "17 min",
  avgSpeed: "11.3 km/h",
  batteryUsed: "8%",
  totalCost: "$2.80",
  startLocation: "Baroon Gate",
  endLocation: "Faculty of Engineering Gate",
  scooter: {
    id: "SC-4728",
    model: "Urban Glide Pro",
    batteryLevel: "84%",
  },
  breakdown: {
    baseFare: "$1.00",
    distanceFare: "$1.60",
    timeFare: "$0.20",
  },
};

/**
 * StatCard Component
 */
const StatCard = ({ icon: Icon, label, value }) => (
  <div className="bg-[#FFF8F3] p-5 rounded-xl flex flex-col gap-1 min-w-[140px]">
    <div className="flex items-center gap-2 mb-1">
      <Icon size={16} className="text-orange-500" strokeWidth={2.5} />
      <span className="text-xs font-semibold text-gray-500">{label}</span>
    </div>
    <span className="text-lg font-bold text-gray-900">{value}</span>
  </div>
);

/**
 * BreakdownRow Component
 */
const BreakdownRow = ({ label, value, isTotal = false }) => (
  <div
    className={`flex justify-between items-center py-2 ${
      isTotal ? "mt-2 pt-4 border-t border-gray-100" : ""
    }`}>
    <span
      className={`${
        isTotal ? "text-base font-bold text-gray-900" : "text-sm text-gray-500"
      }`}>
      {label}
    </span>
    <span
      className={`${
        isTotal
          ? "text-lg font-bold text-orange-600"
          : "text-sm font-medium text-gray-900"
      }`}>
      {value}
    </span>
  </div>
);

export default function RideDetailsScreen() {
  const handleGoBack = () => console.log("Back clicked");

  // In a real app, this data would come from props or an API hook
  const data = MOCK_RIDE_DATA;

  return (
    <div className="min-h-screen bg-white md:bg-gray-50 font-sans text-gray-900">
      {/* --- HEADER --- */}
      <div className="bg-white px-6 py-5 flex items-center shadow-sm md:shadow-none mb-4 md:mb-0">
        <button
          onClick={handleGoBack}
          className="p-1 hover:bg-gray-100 rounded-full transition mr-4">
          <ArrowLeft size={24} className="text-gray-900" />
        </button>
        <h1 className="text-xl font-medium text-gray-900">Ride Details</h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-12">
        {/* Main Grid Layout: Triggers side-by-side on 'md' screens and up */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* --- LEFT COLUMN (Ride Info, Route, Stats) --- */}
          <div className="md:col-span-2 space-y-6">
            {/* 1. Orange Status Banner */}
            <div className="bg-[#FF5500] rounded-2xl p-6 text-white relative overflow-hidden shadow-sm">
              <div className="relative z-10 flex justify-between items-start">
                <div>
                  <h2 className="text-base font-medium mb-2 opacity-90">
                    {data.status}
                  </h2>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Calendar size={16} className="opacity-80" />
                      <span>{data.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Clock size={16} className="opacity-80" />
                      <span>{data.timeRange}</span>
                    </div>
                  </div>
                </div>
                <span className="bg-[#00C853] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {data.paymentStatus}
                </span>
              </div>
              {/* Subtle background decoration */}
              <div className="absolute right-0 top-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
            </div>

            {/* 2. Route Card */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="relative">
                {/* Connecting Line */}
                <div className="absolute left-[7px] top-3 bottom-8 w-[2px] bg-gray-200"></div>

                {/* Distance Label on Line */}
                <div className="absolute left-[16px] top-1/2 -translate-y-1/2">
                  <span className="text-xs text-gray-400 font-medium bg-white py-1">
                    {data.distance}
                  </span>
                </div>

                {/* FROM Section */}
                <div className="relative flex items-start mb-12">
                  <div className="relative z-10 mt-1.5 w-4 h-4 rounded-full bg-orange-500 ring-4 ring-white"></div>
                  <div className="ml-6">
                    <span className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">
                      From
                    </span>
                    <span className="text-lg font-semibold text-gray-900">
                      {data.startLocation}
                    </span>
                  </div>
                </div>

                {/* TO Section */}
                <div className="relative flex items-start">
                  <div className="relative z-10 mt-1 w-4 h-4 flex items-center justify-center bg-white">
                    <MapPin
                      size={20}
                      className="text-orange-500 fill-orange-500"
                    />
                  </div>
                  <div className="ml-6">
                    <span className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">
                      To
                    </span>
                    <span className="text-lg font-semibold text-gray-900">
                      {data.endLocation}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Stats Grid (Duration, Speed, Battery, Cost) */}
            <div className="grid grid-cols-2 gap-4">
              <StatCard icon={Timer} label="Duration" value={data.duration} />
              <StatCard icon={Zap} label="Avg Speed" value={data.avgSpeed} />
              <StatCard
                icon={Battery}
                label="Battery Used"
                value={data.batteryUsed}
              />
              <StatCard
                icon={DollarSign}
                label="Total Cost"
                value={data.totalCost}
              />
            </div>
          </div>

          {/* --- RIGHT COLUMN (Payment Breakdown & Info) --- */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              {/* Payment Section */}
              <div className="mb-8">
                <h3 className="text-sm font-bold text-gray-900 mb-4">
                  Payment Breakdown
                </h3>
                <div className="space-y-1">
                  <BreakdownRow
                    label="Base fare"
                    value={data.breakdown.baseFare}
                  />
                  <BreakdownRow
                    label={`Distance (${data.distance})`}
                    value={data.breakdown.distanceFare}
                  />
                  <BreakdownRow
                    label={`Time (${data.duration})`}
                    value={data.breakdown.timeFare}
                  />
                  <BreakdownRow label="Total" value={data.totalCost} isTotal />
                </div>
              </div>

              {/* Scooter Info Section */}
              <div className="mb-8">
                <h3 className="text-sm font-bold text-gray-900 mb-4">
                  Scooter Information
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Scooter ID</span>
                    <span className="text-gray-900 font-medium">
                      {data.scooter.id}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Model</span>
                    <span className="text-gray-900 font-medium">
                      {data.scooter.model}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Battery at End</span>
                    <span className="text-gray-900 font-medium">
                      {data.scooter.batteryLevel}
                    </span>
                  </div>
                </div>
              </div>

              {/* Button */}
              <button className="w-full bg-[#FF5500] hover:bg-orange-700 text-white font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2">
                <span className="text-sm">Download Receipt</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
