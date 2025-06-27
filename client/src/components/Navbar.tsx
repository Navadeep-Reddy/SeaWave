import { useEffect, useState } from "react";
import Logo from "../../src/assets/logo.svg";
import { Menu, X } from "lucide-react";

function NavLinks(props: any) {
  const { display } = props;
  return (
    <ul
      className={`gap-x-6 gap-y-2 ${display} text-2xl font-medium px-20 text-textBlue basis-full`}
    >
      <li className="hover:text-black hover:cursor-pointer duration-150">
        Events
      </li>
      <li className="hover:text-black hover:cursor-pointer duration-150">
        Bookings
      </li>
      <li className="hover:text-black hover:cursor-pointer duration-150">
        Customers
      </li>
      <li className="hover:text-black hover:cursor-pointer duration-150">
        Settings
      </li>
    </ul>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState<boolean>(false);
  const [isSticky, setIsSticky] = useState<boolean>(false);

  useEffect(() => {
    const setter = () => {
      console.log(window.scrollY);
      setIsSticky(window.scrollY > 50);
    };
    window.addEventListener("scroll", setter);

    return () => {
      window.removeEventListener("scroll", setter);
    };
  }, []);

  const toggleIcon = () => {
    setOpen(!open);
  };
  return (
    <div
      className={`navigation-bar w-full duration-300 ${
        isSticky
          ? "bg-offBlue shadow-md "
          : ` ${open ? "bg-offBlue" : "bg-transparent"}`
      } fixed top-0  md:py-4 z-20`}
    >
      <div className="flex  justify-between items-center w-full h-full">
        <div className="md:px-20 px-6 flex gap-x-4 items-center h-full">
          <img src={Logo} className="md:h-12 md:w-12 h-10 w-10" />
          <h1 className="font-semibold text-2xl md:text-5xl text-textBlue font-lobster">
            SeaWave
          </h1>
        </div>

        <div
          className="mobile-view md:hidden p-6 flex cursor-pointer"
          onClick={toggleIcon}
        >
          {open ? <X /> : <Menu />}
        </div>

        <div className="navigation-options hidden md:flex ">
          {<NavLinks display="flex" />}
        </div>
      </div>
      <div
        className={`
           bg-offBlue pb-1 overflow-hidden transition-all duration-300 ease-in-out
          ${
            open
              ? "max-h-screen opacity-100"
              : "max-h-0 opacity-0 pointer-events-none"
          }
          md:hidden // Ensure it only applies to mobile view
        `}
      >
        <NavLinks display="w-full flex flex-col items-center justify-center" />
      </div>
    </div>
  );
}
