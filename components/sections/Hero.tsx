import Button from "../Button";
import BookCallButton from "../BookCallButton";
import Reveal from "../Reveal";
import HeroReel from "../media/HeroReel";

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="pt-16 sm:pt-24 lg:pt-32">
      <div className="container-x">
        <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:gap-x-10">
          <h1 id="hero-title" className="t-display text-balance text-fg lg:col-span-10">
            You bring the expertise. <span className="text-fg-subtle">We make the content work harder.</span>
          </h1>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:mt-14 lg:grid-cols-12 lg:items-end lg:gap-x-10">
          <p className="t-lead max-w-[36rem] text-pretty text-fg-muted lg:col-span-6">
            We help business and educational YouTubers turn their ideas into compelling videos through
            editing, content packaging, and short-form repurposing.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-6 lg:justify-end">
            <BookCallButton location="hero" />
            <Button as="a" href="#work" variant="secondary">
              See our work
            </Button>
          </div>
        </div>

        <Reveal className="mt-14 sm:mt-20">
          <HeroReel />
        </Reveal>
      </div>
    </section>
  );
}
