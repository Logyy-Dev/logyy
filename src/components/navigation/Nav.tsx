import { type FC, useState, useEffect } from "react";
import NavServices from "./NavServices";
import Link from "next/link";
import { useRouter } from "next/router";
import NavMobile from "@/components/navigation/NavMobile";

interface NavProps {
  handleShowModal: (
    showModal: boolean,
    modalContent: React.ReactNode | null
  ) => void;
  onOpenServices: (showModal: boolean) => void;
  showModal: boolean;
  openServices: boolean;
}

const Nav: FC<NavProps> = ({
  handleShowModal,
  showModal,
  openServices,
  onOpenServices,
}) => {
  const [scrolledFromTop, setScrolledFromTop] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      const threshold = 100;

      if (position > threshold) {
        setScrolledFromTop(true);
        onOpenServices(false);
      } else {
        setScrolledFromTop(false);
      }
    };

    const handleRouteChange = () => {
      onOpenServices(false);
    };

    window.addEventListener("scroll", handleScroll);
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events, onOpenServices]);

  return (
    <nav
      className={`fixed left-1/2 -translate-x-1/2 top-10 ${
        scrolledFromTop ? "bg-gray-50/70" : "bg-gray-50"
      } w-[90%] md:w-4/5 h-[6rem] rounded-full flex justify-between items-center px-padXMobile  md:px-padX shadow-md z-10`}
    >
      <Link href="/">
        {" "}
        <h2 className="logo font-bold text-primary">LOGGY</h2>
      </Link>
      <ul className=" gap-5 text-black hidden md:flex">
        <li
          className="group duration-300 ease-linear cursor-pointer relative"
          onClick={() => {
            onOpenServices(!openServices);
          }}
        >
          <span className="group-hover:text-primary ">
            <span className="mr-1">Services</span>
            {openServices ? <span>&#11105;</span> : <span>&#11107;</span>}
          </span>
          {openServices && <NavServices />}
        </li>

        <li>
          <Link
            href="/about-us"
            className="hover:text-primary duration-300 ease-linear"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="/portfolio"
            className="hover:text-primary duration-300 ease-linear"
          >
            Portfolio
          </Link>
        </li>
        <li>
          <Link
            href="/blog"
            className="hover:text-primary duration-300 ease-linear"
          >
            Blog
          </Link>
        </li>
      </ul>
      <Link
        href="/get-in-touch"
        className=" hidden md:block duration-300 ease-linear font-bold text-primary"
      >
        Get in touch
      </Link>
      <div
        onClick={() =>
          handleShowModal(
            !showModal,
            <NavMobile
              openServices={openServices}
              onOpenServices={onOpenServices}
            />
          )
        }
        className="md:hidden cursor-pointer group"
      >
        <div className="relative w-6 h-[0.1rem] bg-primary mb-2 duration-300 ease-linear " />
        <div className="relative w-6 h-[0.1rem] bg-primary mb-2 duration-300 ease-linear " />
        <div className="relative w-6 h-[0.1rem] bg-primary duration-300 ease-linear " />
      </div>
    </nav>
  );
};

export default Nav;
