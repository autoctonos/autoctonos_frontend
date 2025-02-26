"use server";

import MainLayout from "@/components/layout/main";
import { title, subtitle } from "@/components/primitives";
import ProductsList from "@/components/product-list";
import { getProductsImages } from "@/auth/services/products-image";

export default async function Home() {
  const { success, data, message } = await getProductsImages();

  
  if (!success) {
    return <p>Error: {message}</p>;
  }

  return (
    <MainLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-xl text-center justify-center">
          <span className={title()}>Compra y vende&nbsp;</span>
          <span className={title({ color: "green" })}>productos&nbsp;</span>
          <br />
          <span className={title()}>artesanales locales</span>
          <div className={subtitle({ class: "mt-4" })}>
            El marketplace donde la tradición y la calidad se encuentran
          </div>
        </div>
      </section>

      <span className={subtitle()}>Productos Destacados&nbsp;</span>

      <ProductsList products={data} />
    </MainLayout>
  );
}
