import Logo from "../../src/assets/logo.svg";

export default function Navbar() {
  return (
    <div className="navigation-bar w-full h-20  bg-offBlue flex justify-between items-center">
      <div className="px-20 flex gap-x-4 items-center">
        <img src={Logo} className="h-12 w-12" />
        <h1 className="font-semibold text-5xl text-textBlue">SeaWave</h1>
      </div>
      <div className="navigation-options">
        <ul className="gap-x-6 flex text-2xl font-medium px-20 text-textBlue">
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
      </div>
    </div>
  );
}
