import { useContext, useEffect, useState } from "react";
import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon, MoonIcon, SunIcon } from "@heroicons/react/20/solid";
import Sidebar from "../Common/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import Context from "../Context/Context";
import swal from "sweetalert";
import Cookies from "js-cookie";

const userNavigation = [
  { name: "Your profile", href: "#" },
  { name: "Sign out", href: "#" },
];

const CommonPage = () => {
  const userDetails = JSON.parse(
    localStorage.getItem("foodieAdminUserDetails"),
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const { defaultMode, setDefaultMode } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleMenuItemClick = (index) => {
    if (index === 1) {
      swal({
        title: "Logout Confirmation",
        text: "Are you sure? This action cannot be undone.",
        icon: "warning",
        buttons: true,
        dangerMode: true,
        className: `${defaultMode ? "dark-swal" : "white-swal"}`,
      }).then((willDelete) => {
        if (willDelete) {
          localStorage.removeItem("foodieAdminUserDetails");
          navigate("/login");
          Cookies.remove("adminJwtToken");
        }
      });
    }
  };

  return (
    <div
      className={`${defaultMode ? "dark" : ""} relative flex min-h-dvh flex-col`}
    >
      <Transition show={sidebarOpen}>
        <Dialog className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
          <TransitionChild
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </TransitionChild>

          <div className="fixed inset-0 flex">
            <TransitionChild
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <DialogPanel className="relative mr-16 flex w-full max-w-xs flex-1">
                <TransitionChild
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </TransitionChild>
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div
                  className={`flex grow flex-col gap-y-5 overflow-y-auto ${defaultMode ? "bg-gray-800" : "bg-indigo-600"} px-6 pb-4`}
                >
                  <div className="flex h-16 shrink-0 items-center">
                    <img
                      className="h-8 w-auto"
                      src={`https://tailwindui.com/img/logos/mark.svg?${defaultMode ? "color=indigo&shade=500" : "color=white"}`}
                      alt="Your Company"
                    />
                  </div>
                  <Sidebar />
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r bg-indigo-600 px-6 pb-4 dark:bg-gray-800">
          <div className="flex h-16 shrink-0 items-center">
            <img
              className="h-8 w-auto"
              src={`https://tailwindui.com/img/logos/mark.svg?${defaultMode ? "color=indigo&shade=500" : "color=white"}`}
              alt="Your Company"
            />
          </div>
          <Sidebar />
        </div>
      </div>

      <div className="flex grow flex-col lg:pl-72">
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm dark:bg-gray-600 sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 dark:text-white lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>

          <div className="flex flex-1 justify-end gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <button
                type="button"
                onClick={() => {
                  setDefaultMode(!defaultMode);
                }}
                className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500 dark:text-white"
              >
                <span className="sr-only">View notifications</span>
                {!defaultMode ? (
                  <MoonIcon className="h-6 w-6" />
                ) : (
                  <SunIcon className="h-6 w-6" />
                )}
              </button>

              {/* Separator */}
              <div
                className="h-6 w-px bg-gray-400 dark:bg-white"
                aria-hidden="true"
              />

              <Popover>
                <PopoverButton className="flex w-full items-center gap-1 px-2 py-1 text-sm/6 font-semibold text-orange-400 outline-none">
                  <img
                    className="h-8 w-8 rounded-full bg-gray-50"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                  <span className="hidden lg:flex lg:items-center">
                    <span
                      className="ml-4 text-sm font-semibold leading-6 text-gray-900 dark:text-white"
                      aria-hidden="true"
                    >
                      {userDetails && userDetails.name}
                    </span>
                    <ChevronDownIcon
                      className="ml-2 h-5 w-5 text-gray-400 dark:text-white"
                      aria-hidden="true"
                    />
                  </span>
                </PopoverButton>
                <Transition
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <PopoverPanel
                    anchor="bottom"
                    className={`popover-shadow z-[100] -ml-4 w-36 divide-y divide-white/5 rounded-md lg:ml-0 ${defaultMode ? "bg-gray-700 text-white" : "bg-white text-black"} text-sm/6 [--anchor-gap:var(--spacing-5)]`}
                  >
                    <div className="flex flex-col justify-start gap-2 py-2">
                      {userNavigation.map((item, i) => (
                        <button
                          onClick={() => handleMenuItemClick(i)}
                          key={i}
                          className={`${defaultMode ? "text-white hover:bg-gray-400" : "text-black hover:bg-indigo-50"} px-4 py-1 text-start`}
                        >
                          {item.name}
                        </button>
                      ))}
                    </div>
                  </PopoverPanel>
                </Transition>
              </Popover>
            </div>
          </div>
        </div>

        <div className="grow bg-slate-50 py-4 dark:bg-gray-600">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </div>
      </div>

      {showScrollToTop && (
        <button
          className="group fixed bottom-4 right-2 animate-bounce rounded-full border border-indigo-500 bg-indigo-50 p-2.5 hover:bg-indigo-200"
          onClick={scrollToTop}
        >
          <ChevronUpIcon className="h-6 w-6 text-indigo-400 group-hover:text-indigo-600" />
        </button>
      )}
    </div>
  );
};

export default CommonPage;
