export default function ProductPrice({ price }: { price: number }) {
  return <p className="text-lg font-semibold mt-2">${price}</p>;
}
