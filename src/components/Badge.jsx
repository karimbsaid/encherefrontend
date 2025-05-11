import React from "react";

export default function Badge({ children, variant, ...props }) {
  const varianatStyles = {
    success: "bg-green-200 text-green-600",
    warning: "bg-yellow-200 text-yellow-600",
    secondary: "bg-blue-200 text-blue-600",
  };
  return (
    <span
      className={`flex items-center justify-center gap-2 rounded-xl px-2 py-1 font-semibold  ${varianatStyles[variant]}`}
      {...props}
    >
      {children}
    </span>
  );
}
