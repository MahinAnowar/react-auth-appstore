import React, { useState, useMemo } from 'react';
import { useLoaderData } from 'react-router-dom';

// The component name should generally start with an uppercase letter by convention.
// If your file is named Apps.jsx or apps.jsx, and you're exporting it,
// it's common to use 'Apps' as the component name.
export const Apps = () => { // This is the main component function

    const appsData = useLoaderData();
    const [showAllApps, setShowAllApps] = useState(false);

    // Memoize the sorted apps to avoid re-sorting on every render
    // unless appsData itself changes.
    const sortedApps = useMemo(() => {
      if (!appsData || !Array.isArray(appsData)) {
          console.warn("appsData is not an array or is undefined:", appsData);
          return []; // Return an empty array if data is not as expected
      }
      // Create a new array for sorting to avoid mutating the original loader data
      return [...appsData].sort((a, b) => b.rating - a.rating);
    }, [appsData]);

    const appsToDisplay = showAllApps ? sortedApps : sortedApps.slice(0, 4);

    const handleViewMore = () => {
      setShowAllApps(true);
    };

    // Handle loading or no data state
    if (!appsData) {
      return (
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl font-bold mb-8 text-gray-800">Trending apps</h1>
          <p className="text-gray-600">Loading app data...</p>
        </div>
      );
    }

    if (appsData.length === 0) {
       return (
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl font-bold mb-8 text-gray-800">Trending apps</h1>
          <p className="text-gray-600">No apps found.</p>
        </div>
      );
    }

    return (
        <div> 
            <div className="carousel w-full mb-10"> 
                <div id="slide1" className="carousel-item relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px]"> 
                    <img
                        src="https://i.ibb.co.com/qYsxFwND/Generated-Image-May-07-2025-3-15-AM.jpg"
                        className="w-full h-full object-cover" /> {/* object-cover */}
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide4" className="btn btn-circle">❮</a>
                        <a href="#slide2" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide2" className="carousel-item relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px]">
                    <img
                        src="https://i.ibb.co.com/wZvPB6XK/Generated-Image-May-07-2025-3-16-AM-1.jpg"
                        className="w-full h-full object-cover" />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide1" className="btn btn-circle">❮</a>
                        <a href="#slide3" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide3" className="carousel-item relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px]">
                    <img
                        src="https://i.ibb.co.com/yF2tHfLN/Generated-Image-May-07-2025-3-23-AM-1.jpg"
                        className="w-full h-full object-cover" />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide2" className="btn btn-circle">❮</a>
                        <a href="#slide4" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide4" className="carousel-item relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px]">
                    <img
                        src="https://i.ibb.co.com/TM2v25X3/Generated-Image-May-07-2025-3-20-AM.jpg"
                        className="w-full h-full object-cover" />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide3" className="btn btn-circle">❮</a>
                        <a href="#slide1" className="btn btn-circle">❯</a>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
              <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">Trending apps</h1>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {appsToDisplay.map(app => (
                  <div
                    key={app.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col hover:shadow-2xl transition-shadow duration-300 ease-in-out"
                  >
                    <div className="p-5 flex flex-col items-center text-center flex-grow">
                      <img
                        src={app.appLogo}
                        alt={`${app.name} logo`}
                        className="w-28 h-28 object-contain rounded-full mb-4 border-4 border-gray-200 shadow-sm"
                      />
                      <h2 className="text-xl font-semibold text-gray-700 mb-1 min-h-[2.5em] leading-tight">{app.name}</h2>
                      <p className="text-sm text-gray-500 mb-2">
                        Downloads: {app.downloads.toLocaleString()}
                      </p>
                      <div className="flex items-center justify-center text-yellow-500 mt-auto pt-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="font-bold text-md">{app.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {!showAllApps && sortedApps.length > 4 && (
                <div className="text-center mt-10">
                  <button
                    onClick={handleViewMore}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    aria-label="View more trending apps"
                  >
                    View More
                  </button>
                </div>
              )}
            </div>
        </div>
    );
};

