const TailwindIndicator = () => {
  if (process.env.NODE_ENV === "production") return null;

  return (
    <div className="fixed bottom-1 left-1 z-[1000] flex h-8 w-8 items-center justify-center rounded-full bg-black p-3 text-base text-white ">
      <div className="block xl:hidden">2xl</div>
      <div className="hidden lg:hidden xl:block">xl</div>
      <div className="hidden lg:block md:hidden">lg</div>
      <div className="hidden md:block sm:hidden">md</div>
      <div className="xs:hidden hidden sm:block">sm</div>
      <div className="xs:block hidden">xs</div>
    </div>
  );
};

export default TailwindIndicator;
