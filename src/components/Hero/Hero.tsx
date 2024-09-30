import { useEffect, useState } from "react";
import { BLINKIT_DATA } from "../../data";
import { SwiperSlide } from "swiper/react";
import { Product } from "../Product/Product";
import { CarouselSwiper } from "../CarouselSwiper/CarouselSwiper";

interface BlinkitDataType {
  objects: BlinkitObject[];
}

interface BlinkitObject {
  type: number;
  data?: {
    id?: string;
    image?: string;
    items?: CategoryType[];
  };
  objects?: SlideType[] | ProductContainerType[];
  header_config?: {
    title: string;
  };
}

interface SlideType {
  data: {
    image_url: string;
  };
}

interface CategoryType {
  image: string;
}
export interface ProductType {
  name: string;
  image_url: string;
  mrp: number;
  price: number;
  unit: string;
}
interface ProductContainerType {
  data: {
    products?: ProductType[][];
  };
}

// Type guard to check if it's a SlideType
function isSlideTypeArray(
  objArray: SlideType[] | ProductContainerType[]
): objArray is SlideType[] {
  return (objArray as SlideType[])[0]?.data?.image_url !== undefined;
}

// Type guard for ProductContainerType
function isProductContainerTypeArray(
  objArray: SlideType[] | ProductContainerType[]
): objArray is ProductContainerType[] {
  return (objArray as ProductContainerType[])[0]?.data?.products !== undefined;
}

export const Hero = () => {
  const [blinkitData, setBlinkitData] = useState<BlinkitDataType | null>(null);

  useEffect(() => {
    const fetchBlinkitData = async () => {
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(BLINKIT_DATA);
        }, 1000);
      });
      setBlinkitData(response as BlinkitDataType);
    };
    fetchBlinkitData();
  }, []);

  return (
    <div>
      {blinkitData?.objects?.map(
        (object: BlinkitObject, objectIndex: number) => (
          <div key={objectIndex}>
            {/* BANNER */}
            {object.type === 55 && (
              <div>
                <img src={object?.data?.image} alt={object?.data?.id} />
              </div>
            )}

            {/* GRID CATEGORIES */}
            {object.type === 52 && (
              <div className="grid grid-cols-10">
                {object?.data?.items?.map(
                  (category: CategoryType, categoryIndex: number) => (
                    <div key={categoryIndex}>
                      <img
                        src={category.image}
                        alt={`category - ${categoryIndex}`}
                      />
                    </div>
                  )
                )}
              </div>
            )}

            {/* POSTERS */}
            {object.type === 66 &&
              Array.isArray(object.objects) &&
              isSlideTypeArray(object.objects) && (
                <div className="pb-5">
                  <CarouselSwiper>
                    {object.objects.map(
                      (slide: SlideType, slideIndex: number) => (
                        <SwiperSlide key={slideIndex}>
                          <img
                            src={slide.data.image_url}
                            alt={`slide image - ${slideIndex}`}
                          />
                        </SwiperSlide>
                      )
                    )}
                  </CarouselSwiper>
                </div>
              )}

            {/* PRODUCTS */}
            {object.type === 77 &&
              Array.isArray(object.objects) &&
              isProductContainerTypeArray(object.objects) && (
                <div>
                  <h3 className="p-4 font-semibold text-2xl leading-8">
                    {object?.header_config?.title}
                  </h3>
                  <div className="pb-5">
                    <CarouselSwiper slidesPerView={6} spaceBetween={10}>
                      {object?.objects[0]?.data?.products?.map(
                        (product: ProductType[], productIndex: number) => (
                          <SwiperSlide key={productIndex}>
                            <Product product={product[0]} />
                          </SwiperSlide>
                        )
                      )}
                    </CarouselSwiper>
                  </div>
                </div>
              )}
          </div>
        )
      )}
    </div>
  );
};
