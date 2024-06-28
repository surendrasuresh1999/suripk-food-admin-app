import {
  CalendarIcon,
  ChartPieIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  UserPlusIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Context from "../Context/Context";

const navigation = [
  { name: "Dashboard", path: "/", icon: HomeIcon, current: true },
  {
    name: "Receipes",
    path: "/all-recepies",
    icon: FolderIcon,
    current: false,
  },
  { name: "Orders", path: "/orders", icon: ShoppingBagIcon, current: false },
  { name: "Services", path: "/services", icon: CalendarIcon, current: false },
  {
    name: "Subscribers",
    path: "/subscribers",
    icon: UserPlusIcon,
    current: false,
  },
  { name: "Blogs", path: "/blogs", icon: ChartPieIcon, current: false },
  { name: "Users", path: "/users", icon: UsersIcon, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Sidebar = () => {
  const { defaultMode } = useContext(Context);
  const loaction = useLocation();
  return (
    <nav className="flex flex-1 flex-col">
      <ul role="list" className="flex flex-1 flex-col gap-y-7">
        <li>
          <ul role="list" className="-mx-2 space-y-1">
            {navigation.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={classNames(
                    item.path === loaction.pathname
                      ? ` ${defaultMode ? "bg-gray-700 text-white" : "bg-gray-500 text-white"}`
                      : ` ${defaultMode ? "text-white hover:bg-gray-700 hover:text-white" : "text-gray-700 hover:bg-gray-500 hover:text-white"}`,
                    "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                  )}
                >
                  <item.icon
                    className={classNames(
                      item.path === loaction.pathname
                        ? "text-white"
                        : ` ${defaultMode ? "text-white hover:bg-gray-700 hover:text-white" : "text-gray-700 hover:bg-gray-500 group-hover:text-white"}`,
                      "h-6 w-6 shrink-0",
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
