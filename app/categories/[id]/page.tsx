"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { useFetchData } from "@/auth/services/client/category";

import FiltersSidebar from "@/components/categories/filtersSidebar";
import ProductList from "@/components/product-list"; 

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const categoryId = params?.id as string;

  const [filters, setFilters] = useState({
    brand: "",
    size: "",
    color: "",
    minPrice: 0,
    maxPrice: 300000,
  });
  const [page, setPage] = useState(1);

  const { data: productsData, isLoading: loadingProducts } = useFetchData(
    `productos/categorias/${categoryId}`,
    {
      page,
      ...filters,
    }
  );

  const { data: categoriesData, isLoading: loadingCategories } = useFetchData(
    `productos/categorias`
  );

  const products = productsData?.results ?? [];
  const categories = categoriesData ?? [];

  const handleCategoryChange = (catId: string) => {
    router.push(`/categories/${catId}`);
    setFilters({
      brand: "",
      size: "",
      color: "",
      minPrice: 0,
      maxPrice: 300000,
    });
    setPage(1);
  };

  return (
    <section>
      <Navbar />
      <div className="flex gap-6 p-6 max-w-screen overflow-x-hidden box-border">
        <FiltersSidebar
          categories={categories}
          categoryId={categoryId}
          selectedFilters={filters}
          onChange={(newFilters: any) => {
            setFilters(newFilters);
            setPage(1);
          }}
          onCategoryChange={handleCategoryChange}
          isLoadingCategories={loadingCategories}
        />
        <div className="flex-1">
          {loadingProducts ? (
            <p>Cargando productos...</p>
          ) : (
            <ProductList products={products} />
          )}
        </div>
      </div>
    </section>
  );
}
