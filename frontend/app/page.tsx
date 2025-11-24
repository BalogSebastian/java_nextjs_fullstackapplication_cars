import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-slate-900 relative flex flex-col">
      {/* Betesszük a Navbart a tetejére */}
      <Navbar />

      {/* Háttérkép (Opcionális - ha van egy jó autós képed, tedd be a public mappába és cseréld le az url-t) */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>

      {/* Fő tartalom */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 max-w-7xl mx-auto text-white">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight mb-6">
            Építsd fel <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              álmaid autógyűjteményét.
            </span>
          </h1>

          <p className="text-slate-400 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl">
            Professzionális rendszer járműveid nyilvántartására. Kezeld a gyártókat, tulajdonosokat és a specifikációkat egyetlen, modern felületen.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/autok"
              className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-colors text-center"
            >
              Nézd meg a kollekciót
            </Link>
            <Link
              href="#"
              className="border-2 border-slate-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:border-white transition-colors text-center"
            >
              Tudj meg többet
            </Link>
          </div>
        </div>
      </div>

      {/* Logók a láblécben (Opcionális dekoráció) */}
      <div className="relative z-10 pb-8 px-8 md:px-16 lg:px-24 max-w-7xl mx-auto flex flex-wrap gap-8 items-center text-slate-500 font-bold text-xl uppercase">
        <span>Porsche</span>
        <span>BMW</span>
        <span>Mercedes-Benz</span>
        <span>Audi</span>
        <span>Ferrari</span>
      </div>
    </main>
  );
}