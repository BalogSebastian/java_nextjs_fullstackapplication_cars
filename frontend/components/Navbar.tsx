import Link from "next/link";

export default function Navbar() {
   return (
      <nav className="w-full absolute top-0 z-50 px-8 py-6 flex justify-between items-center text-white">
         {/* Bal oldal: Logó */}
         <div className="text-2xl font-bold flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                  <path d="M3.375 4.5C2.339 4.5 1.5 5.339 1.5 6.375V13.5c0 1.036.839 1.875 1.875 1.875h17.25c1.036 0 1.875-.839 1.875-1.875V6.375c0-1.036-.839-1.875-1.875-1.875H3.375zM2.25 18a.75.75 0 01.75-.75h18a.75.75 0 01.75.75v1.5c0 1.036-.839 1.875-1.875 1.875H3.375c-1.036 0-1.875-.839-1.875-1.875V18z" />
               </svg>
            </div>
            <span className="tracking-tight">AutoCollection</span>
         </div>

         {/* Közép: Menüpontok (csak a dizájn kedvéért, most még nem visznek sehova) */}
         <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-300">
            <Link href="/" className="hover:text-white transition-colors">Kezdőlap</Link>
            <Link href="#" className="hover:text-white transition-colors">Rólunk</Link>
            <Link href="#" className="hover:text-white transition-colors">Szolgáltatások</Link>
            <Link href="#" className="hover:text-white transition-colors">Blog</Link>
         </div>

         {/* Jobb oldal: A GOMB */}
         <Link
            href="/autok"
            className="border-2 border-slate-600 bg-transparent text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-blue-600 hover:border-transparent transition-all duration-300"
         >
            Belépés az alkalmazásba
         </Link>
      </nav>
   );
}