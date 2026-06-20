import KidroveLogo from "./KidroveLogo";

export default function Footer() {
  return (
    <footer className="border-t-4 border-kid-yellow bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <KidroveLogo className="h-7 w-auto" />
        <p className="text-sm text-gray-400">
          &copy; 2026 Kidrove. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
