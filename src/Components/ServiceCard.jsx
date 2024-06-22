import { EnvelopeIcon } from "@heroicons/react/16/solid";
import { PhoneIcon, UserCircleIcon } from "@heroicons/react/20/solid";
import {
  CalendarIcon,
  MapPinIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import React from "react";

const ServiceCard = ({ data }) => {
  return (
    <li className="col-span-1 rounded-lg bg-white p-2 shadow">
      <h1>Event: {data.eventTitle} service</h1>
      <p className="flex items-center gap-1">
        <CalendarIcon className="h-5 w-5 text-gray-500" />{" "}
        <span>: {data.eventDate}</span>
      </p>
      <h1 className="block truncate">
        <span className="flex items-center">
          <UserCircleIcon className="h-5 w-5 text-gray-500" />: {data.name}
        </span>
      </h1>
      <p className="flex items-center gap-1 truncate">
        <EnvelopeIcon className="h-5 w-5 text-gray-500" />:{data.email}
      </p>
      <p className="flex items-center gap-1 truncate">
        <PhoneIcon className="h-5 w-5 text-gray-500" />:{data.phone}
      </p>
      <p className="flex items-center gap-1 break-words">
        <MapPinIcon className="h-5 w-5 text-gray-500" />: {data.eventLocation}
      </p>
      <p className="flex items-center gap-1 break-words">
        <UserGroupIcon className="h-5 w-5 text-gray-500" />:{" "}
        {data.NumberOfGuests} peoples
      </p>
    </li>
  );
};

export default ServiceCard;
