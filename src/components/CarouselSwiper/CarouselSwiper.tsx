import { Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

interface CarouselSwiperProps {
  slidesPerView?: number;
  spaceBetween?: number;
  children: React.ReactNode;
}

export const CarouselSwiper = ({
  slidesPerView = 4,
  spaceBetween = 50,
  children,
}: CarouselSwiperProps) => {
  return (
    <Swiper spaceBetween={spaceBetween} slidesPerView={slidesPerView}>
      {children}
    </Swiper>
  );
};
