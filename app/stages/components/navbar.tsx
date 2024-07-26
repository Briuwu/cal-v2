import { UserButton } from "@clerk/nextjs";

export const StagesNavbar = () => {
  return (
    <header className="border-b-2 border-black py-5">
      <div className="container flex justify-end">
        <UserButton />
      </div>
    </header>
  );
};
