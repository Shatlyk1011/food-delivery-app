import useProductItem from "@/app/hooks/useProductItem";

const Index = ({ className }: { className?: string }) => {
  const { totalDishes } = useProductItem();
  if (totalDishes > 0)
    return (
      <div
        //FIX
        // https://tailwindcss.com/docs/animation
        className={`hidden rounded-full bg-gray-1 px-2 py-3 text-[10px] font-bold leading-[0] text-text-2 xl:block  ${className}`}
      >
        <div className="h- relative flex w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2f2]  opacity-75"></span>
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full text-white">{totalDishes}</span>
        </div>
      </div>
    );
};

export default Index;
