"use client";
import { useCarousel } from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const CustomCarouselButtons = () => {
  const { scrollPrev, scrollNext } = useCarousel();

  return (
    <div className="flex gap-2">
      <button
        onClick={scrollPrev}
        className="text-gray-40 cursor-pointer hover:text-primary-3 transition-colors"
      >
        <ChevronLeft size={25} />
      </button>
      <button
        onClick={scrollNext}
        className="text-gray-40 cursor-pointer hover:text-primary-3 transition-colors"
      >
        <ChevronRight size={25} />
      </button>
    </div>
  );
};
