import React, { useState } from "react";
import {
  ArrowLeft,
  Lock,
  Bell,
  Trash2,
  LogOut,
  ChevronRight,
} from "lucide-react";

// --- MOCK DATA FOR BACKEND DEVELOPER REFERENCE ---
// The backend should return data in this structure
const MOCK_USER_DATA = {
  // User Identity Information
  firstName: "Alex",
  lastName: "Johnson",
  email: "alex.johnson@mans.edu.eg",
  studentId: "STU-2024-00123",

  // User Preferences / Settings State
  settings: {
    pushNotifications: true,
    emailNotifications: true,
    rideReminders: false,
  },
};

/**
 * ToggleSwitch Component
 * Custom styled toggle to match the specific orange/gray design
 */
const ToggleSwitch = ({ enabled, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
        enabled ? "bg-[#FF5500]" : "bg-gray-200"
      }`}>
      <span
        className={`${
          enabled ? "translate-x-6" : "translate-x-1"
        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm`}
      />
    </button>
  );
};

/**
 * SettingsItem Component
 * Handles rendering of list items with icons, text, and action elements
 */
const SettingsItem = ({
  icon: Icon,
  title,
  subtitle,
  action,
  isDanger = false,
  isLast = false,
}) => {
  return (
    <div
      className={`flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors cursor-pointer ${
        !isLast ? "border-b border-gray-100" : ""
      }`}>
      <div className="flex items-center gap-4">
        {/* Icon Container with specific styling for Danger/Normal states */}
        <div
          className={`p-2.5 rounded-xl ${
            isDanger ? "bg-red-50 text-red-500" : "bg-gray-100 text-gray-600"
          }`}>
          <Icon size={20} strokeWidth={2} />
        </div>

        {/* Text Content */}
        <div className="flex flex-col">
          <span
            className={`text-sm font-semibold ${
              isDanger ? "text-red-500" : "text-gray-900"
            }`}>
            {title}
          </span>
          {subtitle && (
            <span className="text-xs text-gray-500 mt-0.5">{subtitle}</span>
          )}
        </div>
      </div>

      {/* Action Area (Chevron or Toggle) */}
      <div>{action}</div>
    </div>
  );
};

export default function ProfileScreen() {
  // --- DATA LOADING SIMULATION ---
  const user = MOCK_USER_DATA;

  // --- LOCAL STATE MANAGED BY FRONTEND ---
  // In a real app, toggling these would trigger an API call to update the backend
  const [pushEnabled, setPushEnabled] = useState(
    user.settings.pushNotifications
  );
  const [emailEnabled, setEmailEnabled] = useState(
    user.settings.emailNotifications
  );
  const [remindersEnabled, setRemindersEnabled] = useState(
    user.settings.rideReminders
  );

  // --- HANDLERS ---
  const handleGoBack = () => console.log("Back navigation triggered");
  const handleSignOut = () => console.log("Sign out triggered");

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans pb-10">
      {/* --- HEADER SECTION --- */}
      {/* Deep orange background with specific curvature */}
      {/* Increased padding-bottom (pb-40) to give more room for the overlap */}
      <div className="bg-[#FF5500] pb-40 pt-8 px-6 relative">
        <div className="flex items-center text-white mb-6">
          <button
            onClick={handleGoBack}
            className="p-2 -ml-2 hover:bg-white/10 rounded-full transition">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-medium ml-2">Profile</h1>
        </div>
      </div>

      {/* --- CONTENT CONTAINER --- */}
      {/* -mt-32 pulls the container UP significantly. */}
      {/* relative z-10 ensures this container sits ON TOP of the orange header layer. */}
      <div className="px-4 -mt-32 relative z-10 space-y-6 max-w-2xl mx-auto">
        {/* 1. User Info Card */}
        {/* Added min-height, adjusted padding and border to match screenshot exactly */}
        <div className="bg-white rounded-2xl shadow-sm px-6 py-8 border border-gray-100 flex flex-col justify-center min-h-[120px]">
          <h2 className="text-lg font-bold text-gray-900 mb-1">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-sm text-gray-500 font-medium">{user.email}</p>
          <p className="text-xs text-gray-400 mt-2 font-medium tracking-wide">
            {user.studentId}
          </p>
        </div>

        {/* 2. Account Settings Section */}
        <div>
          <h3 className="text-xs font-medium text-gray-500 mb-2 ml-1">
            Account Settings
          </h3>
          <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100/50">
            <SettingsItem
              icon={Lock}
              title="Change Password"
              subtitle="Update your password"
              action={<ChevronRight size={20} className="text-gray-400" />}
              isLast={true}
            />
          </div>
        </div>

        {/* 3. Notifications Section */}
        <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100/50">
          <SettingsItem
            icon={Bell}
            title="Push Notifications"
            subtitle="Receive alerts on your device"
            action={
              <ToggleSwitch
                enabled={pushEnabled}
                onToggle={() => setPushEnabled(!pushEnabled)}
              />
            }
          />
          <SettingsItem
            icon={Bell}
            title="Email Notifications"
            subtitle="Get updates via email"
            action={
              <ToggleSwitch
                enabled={emailEnabled}
                onToggle={() => setEmailEnabled(!emailEnabled)}
              />
            }
          />
          <SettingsItem
            icon={Bell}
            title="Ride Reminders"
            subtitle="Reminders for active rides"
            action={
              <ToggleSwitch
                enabled={remindersEnabled}
                onToggle={() => setRemindersEnabled(!remindersEnabled)}
              />
            }
            isLast={true}
          />
        </div>

        {/* 4. Danger Zone Section */}
        <div>
          <h3 className="text-xs font-medium text-gray-500 mb-2 ml-1">
            Danger Zone
          </h3>
          <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100/50">
            <SettingsItem
              icon={Trash2}
              title="Delete Account"
              subtitle="Permanently remove your account"
              isDanger={true}
              action={<ChevronRight size={20} className="text-gray-300" />}
              isLast={true}
            />
          </div>
        </div>

        {/* 5. Sign Out Button */}
        <button
          onClick={handleSignOut}
          className="w-full bg-white text-gray-900 font-medium py-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-center gap-2 hover:bg-gray-50 active:scale-[0.99] transition-all">
          <LogOut size={18} />
          <span className="text-sm">Sign Out</span>
        </button>
      </div>
    </div>
  );
}
