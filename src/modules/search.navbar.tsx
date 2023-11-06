import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Input, Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";

export default function SearchNavbar(props: any) {
  return (
    <Navbar className="w-full">
      <NavbarContent>
        <NavbarItem className="flex flex-row w-full">
          <Input
            className="w-full mx-[5rem]"
            placeholder="search"
            type="text"
            isClearable={true}
            startContent={<MagnifyingGlassIcon className="w-6" />}
            onChange={(e) => {
              window.scrollTo({
                top: 0,
                behavior: "instant",
              });
              props.setPage(0);
              props.setSearch(e.target.value);
            }}
            onClear={() => {
              window.scrollTo({
                top: 0,
                behavior: "instant",
              });
              props.setPage(0);
              props.setSearch("");
            }}
          />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
