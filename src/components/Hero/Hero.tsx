import { useEffect, useState } from "react";
import { BLINKIT_DATA } from "../../data";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { useCartContext } from "../../context/CartContext";

interface blinkitDataType {
  objects: Record<string, unknown>[];
}
interface productType {
  name: string;
  image_url: string;
  mrp: number;
  price: number;
  unit: string;
}

export const Hero = () => {
  const [blinkitData, setBlinkitData] = useState<blinkitDataType | null>(null);

  const { charAt, addToCart, removeFromCart } = useCartContext();

  useEffect(() => {
    const fetchBlinkitData = async () => {
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(BLINKIT_DATA);
        }, 1000);
      });
      setBlinkitData(response as blinkitDataType);
    };
    fetchBlinkitData();
  }, []);

  return (
    <div>
      {blinkitData?.objects?.map((object, objectIndex: number) => (
        <div key={objectIndex}>
          {/* BANNER */}
          {object.type === 55 && (
            <div>
              <img src={object?.data?.image} alt={object.data.id} />
            </div>
          )}
          {/* GRID CATEGORIES */}
          {object.type === 52 && (
            <div className="grid grid-cols-10">
              {object.data.items.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <img src={category.image} alt="" />
                </div>
              ))}
            </div>
          )}
          {/* POSTERS */}
          {object.type === 66 && (
            <div className="pb-5">
              <Swiper
                spaceBetween={50}
                slidesPerView={4}
                onSlideChange={() => console.log("slide change")}
                onSwiper={(swiper) => console.log(swiper)}
              >
                {object?.objects.map(
                  (
                    slide: { data: { image_url: string } },
                    slideIndex: number
                  ) => (
                    <SwiperSlide>
                      <img
                        src={slide.data.image_url}
                        alt={`slide image - ${slideIndex}`}
                      />
                    </SwiperSlide>
                  )
                )}
              </Swiper>
            </div>
          )}
          {/* PRODUCTS */}
          {object.type === 77 && (
            <div>
              <h3 className="p-4 font-semibold text-2xl leading-8">
                {object?.header_config?.title}
              </h3>
              <div className="pb-5">
                <Swiper
                  spaceBetween={10}
                  slidesPerView={6}
                  onSlideChange={() => console.log("slide change")}
                  onSwiper={(swiper) => console.log(swiper)}
                >
                  {object?.objects[0].data.products?.map(
                    (product: productType[], productIndex: number) => (
                      <SwiperSlide>
                        <div className="h-72 p-2 border-[1px] border-neutral-200 rounded-lg">
                          <div className="h-full ">
                            <img
                              src={product[0]?.image_url}
                              alt={`product image - ${productIndex}`}
                              className="w-full max-h-36 object-contain"
                            />
                            <div>
                              <div className="mb-2 h-16 overflow-hidden">
                                <h3 className="text-sm font-semibold leading-[18px] text-[#1f1f1f] mb-[6px] line-clamp-2">
                                  {product[0]?.name}
                                </h3>
                                <h3 className="text-xs leading-[14px] text-[#666666]">
                                  {product[0]?.unit}
                                </h3>
                              </div>
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-[#1f1f1f] leading-[14px] text-xs font-semibold">
                                    {product[0]?.price}
                                  </p>
                                  {product[0]?.mrp > product[0]?.price && (
                                    <p className="text-[#828282] text-xs font-normal leading-[14px] line-through">
                                      {product[0]?.mrp}
                                    </p>
                                  )}
                                </div>
                                <button
                                  onClick={() => addToCart(product[0])}
                                  className="text-[#318616] border-[1px] border-[#318616] rounded-md px-4 py-1"
                                >
                                  ADD
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    )
                  )}
                </Swiper>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
