import Image from "next/image";

export const Rewards = () => {
  return (
    <div
      id="rewards"
      className="absolute right-1/2 top-[120px] z-50 translate-x-1/2 space-y-5 opacity-0 md:bottom-[200px] md:top-auto"
    >
      <div className="flex items-center gap-3">
        <Image
          src="/coins.png"
          alt=""
          width={43}
          height={43}
          className="w-5 md:w-7 lg:w-10"
        />
        <span className="text-xs font-bold uppercase text-white md:text-sm lg:text-base">
          +100 coins
        </span>
      </div>
      <div className="flex items-center gap-3">
        <Image
          src="/xp.png"
          alt=""
          width={42}
          height={44}
          className="w-5 md:w-7 lg:w-10"
        />
        <span className="text-xs font-bold uppercase text-white md:text-sm lg:text-base">
          +5 levels
        </span>
      </div>
    </div>
  );
};
