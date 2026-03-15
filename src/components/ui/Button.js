/**
 * Button – reusable primary/secondary button
 */

export default function Button({ children, variant = "primary", className = "", ...props }) {
  const base = "inline-flex items-center justify-center rounded-lg px-4 py-2 font-medium transition-colors";
  const variants = {
    primary: "bg-black text-white hover:bg-fukrey-gray-800 dark:bg-white dark:text-black dark:hover:bg-fukrey-gray-200",
    secondary: "border border-fukrey-gray-300 dark:border-fukrey-gray-700 hover:bg-fukrey-gray-100 dark:hover:bg-fukrey-gray-800",
  };
  return (
    <button className={`${base} ${variants[variant] ?? variants.primary} ${className}`} {...props}>
      {children}
    </button>
  );
}
