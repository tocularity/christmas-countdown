import Image from "next/image";
import Link from "next/link";

export default function Credit({ name, unsplash, image }) {
  return (
    <Link
      href={`https://unsplash.com/${unsplash}`}
      target="_blank"
      className="bg-none border-secondary hover:bg-secondary transition border-[1px] rounded px-2 py-2 flex flex-row items-center gap-2 w-full font-medium"
    >
      <Image src={image} width={32} height={32} className="rounded-full h-8 w-8 bg-neutral-300" alt={`${name}'s Avatar`} />
      <p className="whitespace-nowrap truncate">{name}</p>
    </Link>
  );
}
