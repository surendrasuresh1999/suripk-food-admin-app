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
    <li className="col-span-1 space-y-3 rounded-lg bg-white p-2.5 shadow dark:bg-gray-800 dark:text-white">
      <h1 className="font-semibold tracking-wide text-gray-600 dark:text-white text-22size truncate">
        Event: {data.eventTitle} service
      </h1>
      <p className="flex items-center gap-1">
        <CalendarIcon className="h-5 w-5 text-gray-500 dark:text-white" />{" "}
        <span className="text-gray-500 dark:text-white">
          : {data.eventDate}
        </span>
      </p>
      <h1 className="block truncate">
        <span className="flex items-center">
          <UserCircleIcon className="h-6 w-6 text-gray-500 dark:text-white" />:{" "}
          {data.name}
        </span>
      </h1>
      <p className="flex items-center gap-1 truncate">
        <EnvelopeIcon className="h-5 w-5 text-gray-500 dark:text-white" />:{" "}
        {data.email}
      </p>
      <p className="flex items-center gap-1 truncate">
        <PhoneIcon className="h-5 w-5 text-gray-500 dark:text-white" />:{" "}
        {data.phone}
      </p>
      <p className="flex items-center gap-1 break-words">
        <MapPinIcon className="h-5 w-5 text-gray-500 dark:text-white" />:{" "}
        {data.eventLocation}
      </p>
      <p className="flex items-center gap-1 break-words">
        <UserGroupIcon className="h-5 w-5 text-gray-500 dark:text-white" />:{" "}
        {data.NumberOfGuests} peoples
      </p>
    </li>
  );
};

export default ServiceCard;
