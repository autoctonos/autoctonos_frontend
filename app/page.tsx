import MainLayout from "@/components/layout/main";
import { title, subtitle } from "@/components/primitives";


export default function Home() {
  return (
    <MainLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-xl text-center justify-center">
          <span className={title()}>Compra y vende&nbsp;</span>
          <span className={title({ color: "green" })}>productos&nbsp;</span>
          <br />
          <span className={title()}>artesanales locales</span>
          <div className={subtitle({ class: "mt-4" })}>
            El marketplace donde la tradición y la calidad se encuentran
          </div>
        </div>
      </section>
    </MainLayout>

  );
}