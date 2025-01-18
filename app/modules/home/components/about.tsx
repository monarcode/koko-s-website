export default function About() {
  return (
    <div className="grid grid-cols-3 contain">
      <div className="space-y-8">
        <h2 className="text-6xl text-brand-dark font-abiah tracking-[0.02em]">
          Who is Koko<span className="text-brand-alt">?</span>
        </h2>

        <p className="col-span-1 text-lg text-brand-dark text-balance">
          My passion for beauty and art led me to start my business in 2013. I
          specially enjoy creating natural, soft radiant looks that help you
          feel and look like your best self. Over the past decade, this vision
          has evolved into a space where artistry meets education, where each
          client and student discovers their own unique beauty potential.
          <br />
          <br /> From professional makeup training to bridal artistry, my
          approach remains consistent: enhance, never mask. In my Carrington
          studio, I combine traditional techniques with contemporary trends to
          deliver both premium beauty services and comprehensive education.
          Whether you're pursuing a career in makeup artistry or preparing for a
          special occasion, my goal is to help you achieve the confidence that
          comes with mastering the art of beauty.
        </p>
      </div>

      <div></div>

      <div className="relative flex flex-col items-center justify-end col-span-1 overflow-hidden min-h-[530px] bg-brand grow-0">
        <img
          src="/koko-portrait.png"
          alt=""
          className="absolute w-auto h-full"
        />
      </div>
    </div>
  );
}
