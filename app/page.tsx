"use server";

import MainLayout from "@/components/layout/main";
import { title, subtitle } from "@/components/primitives";
import ProductsList from "@/components/product-list";
import { getProductsImages } from "@/auth/services/server/products-image";
import CategoryList from "@/components/category-list";
import { getCategory } from "@/auth/services/server/category";

export default async function Home() {
  const { success, data, message } = await getProductsImages();

  if (!success) {
    return <p>Error: {message}</p>;
  }

  const { success: succes_categories, data: categories, message: message_categories } = await getCategory();

  if (!succes_categories) {
    return <p>Error: {message_categories}</p>;
  }
  return (
    <MainLayout>
      <section className="flex flex-col items-center justify-center gap-5 py-8 md:py-10">
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
      <section className="container mx-auto px-4 py-6">
        <h2 className={subtitle({ class: "mb-4 text-xl font-semibold" })}>
          Productos Destacados
        </h2>
        <ProductsList products={data} />
      </section>

      <section className="container mx-auto px-4 py-6">
        <h2 className={subtitle({ class: "mb-4 text-xl font-semibold" })}>
          Categorías
        </h2>
        <CategoryList categories={categories}/>
      </section>
    </MainLayout>
  );
}

