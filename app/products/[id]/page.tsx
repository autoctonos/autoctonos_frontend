import { Navbar } from "@/components/navbar";
import ProductTemplate from "@/modules/products/templates";
import { getProductDetail } from "@/auth/services/server/product-detail";

export default async function ProductPage({ params }: { params: { id: string }}) {
  const { id } = await params;
  const productId = id;

  console.log("Product ID:", productId);

  const { success, data, message } = await getProductDetail(productId);

  if (!success) {
    return <p className="text-red-500">Error: {message}</p>;
  }

  return (
    <section>
      <Navbar />
      <ProductTemplate product={data} />
    </section>
  );
}

