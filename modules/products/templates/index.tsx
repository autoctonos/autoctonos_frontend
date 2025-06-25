import ProductImages from "../components/product-images";
import ProductDescription from "../components/product-description";
import ProductActions from "../components/product-actions";

export default function ProductTemplate({ product }: { product: any }) {
  return (
    <section className="flex flex-col m-5 sm:container sm:mx-auto px-4 py-6 border border-gray-500 rounded-3xl gap-5">
      <h1 className="text-2xl font-bold">{product.nombre}</h1>
      <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
        <div className="flex w-11/12 sm:w-4/6">
          {product.imagenes?.length > 0 && (
            <ProductImages
              images={product.imagenes}
              productName={product.nombre}
            />
          )}
        </div>
        <div className="flex flex-col h-auto w-10/12 sm:w-2/6 gap-5">
          <ProductActions
            price={product.precio}
            stock={product.stock}
            productId={product.id_producto}
            productName={product.nombre}
          />
          <ProductDescription description={product.descripcion} />
        </div>
      </div>
    </section>
  );
}
