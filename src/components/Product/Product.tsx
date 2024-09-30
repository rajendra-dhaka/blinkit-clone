import { useCartContext } from "../../context/CartContext";
import { ProductType } from "../Hero/Hero";

export const Product = ({ product }: { product: ProductType }) => {
  const { cart, addToCart, removeFromCart } = useCartContext();

  const getProductQuantity = (product: ProductType) => {
    const cartItem = cart.find((item) => item.name === product.name);
    return cartItem ? cartItem.quantity : 0;
  };
  return (
    <div className="h-72 p-2 border-[1px] border-neutral-200 rounded-lg">
      <div className="h-full">
        <img
          src={product?.image_url}
          alt={`product image`}
          className="w-full max-h-36 object-contain"
        />
        <div>
          <div className="mb-2 h-16 overflow-hidden">
            <h3 className="text-sm font-semibold leading-[18px] text-[#1f1f1f] mb-[6px] line-clamp-2">
              {product?.name}
            </h3>
            <h3 className="text-xs leading-[14px] text-[#666666]">
              {product?.unit}
            </h3>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#1f1f1f] leading-[14px] text-xs font-semibold">
                &#8377;{product?.price}
              </p>
              {product?.mrp > product?.price && (
                <p className="text-[#828282] text-xs font-normal leading-[14px] line-through">
                  &#8377;{product?.mrp}
                </p>
              )}
            </div>

            {(getProductQuantity(product) || 0) > 0 ? (
              <div className="flex items-center justify-around bg-[#318616] text-white border-[1px] rounded-md w-16 px-2 py-1 ">
                <button
                  onClick={() => removeFromCart(product)}
                  className="bg-transparent"
                >
                  -
                </button>
                <span className="mx-2 text-sm">
                  {getProductQuantity(product)}
                </span>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-transparent"
                >
                  +
                </button>
              </div>
            ) : (
              <button
                onClick={() => addToCart(product)}
                className="text-[#318616] border-[1px] border-[#318616] rounded-md w-16 py-1"
              >
                ADD
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
