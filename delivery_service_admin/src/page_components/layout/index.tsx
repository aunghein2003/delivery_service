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
      <SidebarMenu className="w-1/5 invisible md:visible" />

      {/* Dashboard Section */}
      <div className="w-full md:w-[80%] md:ml-[20%] p-10 bg-sky-300">
        {children}
      </div>
    </div>
  );
}
