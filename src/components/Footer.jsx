const Footer = () => {
  return (
    <footer className="border-t-2 border-black bg-primary px-8 py-8">
      {/* 4kolom */}
      <div className="grid grid-cols-4 gap-8">
        {/* kolom 1 */}
        <div>
          <h3 className="font-black text-sm uppercase mb-3">Layanan Kami</h3>
          <p className="text-sm">
            Pabrik Mie, Baso, dan Sosis Yen memiliki dua toko offline dan
            online, melayani kebutuhan sehari-hari maupun keperluan usaha.
          </p>
        </div>
        {/* kolom 2 */}
        <div>
          <h3 className="font-black text-sm uppercase mb-3">Kontak Kami</h3>
          <p className="text-sm">Yen Factory BKR: 08972078800</p>
          <p className="text-sm">Meatball Factory Paskal: 085100805080</p>
          <a
            href="https://www.basoyen.com"
            target="_blank"
            className="text-sm font-semibold underline"
          >
            www.basoyen.com
          </a>
        </div>
        {/* Kolom 3 */}
        <div>
          <h3 className="font-black text-sm uppercase mb-3">
            MEATBALL FACTORY YEN
          </h3>
          <p className="text-sm">Jl. Pasirkaliki 106 Cicendo, Bandung.</p>
          <p className="text-sm">Jam Buka 08.00 – 20.00</p>
          <h3 className="font-black text-sm uppercase mb-3 mt-3">
            YEN FACTORY
          </h3>
          <p className="text-sm">Komp. Puri BKR Kav 61 Regol, Bandung</p>
          <p className="text-sm">Jam Buka 07.00 – 17.00</p>
        </div>
        {/* Kolom 4 */}
        <div>
          <h3 className="font-black text-sm uppercase mb-3">Media Social</h3>
          <a
            href="https://shopee.co.id/miebasososisyen"
            target="_blank"
            className="text-sm block underline font-semibold"
          >
            Instagram
          </a>
          <a
            href="https://www.tokopedia.com/baso-yen"
            target="_blank"
            className="text-sm block underline font-semibold mt-1"
          >
            Tiktok
          </a>
          <a
            href="https://www.tokopedia.com/baso-yen"
            target="_blank"
            className="text-sm block underline font-semibold mt-1"
          >
            Youtube
          </a>
          <h3 className="font-black text-sm uppercase mb-3">Online Store</h3>
          <a
            href="https://shopee.co.id/miebasososisyen"
            target="_blank"
            className="text-sm block underline font-semibold"
          >
            Shopee
          </a>
          <a
            href="https://www.tokopedia.com/baso-yen"
            target="_blank"
            className="text-sm block underline font-semibold mt-1"
          >
            Tokopedia
          </a>
        </div>
      </div>
      {/* Copy right */}
      <div className="border-t-2 border-black mt-8 pt-4 text-center">
        <p className="text-sm font-semibold">
          © 2026 Baso Yen. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
