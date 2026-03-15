/**
 * CartItem – single line item in the cart
 */

export default function CartItem({ item }) {
  return (
    <div className="flex items-center gap-4 py-3 border-b border-fukrey-gray-200 dark:border-fukrey-gray-800 last:border-0">
      <div className="h-16 w-16 rounded bg-fukrey-gray-200 dark:bg-fukrey-gray-800" />
      <div className="flex-1">
        <p className="font-medium">{item?.name ?? "Item"}</p>
        <p className="text-sm text-fukrey-gray-500">Qty: {item?.quantity ?? 1}</p>
      </div>
      <p className="font-medium">{item?.price ?? "—"}</p>
    </div>
  );
}
