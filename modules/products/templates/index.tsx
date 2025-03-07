import ProductImages from "../components/product-images";
import ProductDescription from "../components/product-description";
import ProductActions from "../components/product-actions";

export default function ProductTemplate({ product }: { product: any }) {
  return (
    <section className="flex flex-col container mx-auto px-4 py-6 w-4/6 border rounded-3xl gap-5">
      <h1 className="text-2xl font-bold">{product.nombre}</h1>
      <div className="flex gap-5">
        {product.imagenes?.length > 0 && (
          <ProductImages
            images={product.imagenes}
            productName={product.nombre}
          />
        )}
        <div className="flex flex-col h-auto w-2/6 gap-5">
          <ProductActions price={product.precio} stock={product.stock} productId={product.id} />
          <ProductDescription description={product.descripcion} />
        </div>
      </div>
    </section>
  );
}
