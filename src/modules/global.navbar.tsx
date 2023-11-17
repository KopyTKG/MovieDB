'use client';
import {
	Navbar,
	NavbarItem,
	NavbarContent,
	NavbarBrand,
	Link,
	NavbarMenu,
	NavbarMenuItem,
	NavbarMenuToggle
} from '@nextui-org/react';
import { useState } from 'react';
import { Bars4Icon, FilmIcon, HomeIcon } from '@heroicons/react/24/outline';

export default function NavbarComponent() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	return (
		<Navbar className="w-full flex" onMenuOpenChange={setIsMenuOpen}>
			<NavbarContent>
				<NavbarBrand className="flex gap-2">
					<FilmIcon className="w-8" />
          The Movie Database
				</NavbarBrand>
			</NavbarContent>
			<NavbarContent className="hidden sm:flex gap-4" justify="center">
				<NavbarItem>
					<Link href="/collection" color="primary" className="flex gap-1">
						<Bars4Icon className="w-6" />
            Collection
					</Link>
				</NavbarItem>
				<NavbarItem>
					<Link href="/" color="primary" className="flex gap-1">
						<HomeIcon className="w-6" />
            Home
					</Link>
				</NavbarItem>
			</NavbarContent>
			<NavbarContent className="sm:hidden" justify="end">
				<NavbarMenuToggle
					aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
				/>
			</NavbarContent>
			<NavbarMenu className="w-full flex items-center bg-black/60 gap-5 z-50">
				<NavbarMenuItem>
					<Link href="/" color="primary" className="flex gap-1  text-xl">
						<HomeIcon className="w-10" />
            Home
					</Link>
				</NavbarMenuItem>
				<NavbarMenuItem>
					<Link href="/collection" color="primary" className="flex gap-1 text-xl">
						<Bars4Icon className="w-10" />
            Collection
					</Link>
				</NavbarMenuItem>
        
			</NavbarMenu>
		</Navbar>
	);
}
