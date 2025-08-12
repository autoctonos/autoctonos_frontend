"use client";

import { Card, CardHeader, CardBody, Checkbox, Input } from "@heroui/react";
import { useState, useMemo } from "react";

export default function FiltersSidebar({
  categories,
  categoryId,
  onCategoryChange,
  isLoadingCategories
}: any) {
  const [search, setSearch] = useState("");

  const filteredCategories = useMemo(() => {
    return categories.filter((cat: any) =>
      cat.nombre.toLowerCase().includes(search.toLowerCase())
    );
  }, [categories, search]);

  if (isLoadingCategories) {
    return (
      <Card className="w-64 p-4">
        <CardBody>Cargando categorías...</CardBody>
      </Card>
    );
  }

  return (
    <Card className="w-64 p-4 max-w-[16rem] box-border">
      <CardHeader>Filtros</CardHeader>
      <CardBody className="flex flex-col gap-6">
        <div>
          <Input
            placeholder="Categorías"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            classNames={{
              input: "placeholder:text-gray-500",
              inputWrapper:
                "hover:border-gray-400 transition-all duration-200"
            }}
            variant="bordered"
            isClearable
            size="sm"
          />
          <div className="flex flex-col gap-2 mt-2">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((cat: any) => (
                <Checkbox
                  key={cat.id_categoria}
                  isSelected={String(cat.id_categoria) === categoryId}
                  onChange={() => onCategoryChange(cat.id_categoria)}
                >
                  {cat.nombre}
                </Checkbox>
              ))
            ) : (
              <p className="text-sm text-gray-400">No se encontraron categorías</p>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
