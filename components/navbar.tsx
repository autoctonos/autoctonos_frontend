"use client";
import { useState, useEffect } from "react";
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { siteConfig } from "@/config/site";
import Image from "next/image";
import { HeartFilledIcon, SearchIcon } from "@/components/icons";
import Drop from "@/components/common/dropdown";
import ShopSiderBar from "@/components/common/shop-sidebar";

type Imagen = { url_imagen: string };
type Producto = { id_producto: number; nombre: string; precio: number | string; imagenes?: Imagen[] };
type NavItem = { href: string; label: string };

export const Navbar = () => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Producto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim().length > 1) {
        setLoading(true);
        fetch(`http://localhost:8000/api/productos/productos-con-imagenes/`)
          .then((res) => res.json())
          .then((data) => {
            const arr = data as Producto[];
            const filtered = arr.filter((p) =>
              p.nombre.toLowerCase().includes(query.toLowerCase())
            );
            setResults(filtered);
          })
          .catch(() => {})
          .finally(() => setLoading(false));
      } else {
        setResults([]);
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const searchInput = (
    <div className="relative w-full lg:w-[400px]">
      <Input
        aria-label="Search"
        classNames={{
          inputWrapper:
            "bg-custom-cream bg-opacity-60 w-full border-custom-medium-green",
          input: "text-sm text-custom-black",
        }}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        labelPlacement="outside"
        placeholder="Encuentra tu próximo producto..."
        startContent={
          <SearchIcon className="text-base text-custom-medium-green pointer-events-none flex-shrink-0" />
        }
        type="search"
      />

      {query && results.length > 0 && (
        <ul className="absolute z-50 top-full left-0 w-full bg-white border border-gray-200 rounded-b-lg shadow-lg max-h-80 overflow-auto">
          {results.map((producto) => {
            const imageUrl =
              producto.imagenes && producto.imagenes.length > 0
                ? decodeURIComponent(
                    producto.imagenes[0].url_imagen.replace("/media/", "")
                  )
                : "/placeholder.png";

            return (
              <li
                key={producto.id_producto}
                className="flex items-center gap-3 p-2 hover:bg-gray-100 cursor-pointer text-sm"
              >
                <NextLink
                  href={`/producto/${producto.id_producto}`}
                  className="flex items-center gap-3 w-full"
                >
                  <Image
                    src={imageUrl}
                    alt={producto.nombre}
                    width={50}
                    height={50}
                    className="rounded object-cover flex-shrink-0"
                  />
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-800">
                      {producto.nombre}
                    </span>
                    <span className="text-gray-500 text-xs">
                      ${producto.precio}
                    </span>
                  </div>
                </NextLink>
              </li>
            );
          })}
        </ul>
      )}

      {loading && (
        <div className="absolute top-full left-0 w-full bg-white p-2 text-sm text-gray-500">
          Buscando...
        </div>
      )}
    </div>
  );

  return (
    <HeroUINavbar
      maxWidth="xl"
      position="sticky"
      className="bg-custom-cream bg-opacity-80 border-b border-custom-medium-green"
    >
      <NavbarContent className="basis-1/4 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Image src="/logo.svg" alt="logo" height={70} width={70} />
          </NextLink>
        </NavbarBrand>

        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {(siteConfig.navItems as NavItem[]).map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>

        <NavbarItem>
          <ul className="hidden lg:flex">
            <Drop title="Categorias" />
          </ul>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
        <NavbarItem className="hidden sm:flex gap-2">
          <NextLink href="/producers">
            <Button
              className="text-sm font-normal text-custom-cream bg-custom-dark-green hover:bg-custom-medium-green"
              startContent={<HeartFilledIcon className="text-custom-red" />}
              variant="flat"
            >
              Nuestros Productores
            </Button>
          </NextLink>
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          <ShopSiderBar />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <NavbarMenuToggle className="text-custom-dark-green" />
      </NavbarContent>

      <NavbarMenu className="bg-custom-cream bg-opacity-95">
        {searchInput}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {(siteConfig.navMenuItems as NavItem[]).map((item, index) => (
            <NavbarMenuItem key={`${item.href}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === (siteConfig.navMenuItems as NavItem[]).length - 1
                    ? "danger"
                    : "foreground"
                }
                href="#"
                size="lg"
                className="text-custom-dark-green hover:text-custom-medium-green"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
