import { Link, NavLink } from "react-router-dom";
import {
  HiBell,
  HiShoppingBag,
  HiMiniUser,
  HiHeart,
  HiArrowRightOnRectangle,
  HiMagnifyingGlass,
} from "react-icons/hi2";

import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import Button from "./Button";
import DropDown from "./DropDown";
import Input from "./Input";

export default function NavBar() {
  const notificationCount = 2;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/auctions", label: "Auctions" },
    { href: "/categories", label: "Categories" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/about", label: "About" },
  ];

  const isLoggedIn = true;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur transition-shadow  shadow-sm">
      <div className="container flex h-16 items-center px-4 sm:px-6">
        <Link to="/" className="mr-4 flex items-center space-x-2">
          <HiShoppingBag className="h-6 w-6" />
          <span className="hidden font-bold sm:inline-block">AuctionHub</span>
        </Link>

        <nav className="hidden md:flex md:flex-1 md:items-center md:gap-6 md:text-sm">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              className={({ isActive }) =>
                `font-medium transition-colors hover:text-primary ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden flex-1 md:flex md:justify-center md:px-4">
          <div className="relative w-full max-w-sm">
            <HiMagnifyingGlass className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for items..."
              className="w-full bg-background pl-8 pr-4"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <>
              <Button variant="ghost">
                <Link to="/notifications" className="relative">
                  <HiBell className="h-5 w-5" />
                  {notificationCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
                      {notificationCount}
                    </span>
                  )}
                  <span className="sr-only">Notifications</span>
                </Link>
              </Button>

              <DropDown>
                <DropDown.Trigger>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src="https://placehold.co/600x400/000000/FFF"
                        alt="User"
                      />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropDown.Trigger>
                <DropDown.Window className="w-56">
                  <DropDown.Item>My Account</DropDown.Item>

                  <DropDown.Item>
                    <Link to="/dashboard">
                      <HiMiniUser className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropDown.Item>
                  <DropDown.Item asChild>
                    <Link to="/favorites">
                      <HiHeart className="mr-2 h-4 w-4" />
                      <span>Favorites</span>
                    </Link>
                  </DropDown.Item>
                  <DropDown.Item asChild>
                    <Link to="/dashboard?tab=won">
                      <HiShoppingBag className="mr-2 h-4 w-4" />
                      <span>Won Auctions</span>
                    </Link>
                  </DropDown.Item>

                  {/* <DropdownMenuSeparator /> */}
                  <DropDown.Item>
                    <HiArrowRightOnRectangle className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropDown.Item>
                </DropDown.Window>
              </DropDown>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/signin">Sign In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
