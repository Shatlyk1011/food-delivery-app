const Index = ({ count, className }: { count: number; className?: string }) => {
  return (
    <div
      className={`hidden rounded-full bg-gray-1 px-2.5 py-1.5 text-[10px] font-bold leading-[0] text-text-2 xl:block ${className}`}
    >
      <div className="relative flex items-center justify-center">
        {Boolean(count) && (
          <span className="duration-[2s] absolute inline-flex animate-ping rounded-full bg-info px-2.5 py-2.5 opacity-60"></span>
        )}
        <span className="relative inline-flex h-full w-full rounded-full text-center text-xs text-black">{count}</span>
      </div>
    </div>
  );
};

export default Index;
