import React from "react";

export default function FormRow({ label, error, children }) {
  return (
    <div className="flex flex-col items-center gap-2 w-full px-8">
      {label && <label className="font-semibold tracking-wide">{label}</label>}
      {children}
      {error && <span className="text-red-600">{error}</span>}
    </div>
  );
}
