interface LogoProps {
  className?: string;
}

/**
 * Kidrove wordmark recreation: each letter colored individually
 * (red, orange, yellow, green, blue, purple, pink) using the "Fredoka"
 * typeface, a rounded "bubble letter" style close to the original brand
 * mark, with a white outline behind each letter for contrast on any background.
 */
export default function KidroveLogo({ className = "h-9 w-auto" }: LogoProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 640 130"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Kidrove logo"
    >
      <g
        fontFamily="'Fredoka', 'Baloo 2', sans-serif"
        fontWeight="700"
        fontSize="108"
        stroke="#FFFFFF"
        strokeWidth="11"
        strokeLinejoin="round"
        paintOrder="stroke"
      >
        <text x="0" y="96" fill="#EF4444">K</text>
        <text x="78" y="96" fill="#F97316">i</text>
        <text x="112" y="96" fill="#FACC15">d</text>
        <text x="196" y="96" fill="#16A34A">r</text>
        <text x="254" y="96" fill="#3B82F6">o</text>
        <text x="346" y="96" fill="#7C3AED">v</text>
        <text x="432" y="96" fill="#EC4899">e</text>
      </g>
    </svg>
  );
}
