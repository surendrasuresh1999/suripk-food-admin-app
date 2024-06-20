import {
  CalendarIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { NavLink, useLocation } from "react-router-dom";

const navigation = [
  { name: "Dashboard", path: "/", icon: HomeIcon, current: true },
  {
    name: "Receipes",
    path: "/all-recepies",
    icon: CalendarIcon,
    current: false,
  },
  { name: "Orders", path: "/orders", icon: UsersIcon, current: false },
  { name: "Services", path: "/services", icon: FolderIcon, current: false },
  {
    name: "Subscribers",
    path: "/subscribers",
    icon: DocumentDuplicateIcon,
    current: false,
  },
  { name: "Blogs", path: "/blogs", icon: ChartPieIcon, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Sidebar = () => {
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
                      ? "bg-indigo-700 text-white"
                      : "text-indigo-200 hover:bg-indigo-700 hover:text-white",
                    "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                  )}
                >
                  <item.icon
                    className={classNames(
                      item.path === loaction.pathname
                        ? "text-white"
                        : "text-indigo-200 group-hover:text-white",
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
        <li className="mt-auto">
          <a
            href="#"
            className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-indigo-200 hover:bg-indigo-700 hover:text-white"
          >
            <Cog6ToothIcon
              className="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white"
              aria-hidden="true"
            />
            Settings
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
