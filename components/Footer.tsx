export default function Footer() {
  return (
    <footer className="border-t mt-10">
      <div className="max-w-6xl mx-auto px-4 py-6 text-xs md:text-sm text-gray-500 flex flex-col md:flex-row items-center justify-between">
        <p>© {new Date().getFullYear()} SnehAm VERSE PUBLICATIONS</p>
        <p className="text-gray-400 text-[11px]">
          A student-focused imprint under SNEHAMVERSE PRIVATE LIMITED
        </p>
      </div>
    </footer>
  );
}
