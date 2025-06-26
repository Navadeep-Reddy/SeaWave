import { Button } from "./ui/button";

export default function Hero() {
  return (
    <div className="hero-section bg-offBlue h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <svg
        className="absolute top-0 left-0 w-[450px] h-[450px] md:w-[700px] md:h-[700px] opacity-30"
        style={{ transform: "translate(-35%, -35%) rotate(25deg)" }}
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#F7FDFF"
          d="M33.6,-67.5C39.9,-54.6,39,-38.2,48,-26.4C57.1,-14.6,76.3,-7.3,76.5,0.1C76.7,7.6,58,15.1,50.3,29.4C42.6,43.6,46,64.5,39.4,71.4C32.9,78.3,16.4,71.2,1.5,68.6C-13.4,66,-26.9,67.9,-41,65.4C-55.1,62.8,-69.8,55.8,-74.8,44.2C-79.9,32.5,-75.2,16.3,-71.2,2.3C-67.2,-11.6,-63.8,-23.2,-55.7,-29.7C-47.7,-36.2,-35.1,-37.6,-25.1,-48.4C-15,-59.1,-7.5,-79.3,3.1,-84.6C13.6,-89.9,27.3,-80.4,33.6,-67.5Z"
          transform="translate(100 100)"
        />
      </svg>

      <svg
        className="absolute bottom-0 right-0 w-[550px] h-[550px] md:w-[950px] md:h-[950px] opacity-40"
        style={{ transform: "translate(30%, 30%) rotate(-35deg)" }}
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#F7FDFF"
          d="M16.8,-28.1C23.8,-25,32.8,-24.6,47,-20.4C61.2,-16.1,80.4,-8.1,87.3,4C94.1,16,88.6,32,74.6,36.6C60.7,41.2,38.4,34.5,24.5,35.4C10.7,36.3,5.4,44.8,-2.5,49.1C-10.3,53.4,-20.6,53.4,-27.6,48.6C-34.6,43.8,-38.4,34.1,-49,25.1C-59.7,16.2,-77.2,8.1,-77.7,-0.3C-78.3,-8.7,-61.8,-17.5,-49.6,-23.6C-37.3,-29.7,-29.3,-33.2,-21.7,-36C-14.1,-38.8,-7.1,-40.8,-1.1,-38.9C4.9,-37,9.8,-31.2,16.8,-28.1Z"
          transform="translate(100 100)"
        />
      </svg>

      <svg
        className="absolute top-0 right-0 w-[350px] h-[350px] md:w-[550px] md:h-[550px] opacity-25"
        style={{ transform: "translate(30%, -30%) rotate(-10deg)" }}
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#F7FDFF"
          d="M30.3,-62.6C35.3,-49.5,32.8,-33.5,37.2,-22.6C41.7,-11.7,53,-5.8,57,2.3C61.1,10.5,57.8,21,54.8,34.3C51.7,47.7,49,64,40,71.9C30.9,79.7,15.4,79.2,3.7,72.8C-8,66.3,-15.9,53.9,-30.4,49.1C-44.8,44.3,-65.7,47.1,-69.8,40.2C-74,33.3,-61.5,16.7,-56.6,2.8C-51.8,-11,-54.6,-22.1,-54.3,-35.7C-54,-49.3,-50.5,-65.4,-40.9,-75.9C-31.4,-86.4,-15.7,-91.3,-1.5,-88.6C12.6,-85.9,25.2,-75.7,30.3,-62.6Z"
          transform="translate(100 100)"
        />
      </svg>

      <h1 className="md:text-6xl text-4xl font-bold text-textBlue text-center px-2 z-10">
        SeaWave: Effortless Ticketing
      </h1>
      <p className="text-gray-500 text-lg md:text-xl text-center md:max-w-2xl px-2 my-4 md:my-6 z-10">
        Navigate a world of live events with our intuitive and powerful booking
        platform. Seawave ensures a smooth journey from discovery to the front
        row, connecting you to the best in entertainment and culture.
      </p>
      <Button className="bg-textBlue text-offBlue rounded-full p-6 my-2 text-lg md:p-8 md:my-4 md:text-xl font-bold hover:text-textBlue hover:cursor-pointer hover:bg-weirdBlue z-10">
        Discover Live Events
      </Button>

      <div className="absolute bottom-0 left-0 w-full">
        <svg
          viewBox="0 0 1440 200"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            fill="#FFFFFF"
            d="M0,64 C360,200 1080,0 1440,64 L1440,320 L0,320 Z"
          />
        </svg>
      </div>
    </div>
  );
}
