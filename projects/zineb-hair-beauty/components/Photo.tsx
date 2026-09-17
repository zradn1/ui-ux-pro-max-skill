import Image from "next/image";

/**
 * Affiche une photo si `src` est renseigné, sinon un aplat dégradé de la
 * palette du salon. Le site reste donc présentable tant que les vraies photos
 * ne sont pas encore fournies — voir `gallery` dans content/site.ts.
 */
const TONES = [
  "from-[#f0dfe4] via-[#e6d3d9] to-[#d9c3cb]",
  "from-[#f4e9dd] via-[#ecdcc9] to-[#dcc6ae]",
  "from-[#ead9df] via-[#dcc4ce] to-[#c9aab8]",
  "from-[#f2e7e0] via-[#e4d2c8] to-[#cfb6a9]",
  "from-[#e8d6dc] via-[#d7bcc6] to-[#bf9dab]",
  "from-[#f5ece3] via-[#e9dbcd] to-[#d5c0ab]",
];

export default function Photo({
  src,
  alt,
  tone = 1,
  className = "",
  sizes,
  priority = false,
}: {
  src?: string;
  alt: string;
  tone?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  if (src) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes ?? "(max-width: 768px) 100vw, 50vw"}
          priority={priority}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative overflow-hidden bg-gradient-to-br ${
        TONES[(tone - 1) % TONES.length]
      } ${className}`}
    >
      {/* Grain léger : évite l'effet « dégradé plat » sur les grandes surfaces. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.12] mix-blend-multiply"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(42,29,34,0.5) 1px, transparent 0)",
          backgroundSize: "7px 7px",
        }}
      />
    </div>
  );
}
