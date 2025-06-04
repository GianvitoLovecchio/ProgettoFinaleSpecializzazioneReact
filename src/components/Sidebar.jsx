import GenresDropdown from "./GenresDropdown";

export default function Sidebar() {
  return (
    <aside className="w-1/5 h-[calc(100vh-64px)] overflow-y-auto sticky top-[64px] px-4 no-scrollbar">
      <nav className="flex flex-col py-4 gap-4">
        <GenresDropdown/>
      </nav>
    </aside>
  );
}
