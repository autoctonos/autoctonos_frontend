"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="es">
      <body>
        <div className="p-8 text-center">
          <h2 className="text-2xl font-semibold">Error inesperado</h2>
          <p className="mt-2 text-sm text-gray-500">{error.message}</p>
          <button
            onClick={() => reset()}
            className="mt-4 px-4 py-2 rounded bg-custom-dark-green text-custom-cream"
          >
            Reintentar
          </button>
        </div>
      </body>
    </html>
  );
}
