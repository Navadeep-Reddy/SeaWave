import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";

interface BookedTicket {
    userName: string;
    userEmail: string;
    totalPrice: number;
    ticketCount: number;
    eventName: string;
    venueName: string;
}

export default function OrdersPage() {
    const [orders, setOrders] = useState<BookedTicket[]>([]);
    const [filteredOrders, setFilteredOrders] = useState<BookedTicket[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState<"date" | "price" | "event">("date");

    useEffect(() => {
        const mockData: BookedTicket[] = [
            {
                userName: "navadeep",
                userEmail: "vnavadeepreddysatti@gmail.com",
                totalPrice: 4.0,
                ticketCount: 2,
                eventName: "Pro Kabaddi League Finals",
                venueName: "Gachibowli Indoor Stadium",
            },
            {
                userName: "navadeep",
                userEmail: "vnavadeepreddysatti@gmail.com",
                totalPrice: 64.0,
                ticketCount: 8,
                eventName: "A.R. Rahman Live Concert",
                venueName: "Jawaharlal Nehru Stadium",
            },
            {
                userName: "navadeep",
                userEmail: "vnavadeepreddysatti@gmail.com",
                totalPrice: 9.0,
                ticketCount: 3,
                eventName: "A.R. Rahman Live Concert",
                venueName: "Jawaharlal Nehru Stadium",
            },
            {
                userName: "navadeep",
                userEmail: "vnavadeepreddysatti@gmail.com",
                totalPrice: 36.0,
                ticketCount: 6,
                eventName: "A.R. Rahman Live Concert",
                venueName: "Jawaharlal Nehru Stadium",
            },
            {
                userName: "navadeep",
                userEmail: "vnavadeepreddysatti@gmail.com",
                totalPrice: 36.0,
                ticketCount: 6,
                eventName: "A.R. Rahman Live Concert",
                venueName: "Jawaharlal Nehru Stadium",
            },
            {
                userName: "navadeep",
                userEmail: "vnavadeepreddysatti@gmail.com",
                totalPrice: 36.0,
                ticketCount: 6,
                eventName: "A.R. Rahman Live Concert",
                venueName: "Jawaharlal Nehru Stadium",
            },
            {
                userName: "navadeep",
                userEmail: "vnavadeepreddysatti@gmail.com",
                totalPrice: 1.0,
                ticketCount: 1,
                eventName: "A.R. Rahman Live Concert",
                venueName: "Jawaharlal Nehru Stadium",
            },
            {
                userName: "navadeep",
                userEmail: "vnavadeepreddysatti@gmail.com",
                totalPrice: 25.0,
                ticketCount: 5,
                eventName: "A.R. Rahman Live Concert",
                venueName: "Jawaharlal Nehru Stadium",
            },
            {
                userName: "navadeep",
                userEmail: "vnavadeepreddysatti@gmail.com",
                totalPrice: 1.0,
                ticketCount: 1,
                eventName: "A.R. Rahman Live Concert",
                venueName: "Jawaharlal Nehru Stadium",
            },
            {
                userName: "navadeep",
                userEmail: "vnavadeepreddysatti@gmail.com",
                totalPrice: 1.0,
                ticketCount: 1,
                eventName: "A.R. Rahman Live Concert",
                venueName: "Jawaharlal Nehru Stadium",
            },
            {
                userName: "navadeep",
                userEmail: "vnavadeepreddysatti@gmail.com",
                totalPrice: 1.0,
                ticketCount: 1,
                eventName: "A.R. Rahman Live Concert",
                venueName: "Jawaharlal Nehru Stadium",
            },
            {
                userName: "navadeep",
                userEmail: "vnavadeepreddysatti@gmail.com",
                totalPrice: 81.0,
                ticketCount: 9,
                eventName: "A.R. Rahman Live Concert",
                venueName: "Jawaharlal Nehru Stadium",
            },
            {
                userName: "navadeep",
                userEmail: "vnavadeepreddysatti@gmail.com",
                totalPrice: 100.0,
                ticketCount: 10,
                eventName: "A.R. Rahman Live Concert",
                venueName: "Jawaharlal Nehru Stadium",
            },
            {
                userName: "navadeep",
                userEmail: "vnavadeepreddysatti@gmail.com",
                totalPrice: 81.0,
                ticketCount: 9,
                eventName: "A.R. Rahman Live Concert",
                venueName: "Jawaharlal Nehru Stadium",
            },
            {
                userName: "navadeep",
                userEmail: "vnavadeepreddysatti@gmail.com",
                totalPrice: 1.0,
                ticketCount: 1,
                eventName: "A.R. Rahman Live Concert",
                venueName: "Jawaharlal Nehru Stadium",
            },
            {
                userName: "navadeep",
                userEmail: "vnavadeepreddysatti@gmail.com",
                totalPrice: 1.0,
                ticketCount: 1,
                eventName: "Anubhav Singh Bassi - Stand-up Special",
                venueName: "Shanmukhananda Hall",
            },
            {
                userName: "navadeep",
                userEmail: "vnavadeepreddysatti@gmail.com",
                totalPrice: 25.0,
                ticketCount: 5,
                eventName: "International DJ Night",
                venueName: "Jawaharlal Nehru Stadium",
            },
            {
                userName: "navadeep",
                userEmail: "vnavadeepreddysatti@gmail.com",
                totalPrice: 25.0,
                ticketCount: 5,
                eventName: "Anubhav Singh Bassi - Stand-up Special",
                venueName: "Shanmukhananda Hall",
            },
        ];
        setOrders(mockData);
        setFilteredOrders(mockData);
    }, []);

    useEffect(() => {
        let filtered = orders;

        if (searchTerm) {
            filtered = orders.filter(
                (order) =>
                    order.eventName
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    order.venueName
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
            );
        }

        filtered.sort((a, b) => {
            switch (sortBy) {
                case "price":
                    return b.totalPrice - a.totalPrice;
                case "event":
                    return a.eventName.localeCompare(b.eventName);
                default:
                    return 0;
            }
        });

        setFilteredOrders(filtered);
    }, [orders, searchTerm, sortBy]);

    const totalTickets = orders.reduce(
        (sum, order) => sum + order.ticketCount,
        0
    );
    const totalAmount = orders.reduce(
        (sum, order) => sum + order.totalPrice,
        0
    );
    const uniqueEvents = new Set(orders.map((order) => order.eventName)).size;

    return (
        <div className="min-h-screen bg-veryLightBlue py-8 mt-24">
            <div className="w-5/6 mx-auto max-w-7xl">
                <div className="mb-8">
                    <h1 className="title text-textBlue font-bold text-2xl md:text-7xl mb-4">
                        My Orders
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-offBlue rounded-lg p-4 text-center">
                            <div className="text-xl md:text-4xl font-bold text-textBlue">
                                {orders.length}
                            </div>
                            <div className="text-sm md:text-base text-gray-600">
                                Total Bookings
                            </div>
                        </div>
                        <div className="bg-offBlue rounded-lg p-4 text-center">
                            <div className="text-xl md:text-4xl font-bold text-textBlue">
                                {totalTickets}
                            </div>
                            <div className="text-sm md:text-base text-gray-600">
                                Total Tickets
                            </div>
                        </div>
                        <div className="bg-offBlue rounded-lg p-4 text-center">
                            <div className="text-xl md:text-4xl font-bold text-textBlue">
                                ${totalAmount.toFixed(2)}
                            </div>
                            <div className="text-sm md:text-base text-gray-600">
                                Total Spent
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <input
                        type="text"
                        placeholder="Search by event or venue..."
                        className="flex-1 h-12 border-2 border-black/70 focus:outline-1 focus:outline-textBlue rounded-md p-4"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <select
                        className="h-12 px-4 border-2 border-black/70 focus:outline-1 focus:outline-textBlue rounded-md"
                        value={sortBy}
                        onChange={(e) =>
                            setSortBy(
                                e.target.value as "date" | "price" | "event"
                            )
                        }
                    >
                        <option value="date">Sort by Date</option>
                        <option value="price">Sort by Price</option>
                        <option value="event">Sort by Event</option>
                    </select>
                </div>

                <div className="space-y-4">
                    {filteredOrders.length === 0 ? (
                        <div className="text-center py-12">
                            <h3 className="text-lg md:text-2xl font-semibold text-textBlue mb-2">
                                No orders found
                            </h3>
                            <p className="text-base md:text-lg text-gray-600">
                                {searchTerm
                                    ? "Try adjusting your search terms"
                                    : "You haven't booked any tickets yet"}
                            </p>
                        </div>
                    ) : (
                        filteredOrders.map((order, index) => (
                            <div
                                key={index}
                                className="bg-offBlue rounded-lg p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
                            >
                                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                                            <h3 className="text-lg md:text-2xl font-bold text-textBlue truncate">
                                                {order.eventName}
                                            </h3>
                                            <Badge className="bg-textBlue text-white hover:bg-weirdBlue hover:text-textBlue self-start text-sm md:text-lg px-2 md:px-3 py-1">
                                                ${order.totalPrice.toFixed(2)}
                                            </Badge>
                                        </div>

                                        <div className="space-y-1 md:space-y-2 text-gray-600">
                                            <div className="flex flex-wrap items-center gap-x-2">
                                                <span className="font-medium text-sm md:text-lg">
                                                    Venue:
                                                </span>
                                                <span className="truncate text-sm md:text-lg">
                                                    {order.venueName}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-x-2">
                                                <span className="font-medium text-sm md:text-lg">
                                                    Tickets:
                                                </span>
                                                <span className="text-sm md:text-lg">
                                                    {order.ticketCount}{" "}
                                                    {order.ticketCount === 1
                                                        ? "ticket"
                                                        : "tickets"}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-x-2">
                                                <span className="font-medium text-sm md:text-lg">
                                                    Price per ticket:
                                                </span>
                                                <span className="text-sm md:text-lg">
                                                    $
                                                    {(
                                                        order.totalPrice /
                                                        order.ticketCount
                                                    ).toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex lg:flex-col items-start lg:items-end gap-2 lg:mt-0 mt-2">
                                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200 text-sm md:text-lg px-2 md:px-3 py-1">
                                            Confirmed
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {filteredOrders.length > 0 && (
                    <div className="mt-8 bg-darkOffBlue rounded-lg p-4 md:p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="text-textBlue">
                                <h3 className="text-lg md:text-xl font-semibold mb-2">
                                    Summary
                                </h3>
                                <div className="space-y-1 text-sm md:text-base">
                                    <div>
                                        Showing {filteredOrders.length} of{" "}
                                        {orders.length} bookings
                                    </div>
                                    <div>Events attended: {uniqueEvents}</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-xl md:text-3xl font-bold text-textBlue">
                                    $
                                    {filteredOrders
                                        .reduce(
                                            (sum, order) =>
                                                sum + order.totalPrice,
                                            0
                                        )
                                        .toFixed(2)}
                                </div>
                                <div className="text-sm md:text-base text-gray-600">
                                    Total for displayed orders
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
