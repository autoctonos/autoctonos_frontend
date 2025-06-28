export default function SideBarPayments() {

    return (
        <main className="flex justify-center p-4">
            <div className="flex flex-col h-auto w-full max-w-[400px] gap-5">

                <div className="flex flex-col items-start justify-center border rounded-3xl gap-3 p-5 shadow-md bg-white w-full">
                    <h1 className="text-lg font-semibold">Resumen de tú compra</h1>

                    <div className="flex flex-row w-full justify-between">
                        <p className="text-lg font-semibold">Producto</p>
                        <p className="text-lg font-semibold">${}</p>
                    </div>

                    <div className="flex flex-row w-full justify-between">
                        <p className="text-lg font-semibold">Envío</p>
                        <p className="text-lg font-semibold">${}</p>
                    </div>
                </div>

                <section className="flex flex-row p-5 border rounded-3xl shadow-md bg-white gap-20">
                    <div className="w-1/2">
                        <p className="font-bold">Total</p>
                    </div>

                    <div className="w-1/2">
                        <p className="text-gray-600">${}</p>
                    </div>

                </section>
            </div>
        </main>
    )
}