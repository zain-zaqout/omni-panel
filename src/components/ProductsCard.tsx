import { ShoppingBag, DollarSign, AlertTriangle, PackageX } from "lucide-react";
import { AnimationWrapper } from "./AnimationWrapper";
import NumberTicker from "./NumberTicker";

const ProductsCard = () => {
  const cards = [
    {
      id: 1,
      head: "Total Products",
      value: 1248,
      background: "bg-blue-50 dark:bg-[#0f50db33]",
      hover: "border-slate-100 hover:border-blue-400 dark:border-slate-700 dark:hover:border-blue-500/85",
      icon: <ShoppingBag className="text-blue-600 dark:text-blue-500" size={20} />,
    },
    {
      id: 2,
      head: "Total Value",
      value: 842024,
      background: "bg-green-50 dark:bg-[#00c95026]",
      hover: "border-slate-100 hover:border-green-400 dark:border-slate-700 dark:hover:border-green-500/90",
      icon: <DollarSign className="text-green-600 dark:text-green-500" size={22} />,
      unit: "$",
    },
    {
      id: 3,
      head: "Low Stock",
      value: 15,
      background: "bg-amber-50 dark:bg-[#f5490033]",
      hover: "border-slate-100 hover:border-amber-400 dark:border-slate-700 dark:hover:border-amber-600/95",
      icon: <AlertTriangle className="text-amber-600 dark:text-amber-600" size={20} />,
    },
    {
      id: 4,
      head: "Out of Stock",
      value: 4,
      background: "bg-red-50 dark:bg-[#ff646733]",
      hover: "border-slate-100 hover:border-red-400 dark:border-slate-700 dark:hover:border-red-600/100",
      icon: <PackageX className="text-red-600 dark:text-red-500/85" size={22} />,
    },
  ];

  return (
    <section className="mt-6 grid grid-cols-1 gap-4 min-[457px]:grid-cols-2 lg:grid-cols-4">
      {cards.map((item, index) => (
        <AnimationWrapper key={item.id} delay={index * 0.1}>
          <div
            className={`w-full rounded-[20px] bg-white dark:bg-slate-800 px-6 py-5 border ${item.hover} cursor-pointer transition-all duration-300 shadow-sm dark:shadow-none`}
          >
            <div>
              <div className="flex items-center gap-5">
                <div
                  className={`w-9 h-9 flex items-center justify-center rounded-full ${item.background}`}
                >
                  <span>{item.icon}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-500 dark:text-slate-400 text-[12px] font-medium">
                    {item.head}
                  </span>
                  <span className="text-slate-900 dark:text-slate-100 text-xl font-bold">
                    {item.unit}
                    <NumberTicker value={item.value} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </AnimationWrapper>
      ))}
    </section>
  );
};

export default ProductsCard;