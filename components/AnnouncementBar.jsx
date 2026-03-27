export default function AnnouncementBar({ overDark = false }) {
  return (
    <div
      className={`w-full text-[8px] tracking-[0.35em] py-2 text-center uppercase font-light transition-colors duration-500 ${
        overDark
          ? "bg-bordeaux-700/90 backdrop-blur-sm text-white/80 border-b border-bordeaux-600/30"
          : "bg-bordeaux-700 text-white/85 border-b border-bordeaux-600/30"
      }`}
    >
      Kostenloser Versand ab 60 € — 30 Tage Rückgaberecht
    </div>
  );
}
