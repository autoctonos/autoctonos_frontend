import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@heroui/react";
import LogoutButton from "../auth/logoutButton";

export default function NavbarProductors() {
  return (
    <Navbar isBordered>
      <NavbarContent justify="center">
        <NavbarBrand>
          <Link href="/dashboard">
            <p className="hidden sm:block font-bold text-inherit">Autóctonos</p>
          </Link>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex">
          <NavbarItem>
            <Link color="foreground" href="/dashboard/solicitudes">
              Solicitudes
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/dashboard/vender">
              Vender producto
            </Link>
          </NavbarItem>
        </NavbarContent>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              name="Jason Hughes"
              size="md"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger">
              <LogoutButton />
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
