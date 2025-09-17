import { Navbar } from "@/components/navbar";
import ProductTemplate from "@/modules/products/templates";
import { getProductDetail } from "@/auth/services/server/product-detail";

type PageParams = { id: string };
type ProductPageProps = { params: Promise<PageParams> };

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const productId = id;

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
