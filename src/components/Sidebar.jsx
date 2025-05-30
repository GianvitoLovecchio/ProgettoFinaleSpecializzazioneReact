import GenresDropdown from "./GenresDropdown";

export default function Sidebar() {
  return (
    <aside className="w-auto h-full overflow-y-auto px-4 no-scrollbar">
      <nav className="flex flex-col py-4 gap-4">
        <GenresDropdown/>
        <a href="#" className="text-blue-600 font-bold text-2xl p-1 hover:underline">Settings</a>
        <a href="#" className="text-blue-600 font-bold text-2xl p-1 hover:underline">Profile</a>
        <a href="#" className="text-blue-600 font-bold text-2xl p-1 hover:underline">Logout</a>
      </nav>
    </aside>
  );
}
