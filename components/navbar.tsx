"use client"
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
import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { siteConfig } from "@/config/site";
import Image from "next/image";


import {
  HeartFilledIcon,
  SearchIcon,
} from "@/components/icons";
import Drop from "@/components/common/dropdown";
import ShopSiderBar from "@/components/common/shop-sidebar";

export const Navbar = () => {
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-custom-cream bg-opacity-60 w-full border-custom-medium-green",
        input: "text-sm text-custom-black",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block bg-custom-medium-green text-custom-cream" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Encuentra tu proxímo producto..."
      startContent={
        <SearchIcon className="text-base text-custom-medium-green pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <HeroUINavbar maxWidth="xl" position="sticky" className="bg-custom-cream bg-opacity-80 border-b border-custom-medium-green">
      <NavbarContent className="basis-1/4 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Image src="/logo.svg"
              alt="logo"
              height={70}
              width={70}
            />
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
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
        </ NavbarItem>

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
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
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