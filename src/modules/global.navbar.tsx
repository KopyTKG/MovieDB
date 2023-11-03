import {
  Navbar,
  NavbarItem,
  NavbarContent,
  NavbarBrand,
  Link,
} from "@nextui-org/react";
import { FilmIcon, HomeIcon } from "@heroicons/react/24/outline";

export default function NavbarComponent() {
  return (
    <Navbar className="w-full flex">
      <NavbarContent>
        <NavbarBrand className="flex gap-2">
          <FilmIcon className="w-8" />
          The Movie Database
        </NavbarBrand>
        <NavbarItem>
          <Link href="/" color="primary" className="flex gap-1">
            <HomeIcon className="w-6" />
            Home
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
