import { StagesAside } from "./components/aside-nav";
import { StagesNavbar } from "./components/navbar";

function StagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-dvh">
      <StagesNavbar />
      <div className="relative grid min-h-dvh lg:grid-cols-[300px_1fr]">
        <StagesAside />
        <div className="container max-w-4xl">{children}</div>
      </div>
    </div>
  );
}
export default StagesLayout;
