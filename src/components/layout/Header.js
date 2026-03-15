/**
 * Header – main site header (logo, nav, cart icon)
 * Export layout components from this folder.
 */

export default function Header() {
  return (
    <header className="border-b border-fukrey-gray-200 dark:border-fukrey-gray-800">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <span className="font-semibold">Fukrey</span>
        <nav>{/* Add navigation links */}</nav>
      </div>
    </header>
  );
}
