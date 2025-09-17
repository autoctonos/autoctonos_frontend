"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-semibold">Algo salió mal</h2>
      <p className="mt-2 text-sm text-gray-500">{error.message}</p>
      <button
        onClick={() => reset()}
        className="mt-4 px-4 py-2 rounded bg-custom-dark-green text-custom-cream"
      >
        Reintentar
      </button>
    </div>
  );
}
