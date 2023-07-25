import HamburgerMenu from "./hamburger-menu";
import SidebarMenu from "./sidebar-menu";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex w-full relative">
      {/* Sidebar Menu for small screen */}
      <HamburgerMenu />

      {/* Sidebar Menu for large screen */}
      <SidebarMenu className="w-1/5 hidden md:block" />

      {/* Dashboard Section */}
      <div className="w-full md:w-[80%] md:ml-[20%]">{children}</div>
    </div>
  );
}
