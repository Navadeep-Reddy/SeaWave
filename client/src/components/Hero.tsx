import { Button } from "./ui/button";

export default function Hero() {
  return (
    <div className="hero-section bg-offBlue h-screen flex flex-col items-center justify-center">
      <h1 className="md:text-6xl text-4xl font-bold text-textBlue text-center px-2">
        SeaWave: Effortless Ticketing
      </h1>
      <p className="text-gray-500 text-lg md:text-xl text-center md:max-w-2xl px-2 my-4 md:my-6">
        Navigate a world of live events with our intuitive and powerful booking
        platform. Seawave ensures a smooth journey from discovery to the front
        row, connecting you to the best in entertainment and culture.
      </p>

      <Button className="bg-textBlue text-offBlue rounded-full p-6 my-2 text-lg md:p-8 md:my-4 md:text-xl font-bold hover:text-textBlue hover:cursor-pointer hover:bg-weirdBlue">
        Discover Live Events
      </Button>
    </div>
  );
}
