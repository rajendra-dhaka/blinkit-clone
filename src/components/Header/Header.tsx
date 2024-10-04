import { CiSearch } from "react-icons/ci";
import { FaCaretDown, FaShoppingCart } from "react-icons/fa";
import { useCartContext } from "../../context/CartContext";

export const Header = () => {
  const searchSuggestions = ["milk", "chips", "apples", "rice"];
  const { cart } = useCartContext();
  // Calculate total items and total price
  const totalItems = cart.reduce((acc, item) => acc + (item.quantity || 0), 0);
  const totalPrice = cart.reduce(
    (acc, item) => acc + (item.quantity || 0) * item.price,
    0
  );

  return (
    <div className="grid grid-cols-12 border-b-[1px] border-neutral-300">
      <div className="col-span-2 cursor-pointer">
        <img src="/logo_blinkit.webp" alt="" className="object-contain" />
      </div>
      <div className="col-span-8 grid grid-cols-12 place-items-center">
        {/* LOCATION */}
        <div className="col-span-3">
          <p className="mb-[6px] text-lg font-extrabold leading-5">
            Delivery in 12 minutes
          </p>
          <p className="font-normal text-[13px] leading-4 flex">
            Gurugram, Haryana 122018, India
            <span className="ml-2 cursor-pointer">
              <FaCaretDown />
            </span>
          </p>
        </div>
        {/* SEARCH */}
        <div className="relative col-span-8 w-full">
          <span className="absolute top-1/2 left-2 -translate-y-1/2">
            <CiSearch />
          </span>

          <div className="">
            {searchSuggestions.map((item, index) => (
              <p
                key={index}
                className="text-[#a8a8a8] absolute left-10 top-[140%] text-sm animate-scroll"
                style={{ animationDelay: `${index * 1500}ms` }}
              >
                Search "{item}"
              </p>
            ))}
          </div>

          <input
            type="text"
            className="px-8 outline-none bg-[#f8f8f8] text-lg w-full py-2 rounded-xl border-[1px] border-[#b7b4b4] text-[#130130]"
          />
        </div>
        {/* LOGIN */}
        <div className="col-span-1">
          <p className="cursor-pointer text-[#363636] text-lg font-normal">
            Login
          </p>
        </div>
      </div>
      <div className="col-span-2 flex items-center justify-center">
        <button className="cursor-pointer bg-[#0C831F] text-white rounded-lg text-sm font-semibold leading-[14px] px-4 py-4 flex items-center gap-2">
          <span className="hover:animate-shake ">
            <FaShoppingCart size={20} />
          </span>
          {totalItems > 0 ? (
            <div>
              <p className="mb-1">
                {totalItems} item{totalItems > 1 ? "s" : ""}
              </p>
              <p>&#8377;{totalPrice.toFixed(2)}</p>
            </div>
          ) : (
            "My Cart"
          )}
        </button>
      </div>
    </div>
  );
};
