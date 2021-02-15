import React, { useState } from 'react';
import Typography from '@components/atoms/Typgraphy/Typography';
import Button from '@components/atoms/Button/Button';
import BellIcon from '@components/Icons/BellIcon/BellIcon';
import IconButton from '@components/atoms/IconButton/IconButton';
import SearchForm from '@components/molecules/SearchForm/SearchForm';
import SidebarMobile from '@components/organisms/SidebarMobile.tsx/SidebarMobile';
import Logo from '@components/atoms/Logo/Logo';
import NavLinks from '@components/molecules/NavLinks/NavLinks';
import SidebarDesktop from '@components/organisms/SidebarDesktop/SidebarDesktop';

export default function Home() {
  // State for sidebar menu in mobile view
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      <SidebarMobile isOpen={isOpen} setIsOpen={setIsOpen} />

      <SidebarDesktop />
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
          <button className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden">
            <span className="sr-only">Open sidebar</span>
            {/* <!-- Heroicon name: menu-alt-2 --> */}
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </button>
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex">
              <SearchForm />
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <IconButton
                srOnly="View notification"
                className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => {}}
              >
                <BellIcon />
              </IconButton>
            </div>
          </div>
        </div>

        <main
          className="flex-1 relative overflow-y-auto focus:outline-none"
          tabIndex={0}
        >
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex">
              <Typography
                variant="h1"
                className="text-2xl font-semibold text-gray-900 flex-grow"
              >
                Nodes
              </Typography>
              <a href="create-new-node.html">
                <Button>Create New Node</Button>
              </a>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {/* <!-- Replace with your content --> */}
              <div className="py-4">
                {/* <!-- This example requires Tailwind CSS v2.0+ --> */}
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                  <ul className="divide-y divide-gray-200">
                    {/* <!-- beacon node --> */}
                    <li>
                      <a href="#" className="block hover:bg-gray-50">
                        <div className="px-4 py-4 flex items-center sm:px-6">
                          <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                              <div className="flex text-sm font-medium text-indigo-600 truncate">
                                <p>my-beacon-node</p>
                              </div>
                              <div className="mt-2 flex">
                                <div className="flex items-center text-sm text-gray-500">
                                  {/* <!-- Heroicon name: globe --> */}
                                  <svg
                                    className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="2"
                                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                                    />
                                  </svg>
                                  <p>Pyrmont</p>
                                  {/* <!-- Heroicon name: chip --> */}
                                  <svg
                                    className="flex-shrink-0 ml-1.5 mr-1.5 h-5 w-5 text-gray-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="2"
                                      d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                                    />
                                  </svg>
                                  <p>Prysm</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="ml-5 flex-shrink-0">
                            {/* <!-- Heroicon name: chevron-right --> */}
                            <svg
                              className="h-5 w-5 text-gray-400"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                      </a>
                    </li>
                    {/* <!-- end: beacon node --> */}

                    {/* <!-- filecoin node --> */}
                    <li>
                      <a href="#" className="block hover:bg-gray-50">
                        <div className="px-4 py-4 flex items-center sm:px-6">
                          <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                              <div className="flex text-sm font-medium text-indigo-600 truncate">
                                <p>my-filecoin-node</p>
                              </div>
                              <div className="mt-2 flex">
                                <div className="flex items-center text-sm text-gray-500">
                                  {/* <!-- Heroicon name: globe --> */}
                                  <svg
                                    className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="2"
                                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                                    />
                                  </svg>
                                  <p>Calibration</p>
                                  {/* <!-- Heroicon name: chip --> */}
                                  <svg
                                    className="flex-shrink-0 ml-1.5 mr-1.5 h-5 w-5 text-gray-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="2"
                                      d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                                    />
                                  </svg>
                                  <p>lotus</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="ml-5 flex-shrink-0">
                            {/* <!-- Heroicon name: chevron-right --> */}
                            <svg
                              className="h-5 w-5 text-gray-400"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                      </a>
                    </li>
                    {/* <!-- end: filecoin node --> */}

                    {/* <!-- ethereum node --> */}
                    <li>
                      <a
                        href="my-ethereum-node.html"
                        className="block hover:bg-gray-50"
                      >
                        <div className="px-4 py-4 flex items-center sm:px-6">
                          <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                              <div className="flex text-sm font-medium text-indigo-600 truncate">
                                <p>my-ethereum-node</p>
                              </div>
                              <div className="mt-2 flex">
                                <div className="flex items-center text-sm text-gray-500">
                                  {/* <!-- Heroicon name: globe --> */}
                                  <svg
                                    className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="2"
                                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                                    />
                                  </svg>
                                  <p>Rinkeby</p>
                                  {/* <!-- Heroicon name: chip --> */}
                                  <svg
                                    className="flex-shrink-0 ml-1.5 mr-1.5 h-5 w-5 text-gray-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="2"
                                      d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                                    />
                                  </svg>
                                  <p>Hyperledger Besu</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="ml-5 flex-shrink-0">
                            {/* <!-- Heroicon name: chevron-right --> */}
                            <svg
                              className="h-5 w-5 text-gray-400"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                      </a>
                    </li>
                    {/* <!-- end: ethereum node --> */}
                  </ul>
                </div>
              </div>
              {/* <!-- /End replace --> */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
