import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarBrand
}
  from "@heroui/navbar";
import NextLink from "next/link";

import {
  Logo
} from "@/components/icons";

export const NavbarPayments = () => {

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/4 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">Autóctonos</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>
    </HeroUINavbar>
  );
};