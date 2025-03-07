import ProductImages from "../components/product-images";
import ProductPrice from "../components/product-price";
import ProductDescription from "../components/product-description";
import ProductActions from "../components/product-actions";

export default function ProductTemplate({ product }: { product: any }) {
  return (
    <section className="flex flex-col container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold">{product.nombre}</h1>
      <div className="flex flex-grow">
        {product.imagenes?.length > 0 && (
          <ProductImages
            images={product.imagenes}
            productName={product.nombre}
          />
        )}
        <ProductActions price={product.precio} stock={product.stock} />
      </div>
      <ProductDescription description={product.descripcion} />
    </section>
  );
}
