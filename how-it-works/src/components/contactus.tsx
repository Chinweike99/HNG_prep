import React from "react";
// import ContactUsForm from "./form/contact-us-form";
import ContactImage from "../../../public/assets/images/landing-page-contact-us-image.jpg";
import ContactImageMobile from "../../../public/assets/images/landing-page-contact-us-image-mobile.jpg";
import Image from "next/image";

const ContactUs = () => {
  return (
    <div className="flex justify-center bg-white" id="contact-us">
      <div className="flex max-w-[1440px] gap-[42px] px-5 py-5 max-md:flex-col md:items-center md:gap-14 md:px-10 lg:px-[70px] lg:py-10">
        <section className="md:hidden">
          <Image
            src={ContactImageMobile}
            alt="contact-us-image"
            width={390}
            height={356}
            className="rounded-[10px]"
          />
        </section>
        <section className="flex flex-col items-start gap-8">
          <aside className="flex flex-col items-start !gap-3">
            <h4 className="font-outfit text-left !text-2xl leading-[45.36px] font-medium text-[#002347] lg:text-4xl">
              Get in <span className="text-[#F16A00]">touch</span> with us
            </h4>
            <p className="font-afacad text-left !text-base max-md:text-[21.33px] max-sm:max-w-[329px] md:text-lg">
              Contact us today to get to start your journey towards a successful
              businesss management
            </p>
          </aside>

          <div className="w-full">
            {/* <ContactUsForm /> */}
          </div>
        </section>
        <section className="max-md:hidden">
          <Image
            src={ContactImage}
            alt="contact-us-image"
            width={630}
            height={486}
            className="rounded-[20px]"
          />
        </section>
      </div>
    </div>
  );
};

export default ContactUs;
