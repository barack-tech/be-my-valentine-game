import FloatingHearts from "@/components/FloatingHearts";
import ValentineCard from "@/components/ValentineCard";

const Index = () => {
  return (
    <>
      <main className="relative flex min-h-dvh items-center justify-center overflow-hidden">
        <FloatingHearts />
        <div className="relative z-10">
          <ValentineCard />
        </div>
      </main>
    </>
  );
};

export default Index;
