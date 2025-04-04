import Image from "next/image";
// import { Button } from "../ui/button";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="overflow-hidden bg-white bg-[url('/assets/images/Ellipse-tl.png'),url('/assets/images/Ellipse-bl.png'),url('/assets/images/Ellipse-right.png')] bg-[size:1100px,800px,1159px] bg-[position:top_left,bottom_left,right] bg-no-repeat px-[10px] md:px-[70px]">
      <div className="relative mx-auto mt-[100px] flex h-full max-w-[1442px] flex-col justify-end md:mt-[160px]">
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <div className="flex flex-col gap-2.5">
            <div className="mx-auto max-w-[370px] md:max-w-[944px]">
              <h1 className="font-outfit text-[36px] leading-[45px] font-medium text-[#002347] md:text-[64px] md:leading-20 md:font-semibold">
                Securely Vote Online Anytime From Any Location
              </h1>
            </div>
            <div className="mx-auto max-w-[364px] md:max-w-[732px]">
              <p className="font-outfit text-[14px] font-medium text-[#80828D] md:text-[20px]">
                No need to wait in long queues with paper ballots, just cast
                your vote from your device in seconds.
              </p>
            </div>
          </div>
          <div>
            <Link
              href="/signin"
              className="font-afacad rounded-[8px] bg-[#002347] px-16 py-[13.5px] text-[16px] font-normal text-[#FCFCFD]"
            >
              Create Election
            </Link>
          </div>
        </div>

        <figure className="pt-[111px] md:pt-[36px] lg:pt-[31px]">
          <div className="mx-auto max-w-[1019.53px]">
            <Image
              src="/assets/images/hero.png"
              alt="hero image"
              width={1442}
              height={800}
              className="h-auto w-full"
            />
          </div>
        </figure>
      </div>
    </section>
  );
};

export default Hero;
