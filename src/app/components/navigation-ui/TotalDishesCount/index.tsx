import useProductItem from "@/app/hooks/useProductItem";

const Index = ({ className }: { className?: string }) => {
  const { totalDishes } = useProductItem();
  if (totalDishes > 0)
    return (
      <div
        className={`hidden rounded-full bg-gray-1 px-2 py-3 text-[10px] font-bold leading-[0] text-text-2 xl:block ${className}`}
      >
        {totalDishes}
      </div>
    );
};

export default Index;
