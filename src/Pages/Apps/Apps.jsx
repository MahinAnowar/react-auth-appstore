// Apps.jsx
import React, { useState, useMemo, useRef } from 'react';
import { useLoaderData, Link } from 'react-router-dom';

// --- Reusable AppCard Component ---
// (AppCard component remains the same as your provided code)
// const AppCard = ({ app }) => (
//     <Link 
//         to={`/appDetails/${app.id}`} 
//         className="block hover:no-underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl"
//     >
//         <div
//             className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-full hover:shadow-2xl transition-shadow duration-300 ease-in-out border border-gray-200"
//         >
//             <div className="relative">
//                 <img
//                     src={app.appLogo} 
//                     alt={`${app.name} logo`}
//                     className="w-full h-40 object-contain bg-gray-100 p-4"
//                 />
//                 <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
//                     {app.rating} ★
//                 </div>
//             </div>
//             <div className="p-5 flex flex-col items-center text-center flex-grow">
//                 <h2 className="text-lg font-semibold text-gray-800 mb-2 min-h-[2.5em] leading-tight">
//                     {app.name}
//                 </h2>
//                 <p className="text-sm text-gray-500 mb-4">
//                     {app.category ? app.category : 'Uncategorized'}
//                 </p>
//                 <p className="text-sm text-gray-500 mb-4">
//                     Downloads: {app.downloads ? app.downloads.toLocaleString() : 'N/A'}
//                 </p>
//                 <button
//                     className="mt-auto cursor-pointer bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
//                 >
//                     View Details
//                 </button>
//             </div>
//         </div>
//     </Link>
// );
const AppCard = ({ app }) => (
    <Link
        to={`/appDetails/${app.id}`} // Ensure app.id is a string or number that matches your route param type
        className="group block rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out border border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label={`View details for ${app.name}`}
    >
        <div className="flex flex-col h-full">
            {/* Image Section with Hover Effect & Badge */}
            <div className="relative aspect-video overflow-hidden"> {/* aspect-video for consistent 16:9 image ratio */}
                <img
                    src={app.appLogo}
                    alt={`${app.name} logo`}
                    className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105" // Group hover effect
                />
                {/* Optional: Gradient overlay for text on image if needed */}
                {/* <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div> */}

                {/* Rating Badge - Positioned better */}
                {typeof app.rating === 'number' && (
                    <div className="absolute top-3 right-3 bg-yellow-400 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                        {app.rating.toFixed(1)}
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="p-5 flex flex-col flex-grow"> {/* items-start to align text left */}
                <h2 className="text-xl font-semibold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors duration-200 truncate"> {/* Truncate long names */}
                    {app.name}
                </h2>
                <p className="text-xs text-gray-500 mb-3">
                    By <span className="font-medium text-gray-600">{app.developer || 'Unknown Developer'}</span>
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                        {app.category || 'Uncategorized'}
                    </span>
                    <span>
                        {app.downloads ? `${(app.downloads / 1000000).toFixed(1)}M+ Dls` : 'N/A'} {/* More compact downloads */}
                    </span>
                </div>
                
                {/* Description Snippet (Optional) */}
                {/* <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {app.description || 'No description available.'} 
                </p> */}

                {/* Call to Action - Now subtle, the whole card is clickable */}
                <div className="mt-auto pt-3 text-right">
                     <span className="text-sm font-semibold text-blue-600 group-hover:underline">
                        View Details →
                    </span>
                </div>
            </div>
        </div>
    </Link>
);




// --- Reusable AppCategorySection Component ---
// (AppCategorySection component remains the same as your provided code)
const AppCategorySection = ({ title, apps, categoryKey, showAll, onViewMore }) => {
    if (!apps || apps.length === 0) {
        return null; 
    }
    const appsToDisplay = showAll ? apps : apps.slice(0, 4);

    return (
        <div className="container mx-auto px-4 py-12"> {/* Standardized padding */}
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">{title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {appsToDisplay.map(app => <AppCard key={`${categoryKey}-${app.id}`} app={app} />)}
            </div>
            {!showAll && apps.length > 4 && (
                <div className="text-center mt-10">
                    <button
                        onClick={() => onViewMore(categoryKey)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        aria-label={`View more ${title.toLowerCase()}`}
                    >
                        View More
                    </button>
                </div>
            )}
        </div>
    );
};


export const Apps = () => {
    const rawAppsData = useLoaderData();
    const appsData = useMemo(() => (Array.isArray(rawAppsData) ? rawAppsData : []), [rawAppsData]);

    const [showAllTrending, setShowAllTrending] = useState(false);
    const [showAllByCategory, setShowAllByCategory] = useState({
        Productivity: false,
        Gaming: false,
        Education: false,
        // Add more categories here if you have them
    });
    // --- NEW STATE FOR MOST DOWNLOADED SECTION ---
    const [showAllMostDownloaded, setShowAllMostDownloaded] = useState(false);


    const trendingSortedApps = useMemo(() => {
        return [...appsData].sort((a, b) => b.rating - a.rating);
    }, [appsData]);

    // --- NEW MEMOIZED DATA FOR MOST DOWNLOADED ---
    const mostDownloadedApps = useMemo(() => {
        return [...appsData].sort((a, b) => (b.downloads || 0) - (a.downloads || 0)); // Handle missing downloads
    }, [appsData]);


    const filterAndSortByCategory = (category) => {
        return appsData
            .filter(app => app.category === category)
            .sort((a, b) => b.rating - a.rating); // Or sort by another metric like downloads for category pages
    };

    const productivityApps = useMemo(() => filterAndSortByCategory("Productivity"), [appsData]);
    const gamingApps = useMemo(() => filterAndSortByCategory("Gaming"), [appsData]);
    const educationApps = useMemo(() => filterAndSortByCategory("Education"), [appsData]);

    const trendingAppsToDisplay = showAllTrending ? trendingSortedApps : trendingSortedApps.slice(0, 4);
    // --- NEW DISPLAY LOGIC FOR MOST DOWNLOADED ---
    const mostDownloadedToDisplay = showAllMostDownloaded ? mostDownloadedApps : mostDownloadedApps.slice(0, 4);

    const handleTrendingViewMore = () => setShowAllTrending(true);
    const handleCategoryViewMore = (categoryKey) => setShowAllByCategory(prev => ({ ...prev, [categoryKey]: true }));
    // --- NEW HANDLER FOR MOST DOWNLOADED VIEW MORE ---
    const handleMostDownloadedViewMore = () => setShowAllMostDownloaded(true);

    
    if (rawAppsData === undefined) {
        return (
            <div className="container mx-auto px-4 py-8 text-center min-h-screen flex flex-col justify-center items-center"> {/* Added min-h-screen */}
                <h1 className="text-3xl font-bold text-gray-800">Loading Apps...</h1>
            </div>
        );
    }
    if (appsData.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8 text-center min-h-screen flex flex-col justify-center items-center"> {/* Added min-h-screen */}
                <h1 className="text-3xl font-bold text-gray-800">No Apps Found</h1>
                <p className="text-gray-600">Please check back later.</p>
            </div>
        );
    }
    
    // (Carousel images remain the same as your provided code)
    const carouselImages = [
        { id: 1, src: "https://i.ibb.co/qYsxFwND/Generated-Image-May-07-2025-3-15-AM.jpg", alt: "Galaxy Raiders Game Banner" },
        { id: 2, src: "https://i.ibb.co/wZvPB6XK/Generated-Image-May-07-2025-3-16-AM-1.jpg", alt: "LinguaLearn App Banner" },
        { id: 3, src: "https://i.ibb.co/yF2tHfLN/Generated-Image-May-07-2025-3-23-AM-1.jpg", alt: "Math Whiz Kids App Banner" },
        { id: 4, src: "https://i.ibb.co/TM2vX3X/Generated-Image-May-07-2025-3-20-AM.jpg", alt: "Puzzle Quest Elements Game Banner" },
        // It seems one of your image links might be a duplicate or typo:
        // The fourth image from your file (https://i.ibb.co.com/TM2v25X3/...) is https://i.ibb.co/TM2vX3X/...
        // I've used the one from your text input
    ];


    return (
        <div className="bg-gray-50 min-h-screen"> {/* Added a light background to the whole page */}
            {/* --- Carousel Section --- */}
            <div className="carousel w-full mb-10">
                {carouselImages.map((image, index) => {
                    const slideId = `carousel-slide${image.id}`;
                    const prevSlideId = `#carousel-slide${carouselImages[(index - 1 + carouselImages.length) % carouselImages.length].id}`;
                    const nextSlideId = `#carousel-slide${carouselImages[(index + 1) % carouselImages.length].id}`;
                    return (
                        <div key={slideId} id={slideId} className="carousel-item relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px]">
                            <img src={image.src} className="w-full h-full object-cover" alt={image.alt} />
                            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                                <a href={prevSlideId} className="btn btn-circle">❮</a>
                                <a href={nextSlideId} className="btn btn-circle">❯</a>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* --- Trending Apps Section (Overall) --- */}
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">Trending Apps</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"> {/* Increased gap */}
                    {trendingAppsToDisplay.map(app => <AppCard key={`trending-${app.id}`} app={app} />)}
                </div>
                {!showAllTrending && trendingSortedApps.length > 4 && (
                    <div className="text-center mt-12"> {/* Increased margin */}
                        <button
                            onClick={handleTrendingViewMore}
                            className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            aria-label="View more trending apps"
                        >
                            View More
                        </button>
                    </div>
                )}
            </div>
            
            <AppCategorySection
                title="Productivity Powerhouses" // More engaging title
                apps={productivityApps}
                categoryKey="Productivity"
                showAll={showAllByCategory.Productivity}
                onViewMore={handleCategoryViewMore}
            />

            <AppCategorySection
                title="Top Tier Gaming" // More engaging title
                apps={gamingApps}
                categoryKey="Gaming"
                showAll={showAllByCategory.Gaming}
                onViewMore={handleCategoryViewMore}
            />

            <AppCategorySection
                title="Educational Excellence" // More engaging title
                apps={educationApps}
                categoryKey="Education"
                showAll={showAllByCategory.Education}
                onViewMore={handleCategoryViewMore}
            />

            {/* --- NEW: Most Downloaded Apps Section --- */}
            <div className="container mx-auto px-4 py-16 bg-slate-100 rounded-xl shadow-inner"> {/* Added styling for differentiation */}
                <h1 className="text-3xl font-bold text-center mb-12 text-gray-800">Community Favorites: Most Downloaded</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {mostDownloadedToDisplay.map(app => <AppCard key={`mostdownloaded-${app.id}`} app={app} />)}
                </div>
                {!showAllMostDownloaded && mostDownloadedApps.length > 4 && (
                    <div className="text-center mt-12">
                        <button
                            onClick={handleMostDownloadedViewMore}
                            className="bg-purple-600 cursor-pointer hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                            aria-label="View more most downloaded apps"
                        >
                            View More
                        </button>
                    </div>
                )}
            </div>
            {/* --- END OF NEW SECTION --- */}
        </div>
    );
};