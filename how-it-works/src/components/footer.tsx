import React from "react";
import Link from "next/link";
import logo from "../../assets/Logo-white.svg";
// import efacebook from "../../assets/efacebook.png";
// import einstagram from "../../assets/einstagram.png";
// import elinkedIn from "../../assets/elinkedIn.png";
import Image from "next/image";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#002347] text-[#FFFFFF]">
      <div className="mx-auto max-w-[1440px] p-10">
        <div className="flex flex-wrap justify-between">
          <div className="mb-4 flex flex-col items-start gap-8">
            <Image src={logo} alt="e-vote-logo" />
            <p className="font-afacad mr-2 w-full text-left text-[18px] lg:w-[400px]">
              Empower your organization with lightning-fast, transparent voting
              that breaks down barriers and amplifies every voice
            </p>
          </div>

          <div className="font-afacad flex flex-wrap gap-[2rem] lg:gap-[3.5rem]">
            <nav className="flex flex-col gap-2 text-left">
              <Link href="/" className="hover:text-gray-400">
                Home
              </Link>
              {/* <Link href="/career" className="hover:text-gray-400">
                Career
              </Link>
              <Link href="/legal" className="hover:text-gray-400">
                Legal
              </Link> */}
              {/* <Link href="/terms" className="hover:text-gray-400">
                Terms of Services
              </Link> */}
              <Link href="#faq" className="hover:text-gray-400">
                FAQ
              </Link>
              <Link href="/signup" className="hover:text-gray-400">
                Sign up
              </Link>
              <Link href="/signin" className="hover:text-gray-400">
                Log in
              </Link>
            </nav>

            <nav className="flex flex-col gap-2 text-left">
              {/* <Link href="#pricing" className="hover:text-gray-400">
                Pricing
              </Link> */}
              {/* <Link href="/review" className="hover:text-gray-400">
                Review
              </Link> */}
              {/* <Link href="#customer-service" className="hover:text-gray-400">
                Customers Stories
              </Link> */}
            </nav>
            <nav className="flex flex-col gap-2 text-left">
              {/* <Link href="/blog" className="hover:text-gray-400">
                Blog
              </Link>
              <Link href="/resources" className="hover:text-gray-400">
                Resources
              </Link>
              <Link href="/privacy" className="hover:text-gray-400">
                Waitlist
              </Link> */}
            </nav>
          </div>
        </div>
        <div className="mt-14 flex flex-col items-center justify-center gap-3">
          <p className="font-afacad text-[16px]">
            &#64;E-vote All Rights Reserved {new Date().getFullYear()}
          </p>
          {/* <div className="flex gap-3">
            <Image src={efacebook} alt="e-vote-facebook" className="h-5 w-5" />
            <Image src={elinkedIn} alt="e-vote-linkedIn" className="h-5 w-5" />
            <Image
              src={einstagram}
              alt="e-vote-instagram"
              className="h-5 w-5"
            />
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
