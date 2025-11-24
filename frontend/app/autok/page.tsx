"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Auto {
   id?: number;
   tipus: string;
   gyartasiEv: number;
   uzemanyag: string;
   valto: string;
   loero: number;
   // Opcionális kapcsolatok (így nem omlik össze, ha null)
   gyarto?: { nev: string; orszag: string };
   tulajdonos?: { nev: string; telefon: string };
}

const uresAuto: Auto = {
   tipus: "",
   gyartasiEv: 2024,
   uzemanyag: "Benzin",
   valto: "Manuális",
   loero: 100,
   // Nem kell inicializálni a gyártót/tulajt, mert a formon úgysem szerkesztjük őket
};

export default function AutokPage() {
   const [autok, setAutok] = useState<Auto[]>([]);
   const [loading, setLoading] = useState(true);

   const [isModalOpen, setIsModalOpen] = useState(false);
   const [editingId, setEditingId] = useState<number | null>(null);
   const [formData, setFormData] = useState<Auto>(uresAuto);

   // ADATOK BETÖLTÉSE
   const fetchAutok = () => {
      fetch("http://localhost:8080/api/autok")
         .then((res) => res.json())
         .then((data) => {
            setAutok(data);
            setLoading(false);
         })
         .catch((err) => console.error(err));
   };

   useEffect(() => {
      fetchAutok();
   }, []);

   const handleDelete = async (id: number) => {
      if (!confirm("Biztosan törölni szeretnéd?")) return;
      try {
         await fetch(`http://localhost:8080/api/autok/${id}`, { method: "DELETE" });
         setAutok(autok.filter((auto) => auto.id !== id));
      } catch (error) {
         alert("Hiba történt!");
      }
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      const url = editingId
         ? `http://localhost:8080/api/autok/${editingId}`
         : "http://localhost:8080/api/autok";

      const method = editingId ? "PUT" : "POST";

      try {
         const response = await fetch(url, {
            method: method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
         });

         if (response.ok) {
            setIsModalOpen(false);
            fetchAutok();
         } else {
            alert("Hiba a mentés során!");
         }
      } catch (error) {
         console.error(error);
      }
   };

   const handleEditClick = (auto: Auto) => {
      // Itt a trükk: betöltjük a teljes objektumot (hogy a gyártó ID ne vesszen el),
      // de a form inputok csak a saját adatait fogják módosítani.
      setFormData(auto);
      setEditingId(auto.id || null);
      setIsModalOpen(true);
   };

   const handleAddClick = () => {
      setFormData(uresAuto);
      setEditingId(null);
      setIsModalOpen(true);
   };

   // Statisztika
   const osszLoero = autok.reduce((sum, auto) => sum + auto.loero, 0);

   return (
      <div className="min-h-screen bg-[#0B0F19] text-white font-sans selection:bg-blue-500 selection:text-white">

         {/* --- HEADER --- */}
         <nav className="fixed w-full z-50 top-0 bg-[#0B0F19]/80 backdrop-blur-md border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
               <Link href="/" className="flex items-center gap-3 group">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                     <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                  </div>
                  <span className="font-bold text-lg tracking-tight text-slate-200 group-hover:text-white transition-colors">Vissza</span>
               </Link>

               <button
                  onClick={handleAddClick}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-lg shadow-blue-600/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
               >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                  Új Jármű
               </button>
            </div>
         </nav>

         {/* --- FŐ TARTALOM --- */}
         <div className="pt-28 pb-12 px-6 max-w-7xl mx-auto">

            {/* Dashboard Statisztika */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
               <div className="bg-[#161B28] border border-white/5 p-6 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10"><svg className="w-24 h-24 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z" /></svg></div>
                  <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider">Flotta Méret</h3>
                  <p className="text-4xl font-black text-white mt-1">{autok.length} <span className="text-lg text-slate-500 font-normal">autó</span></p>
               </div>
               <div className="bg-[#161B28] border border-white/5 p-6 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10"><svg className="w-24 h-24 text-blue-500" fill="currentColor" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg></div>
                  <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider">Összesített Erő</h3>
                  <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mt-1">{osszLoero} <span className="text-lg text-slate-500 font-normal">LE</span></p>
               </div>
            </div>

            {/* Cím */}
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
               <span className="w-2 h-8 bg-blue-500 rounded-full"></span>
               Aktív Állomány
            </h2>

            {/* Betöltés / Lista */}
            {loading ? (
               <div className="flex justify-center py-20" data-testid="loading-spinner">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
               </div>
            ) : (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {autok.map((auto) => (
                     <div key={auto.id} className="group bg-[#161B28] rounded-2xl border border-white/5 overflow-hidden hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-300 relative">

                        {/* Akció Gombok */}
                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 translate-y-[-10px] group-hover:translate-y-0">
                           <button onClick={() => handleEditClick(auto)} className="bg-blue-600 p-2 rounded-lg text-white hover:bg-blue-500 transition-colors shadow-lg"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg></button>
                           <button onClick={() => handleDelete(auto.id!)} className="bg-red-500/20 border border-red-500/50 p-2 rounded-lg text-red-500 hover:bg-red-500 hover:text-white transition-colors shadow-lg"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
                        </div>

                        {/* Kártya Fejléc */}
                        <div className="p-6 pb-0">
                           <div className="flex justify-between items-start">
                              <div>
                                 {/* Biztonságos hozzáférés: ?. és || */}
                                 <p className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-1">{auto.gyarto?.nev || "Ismeretlen"}</p>
                                 <h3 className="text-white font-bold text-2xl tracking-tight">{auto.tipus}</h3>
                              </div>
                              <span className="bg-white/5 text-slate-300 text-xs font-bold px-3 py-1 rounded-full border border-white/10">
                                 {auto.gyartasiEv}
                              </span>
                           </div>
                        </div>

                        {/* Kártya Tartalom */}
                        <div className="p-6">
                           <div className="grid grid-cols-2 gap-3 mb-6">
                              <div className="bg-[#0B0F19] p-3 rounded-xl border border-white/5 flex items-center gap-3">
                                 <div className="text-slate-500"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg></div>
                                 <div>
                                    <p className="text-[10px] text-slate-500 uppercase font-bold">Erő</p>
                                    <p className="text-white font-bold text-sm">{auto.loero} LE</p>
                                 </div>
                              </div>
                              <div className="bg-[#0B0F19] p-3 rounded-xl border border-white/5 flex items-center gap-3">
                                 <div className="text-slate-500"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg></div>
                                 <div>
                                    <p className="text-[10px] text-slate-500 uppercase font-bold">Üzemanyag</p>
                                    <p className="text-white font-bold text-sm truncate">{auto.uzemanyag}</p>
                                 </div>
                              </div>
                           </div>

                           {/* Tulajdonos */}
                           <div className="border-t border-white/5 pt-4 flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center font-bold text-xs text-white border border-white/10">
                                 {auto.tulajdonos?.nev ? auto.tulajdonos.nev.charAt(0) : "?"}
                              </div>
                              <div>
                                 <p className="text-white text-sm font-medium">{auto.tulajdonos?.nev || "Nincs tulajdonos"}</p>
                                 <p className="text-slate-500 text-xs">{auto.tulajdonos?.telefon}</p>
                              </div>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            )}
         </div>

         {/* MODAL - Tiszta, világos form */}
         {isModalOpen && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
               <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                  <div className="bg-slate-50 px-6 py-4 flex justify-between items-center border-b border-slate-100">
                     <h3 className="text-slate-900 font-bold text-xl">
                        {editingId ? "Jármű Szerkesztése" : "Új Jármű"}
                     </h3>
                     <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-red-500 text-2xl transition-colors">&times;</button>
                  </div>

                  <form onSubmit={handleSubmit} className="p-6 space-y-5">

                     {/* CSAK AZ 5 FONTOS MEZŐ, FEKETE BETŰVEL */}
                     <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Típus</label>
                        <input
                           required
                           placeholder="Pl. Swift"
                           className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                           value={formData.tipus}
                           onChange={e => setFormData({ ...formData, tipus: e.target.value })}
                        />
                     </div>

                     <div className="grid grid-cols-2 gap-4">
                        <div>
                           <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Évjárat</label>
                           <input
                              required
                              type="number"
                              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                              value={formData.gyartasiEv}
                              onChange={e => setFormData({ ...formData, gyartasiEv: Number(e.target.value) })}
                           />
                        </div>
                        <div>
                           <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Lóerő</label>
                           <input
                              required
                              type="number"
                              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                              value={formData.loero}
                              onChange={e => setFormData({ ...formData, loero: Number(e.target.value) })}
                           />
                        </div>
                     </div>

                     <div className="grid grid-cols-2 gap-4">
                        <div>
                           <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Üzemanyag</label>
                           <select
                              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                              value={formData.uzemanyag}
                              onChange={e => setFormData({ ...formData, uzemanyag: e.target.value })}
                           >
                              <option>Benzin</option>
                              <option>Dízel</option>
                              <option>Elektromos</option>
                              <option>Hibrid</option>
                           </select>
                        </div>
                        <div>
                           <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Váltó</label>
                           <select
                              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                              value={formData.valto}
                              onChange={e => setFormData({ ...formData, valto: e.target.value })}
                           >
                              <option>Manuális</option>
                              <option>Automata</option>
                           </select>
                        </div>
                     </div>

                     <div className="pt-4 flex justify-end gap-3 border-t border-slate-100 mt-2">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-slate-600 hover:bg-slate-100 rounded-lg font-bold transition-colors">Mégse</button>
                        <button type="submit" className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all hover:scale-105 active:scale-95">Mentés</button>
                     </div>
                  </form>
               </div>
            </div>
         )}
      </div>
   );
}