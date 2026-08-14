"use client";

import Image, { type StaticImageData } from "next/image";
import { cn } from "@/lib/utils";

type EditorialImageProps = {
  src: StaticImageData;
  alt: string;
  sizes: string;
  preload?: boolean;
  className?: string;
  imageClassName?: string;
  figureClassName?: string;
};

export function EditorialImage({
  src,
  alt,
  sizes,
  preload = false,
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
        placeholder="blur"
        sizes={sizes}
        className={cn("object-cover", imageClassName)}
      />
    </figure>
  );
}
