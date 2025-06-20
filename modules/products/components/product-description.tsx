export default function ProductDescription({
  description,
}: {
  description: string;
}) {
  return (
    <section className="flex flex-col p-5 border border-gray-500 rounded-3xl gap-2">
      <p className="font-bold">Descripción</p>
      <p className="text-gray-600">{description}</p>
    </section>
  );
}
