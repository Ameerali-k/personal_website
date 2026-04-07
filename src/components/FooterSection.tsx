"use client";

export function FooterSection() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full bg-[#111620] text-white py-16 md:py-24 px-6 md:px-12 relative border-t border-white/5 overflow-hidden">
      <div className="max-w-[1400px] mx-auto flex flex-col justify-between" style={{ minHeight: "45vh" }}>

        {/* Top: Contacts & Menus */}
        <div className="flex flex-col md:flex-row justify-between items-start w-full mb-20 gap-16 md:gap-10">

          <div className="flex flex-col md:flex-row gap-6 md:gap-12">
            <div className="flex flex-col gap-4">
              <div className="mb-4">
                <img src="/logo.png" alt="Ameerali Logo" className="h-10 w-auto object-contain" />
              </div>
              <a href="mailto:ameeralikprm@gmail.com" className="inline-flex items-center justify-center px-8 py-4 rounded-[30px] border border-gray-600/50 text-xl md:text-2xl font-medium hover:border-[#00ff00] hover:text-[#00ff00] transition-colors w-fit" style={{ fontFamily: "'Outfit', sans-serif" }}>
                ameeralikprm@gmail.com
              </a>
              <div className="flex flex-col md:flex-row gap-4">
                <a href="tel:+971562428556" className="inline-flex items-center justify-center px-8 py-4 rounded-[30px] border border-gray-600/50 text-xl md:text-xl font-medium hover:border-[#00ff00] hover:text-[#00ff00] transition-colors w-fit" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  +971 56 242 8556
                </a>
                <a href="tel:+918089297628" className="inline-flex items-center justify-center px-8 py-4 rounded-[30px] border border-gray-600/50 text-xl md:text-xl font-medium hover:border-[#00ff00] hover:text-[#00ff00] transition-colors w-fit" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  +91 808 929 7628
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end gap-3 md:text-right">
            <a href="/#services" className="text-[1.7rem] md:text-[2.2rem] font-medium text-white hover:text-[#00ff00] transition-colors" style={{ fontFamily: "'Outfit', sans-serif" }}>Services</a>
            <a href="/#projects" className="text-[1.7rem] md:text-[2.2rem] font-medium text-white hover:text-[#00ff00] transition-colors" style={{ fontFamily: "'Outfit', sans-serif" }}>Projects</a>
            <a href="/#contact" className="text-[1.7rem] md:text-[2.2rem] font-medium text-white hover:text-[#00ff00] transition-colors" style={{ fontFamily: "'Outfit', sans-serif" }}>Contact</a>
          </div>
        </div>

        {/* Bottom: Copy & Socials */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-8">

          <div className="flex items-center gap-6">
            <a href="#" className="text-sm font-medium text-white hover:text-[#00ff00] transition-colors" style={{ fontFamily: "'Outfit', sans-serif" }}>Privacy Policy</a>
            <span className="text-sm text-gray-500 font-medium" style={{ fontFamily: "'Outfit', sans-serif" }}>{currentYear}, Ameerali</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a href="https://www.instagram.com/ameeer.alii?igsh=MWF2NnV3NGg3ZHloZw==" target="_blank" rel="noreferrer" className="w-[50px] h-[50px] rounded-full bg-[#1c222e] flex items-center justify-center hover:bg-[#00ff00] hover:text-black transition-all">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
            </a>
            <a href="https://www.linkedin.com/in/ameerali-k-860973163" target="_blank" rel="noreferrer" className="w-[50px] h-[50px] rounded-full bg-[#1c222e] flex items-center justify-center hover:bg-[#00ff00] hover:text-black transition-all">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
            </a>
            <a href="https://www.behance.net/ameerali19" target="_blank" rel="noreferrer" className="w-[50px] h-[50px] rounded-full bg-[#1c222e] flex items-center justify-center hover:bg-[#00ff00] hover:text-black transition-all">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.546-1.136-2.219-2.477-2.219-1.466 0-2.277.723-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h2.021c1.85 0 1.835-2.844.033-2.844h-2.054v2.844zm0 6.075h2.099c1.875 0 2.003-3.144.024-3.144h-2.123v3.144z" /></svg>
            </a>
            <a href="https://www.fiverr.com/ameerali263" target="_blank" rel="noreferrer" className="w-[50px] h-[50px] rounded-full bg-[#1c222e] flex items-center justify-center hover:bg-[#00ff00] hover:text-black transition-all font-bold text-[22px]" style={{ fontFamily: "'Outfit', sans-serif" }}>
              fi
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}
