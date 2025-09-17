"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import MainLayout from "@/components/layout/main";
import FiltersSidebar, { Category } from "@/components/categories/filtersSidebar";
import ProductList from "@/components/product-list";
import { Spinner } from "@heroui/react";
import { useFetchData } from "@/auth/services/client/category";

type ProductLite = {
  id_producto?: number | string;
  nombre?: string;
  imageUrl?: string;
  precio?: number | string;
  id_categoria?: number | string | { id_categoria?: number | string; id?: number | string } | null;
};

type MaybeResultsArray<T> = T[] | { results: T[] };
type RouteParams = { id?: string };
type UseFetchDataReturn<T> = { data: T | null | undefined; isLoading: boolean };
type ProductForList = { id_producto: number; nombre: string; imageUrl?: string; precio?: number | string };

function isResultsWrapper<T>(v: unknown): v is { results: T[] } {
  return typeof v === "object" && v !== null && Array.isArray((v as { results?: unknown }).results);
}

export default function CategoryPage() {
  const params = useParams<RouteParams>();
  const router = useRouter();
  const categoryId = (params?.id as string) || "";

  const [page, setPage] = useState(1);

  const { data: categoriesResp, isLoading: loadingCategories } =
    (useFetchData("productos/categorias") as unknown) as UseFetchDataReturn<MaybeResultsArray<Category>>;

  const categories: Category[] = useMemo(() => {
    if (!categoriesResp) return [];
    if (Array.isArray(categoriesResp)) return categoriesResp as Category[];
    if (isResultsWrapper<Category>(categoriesResp)) return categoriesResp.results;
    return [];
  }, [categoriesResp]);

  useEffect(() => {
    if (!loadingCategories && !categoryId && categories.length > 0) {
      router.replace(`/categories/${categories[0].id_categoria}`);
    }
  }, [loadingCategories, categoryId, categories, router]);

  const selectedCatId = String(categoryId || "");
  const shouldFetchProducts = Boolean(selectedCatId);

  const productsEndpoint = (shouldFetchProducts ? "productos/productos" : null) as unknown as string;

  const { data: productsResp, isLoading: loadingProducts } =
    (useFetchData(
      productsEndpoint,
      shouldFetchProducts
        ? {
            page,
            id_categoria: /^\d+$/.test(selectedCatId) ? Number(selectedCatId) : selectedCatId,
          }
        : undefined
    ) as unknown) as UseFetchDataReturn<MaybeResultsArray<ProductLite>>;

  const serverProducts: ProductLite[] = useMemo(() => {
    if (!productsResp) return [];
    if (Array.isArray(productsResp)) return productsResp as ProductLite[];
    if (isResultsWrapper<ProductLite>(productsResp)) return productsResp.results;
    return [];
  }, [productsResp]);

  const productsOnlySelectedCategory = useMemo(() => {
    return serverProducts.filter((p: ProductLite) => {
      const cat = p?.id_categoria;
      let pid: string;
      if (typeof cat === "object" && cat !== null) {
        const c = cat as { id_categoria?: number | string; id?: number | string };
        pid = String(c.id_categoria ?? c.id ?? "");
      } else {
        pid = String(cat ?? "");
      }
      return pid === selectedCatId;
    });
  }, [serverProducts, selectedCatId]);

  const productsForList = productsOnlySelectedCategory as unknown as ProductForList[];

  const handleCategoryChange = (catId: string) => {
    if (catId === categoryId) return;
    setPage(1);
    router.push(`/categories/${catId}`);
  };

  return (
    <MainLayout>
      <div className="flex gap-6 p-6 max-w-screen overflow-x-hidden box-border">
        <FiltersSidebar
          categories={categories}
          categoryId={categoryId}
          onCategoryChange={handleCategoryChange}
          isLoadingCategories={loadingCategories}
        />
        <div className="flex-1">
          {(!selectedCatId || loadingProducts) ? (
            <div className="flex items-center gap-3 text-custom-medium-green">
              <Spinner size="sm" /> <span>Cargando productos...</span>
            </div>
          ) : (
            <ProductList products={productsForList} />
          )}
        </div>
      </div>
    </MainLayout>
  );
}
