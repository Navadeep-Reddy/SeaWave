import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useKeycloak } from "@react-keycloak/web";

export default function EventBox(props: any) {
    const { keycloak } = useKeycloak();
    const { name, capacity, venue, id } = props;
    return (
        <div className="w-full h-20 md:h-20 rounded-md  bg-offBlue mx-auto md:mx-0 mb-4 md:mb-8  p-2 flex justify-between items-center ">
            <div className="details m-1 basis-2/3 min-w-0">
                <div className=" flex gap-x-2">
                    <h1 className="text-xl font-bold text-textBlue">Event:</h1>
                    <p className="text-xl  overflow-hidden whitespace-nowrap text-ellipsis text-gray-500">
                        {name}
                    </p>
                </div>

                <div className="description text-gray-500">
                    <p className="-mb-1">Total Capacity: {capacity}</p>
                    <div className="flex gap-x-2">
                        <p>Venue: </p>
                        <p className="text-ellipsis overflow-hidden whitespace-nowrap">
                            {venue}
                        </p>
                    </div>
                </div>
            </div>
            <Link to={`/booking/${keycloak.profile?.id}/${id}`}>
                <Button className="bg-textBlue text-white font-semibold h-16 w-16 hover:bg-weirdBlue hover:text-textBlue hover:cursor-pointer">
                    Register
                </Button>
            </Link>
        </div>
    );
}
