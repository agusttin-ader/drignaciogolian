"use client";

import Image, { type StaticImageData } from "next/image";
import { cn } from "@/lib/utils";

type EditorialImageProps = {
  src: StaticImageData;
  alt: string;
  sizes: string;
  preload?: boolean;
  quality?: number;
  className?: string;
  imageClassName?: string;
  figureClassName?: string;
};

export function EditorialImage({
  src,
  alt,
  sizes,
  preload = false,
  quality = 70,
  className,
  imageClassName,
  figureClassName,
}: EditorialImageProps) {
  return (
    <figure className={cn("relative overflow-hidden bg-muted", figureClassName, className)}>
      <Image
        src={src}
        alt={alt}
        fill
        preload={preload}
        quality={quality}
        placeholder="blur"
        sizes={sizes}
        className={cn("object-cover", imageClassName)}
      />
    </figure>
  );
}
