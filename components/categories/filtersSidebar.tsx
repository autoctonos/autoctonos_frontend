"use client";

import {useState, useMemo} from "react";
import {Accordion, AccordionItem} from "@heroui/react";
import {Checkbox, Input, Spinner} from "@heroui/react";
import {Search} from "lucide-react";

export type Category = { id_categoria: string | number; nombre: string };

type FiltersSidebarProps = {
  categories: Category[];
  categoryId?: string | number | null;
  onCategoryChange: (id: string) => void;
  isLoadingCategories?: boolean;
};

export default function FiltersSidebar({
  categories,
  categoryId,
  onCategoryChange,
  isLoadingCategories = false,
}: FiltersSidebarProps) {
  const [search, setSearch] = useState("");

  const filteredCategories = useMemo(() => {
    const q = search.toLowerCase().trim();
    return (categories ?? []).filter((cat) =>
      String(cat?.nombre ?? "").toLowerCase().includes(q)
    );
  }, [categories, search]);

  const CategoryList = (
    <div className="flex flex-col gap-3">
      {filteredCategories.length > 0 ? (
        filteredCategories.map((cat) => {
          const selected = String(cat.id_categoria) === String(categoryId ?? "");
          return (
            <Checkbox
              key={cat.id_categoria}
              isSelected={selected}
              onChange={() => onCategoryChange(String(cat.id_categoria))}
              color={selected ? "success" : "default"}
              classNames={{
                label: "text-sm text-custom-black",
                base: "hover:bg-custom-light-green/20 rounded-md px-1 transition-colors",
              }}
            >
              {cat.nombre}
            </Checkbox>
          );
        })
      ) : (
        <p className="text-sm text-gray-400">No se encontraron categorías</p>
      )}
    </div>
  );

  if (isLoadingCategories) {
    return (
      <aside className="w-full md:w-64 flex flex-col gap-4 text-custom-black">
        <h2 className="text-lg font-semibold tracking-tight">Categorías</h2>
        <div className="flex justify-center items-center h-32">
          <Spinner size="lg" color="primary" />
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-full md:w-64 flex flex-col gap-4 text-custom-black">
      <h2 className="hidden md:block text-lg font-semibold tracking-tight">
        Categorías
      </h2>

      <Input
        placeholder="Buscar..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        startContent={<Search size={16} className="text-gray-500" />}
        variant="bordered"
        isClearable
        size="sm"
        className="w-full"
        classNames={{
          inputWrapper:
            "border-custom-medium-green focus-within:border-custom-dark-green",
        }}
      />

      {/* Desktop */}
      <div className="hidden md:flex flex-col gap-3">{CategoryList}</div>

      {/* Mobile */}
      <div className="md:hidden">
        <Accordion variant="splitted">
          <AccordionItem key="categories" aria-label="Categorías" title="Categorías">
            {CategoryList}
          </AccordionItem>
        </Accordion>
      </div>
    </aside>
  );
}
