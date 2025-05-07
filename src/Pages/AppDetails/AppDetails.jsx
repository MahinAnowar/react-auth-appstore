// src/Pages/AppDetails/AppDetails.jsx
import React, { useState, useMemo, useEffect } from 'react';
import { useLoaderData, useParams, useNavigate } from 'react-router-dom';

const AppDetails = () => {
    const allApps = useLoaderData();
    const { id: paramId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("AppDetails mounted/updated. Param ID:", paramId);
        console.log("AppDetails: `allApps` from loader:", allApps);
        // ... (other debug logs can be kept or removed as needed)
    }, [allApps, paramId]);

    const [isInstalled, setIsInstalled] = useState(false);
    const [userReview, setUserReview] = useState('');
    const [userRating, setUserRating] = useState(0);

    const currentApp = useMemo(() => {
        if (!allApps || !Array.isArray(allApps) || !paramId) return null;
        const numericId = parseInt(paramId);
        if (isNaN(numericId)) return null;
        return allApps.find(app => app && typeof app.id === 'number' && app.id === numericId) || null;
    }, [allApps, paramId]);
    
    useEffect(() => {
        setIsInstalled(false);
        setUserReview('');
        setUserRating(0);
        window.scrollTo(0, 0);
    }, [paramId]);

    const handleInstallToggle = () => {
        const wasInstalled = isInstalled;
        setIsInstalled(prevState => !prevState);
        if (wasInstalled) {
            setUserReview('');
            setUserRating(0);
        }
    };

    const handleRatingChange = (e) => setUserRating(parseInt(e.target.value));

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        if (!currentApp) return;
        console.log("Review Submitted (DEMO):", { appId: currentApp.id, rating: userRating, comment: userReview });
        alert(`Review for ${currentApp.name || 'this app'}:\nRating: ${userRating} stars\nComment: "${userReview}"\n(This is a demo, data not saved)`);
    };

    if (allApps === undefined) { /* ... (Loading state same as before) ... */ 
        return (
            <div className="container mx-auto px-4 py-8 text-center min-h-screen flex flex-col justify-center items-center">
                <h1 className="text-2xl font-semibold text-gray-700">Loading App Details...</h1>
            </div>
        );
    }
    if (!currentApp) { /* ... (Not Found state same as before) ... */ 
        return (
            <div className="container mx-auto px-4 py-8 text-center min-h-screen flex flex-col justify-center items-center">
                <h1 className="text-2xl font-bold text-red-600">App Not Found</h1>
                <p className="text-gray-600 mt-4">Details for ID "{paramId}" not found.</p>
                <button onClick={() => navigate('/apps')} className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">Back to Apps</button>
            </div>
        );
    }

    const {
        name = "Unnamed App",
        developer = "Unknown Developer",
        appLogo, banner, downloads,
        category = "Uncategorized",
        rating,
        description = "No description available.",
        features = [],
        reviews = []
    } = currentApp;

    const displayDownloads = typeof downloads === 'number' ? downloads.toLocaleString() : "N/A";
    const displayRating = typeof rating === 'number' ? rating.toFixed(1) : "N/A";

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Banner Image */}
            <div className="mb-8 rounded-lg overflow-hidden shadow-lg h-64 md:h-80 bg-gray-200">
                {banner ? (
                    <img src={banner} alt={`${name} banner`} className="w-full h-full object-cover"/>
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">No Banner</div>
                )}
            </div>

            {/* App Header */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start mb-8">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl border-4 border-gray-200 shadow-md mb-4 sm:mb-0 sm:mr-6 bg-gray-100 flex-shrink-0">
                     {appLogo ? (
                        <img src={appLogo} alt={`${name} logo`} className="w-full h-full object-contain rounded-xl"/>
                     ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-gray-400 p-2 text-center">No Logo</div>
                     )}
                </div>
                <div className="flex-1 text-center sm:text-left">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-1">{name}</h1>
                    <p className="text-lg text-blue-600 hover:underline mb-2">{developer}</p>
                    <div className="text-sm text-gray-500 mb-3 flex flex-wrap items-center justify-center sm:justify-start gap-x-2">
                        <span>{category}</span>
                        <span>•</span>
                        <span>Downloads: {displayDownloads}</span>
                        <span>•</span>
                        <span className="flex items-center text-yellow-500">
                            {typeof rating === 'number' && (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                            )}
                            {displayRating}
                        </span>
                    </div>
                    {/* STYLING RESTORED HERE */}
                    <button
                        onClick={handleInstallToggle}
                        className={`w-full cursor-pointer sm:w-auto px-8 py-3 rounded-lg font-semibold text-white transition-colors duration-200 ease-in-out
                            ${isInstalled 
                                ? 'bg-red-500 hover:bg-red-600 focus:ring-red-400' 
                                : 'bg-green-500 hover:bg-green-600 focus:ring-green-400'}
                            focus:outline-none focus:ring-2 focus:ring-opacity-50 shadow-md`}
                    >
                        {isInstalled ? 'Uninstall' : 'Install'}
                    </button>
                </div>
            </div>

            {/* Description */}
            <div className="mb-8 p-6 bg-white rounded-lg shadow">
                <h2 className="text-2xl font-semibold text-gray-700 mb-3">Description</h2>
                <p className="text-gray-600 leading-relaxed">{description}</p>
            </div>

            {/* Features */}
            {features && features.length > 0 && (
                <div className="mb-8 p-6 bg-white rounded-lg shadow">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Features</h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                        {features.map((feature, index) => <li key={index}>{feature}</li>)}
                    </ul>
                </div>
            )}

            {/* User Review Section */}
            {isInstalled && (
                <div className="mb-8 p-6 bg-white rounded-lg shadow">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Write a Review</h2>
                    <form onSubmit={handleReviewSubmit}>
                        <div className="mb-4">
                            <label htmlFor="userRatingInputs" className="block text-sm font-medium text-gray-700 mb-1">Your Rating:</label>
                            <div id="userRatingInputs" className="rating rating-md">
                                {[1, 2, 3, 4, 5].map(starValue => (
                                    <input key={starValue} type="radio" name="userRating" value={starValue} className="mask mask-star-2 bg-orange-400" checked={userRating === starValue} onChange={handleRatingChange} aria-label={`${starValue} star`}/>
                                ))}
                            </div>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="userReview" className="block text-sm font-medium text-gray-700 mb-1">Your Review:</label>
                            <textarea id="userReview" name="userReview" rows="4" className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2" placeholder="Share your thoughts..." value={userReview} onChange={(e) => setUserReview(e.target.value)} required={userRating > 0}></textarea>
                        </div>
                        <button type="submit" disabled={userRating === 0 || !userReview.trim()} className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:bg-gray-300 disabled:cursor-not-allowed">
                            Submit Review
                        </button>
                    </form>
                </div>
            )}

            {/* Existing Reviews */}
            {reviews && reviews.length > 0 && (
                <div className="p-6 bg-white rounded-lg shadow">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">User Reviews ({reviews.length})</h2>
                    <div className="space-y-6">
                        {reviews.map((review, index) => (
                            <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                                <div className="flex items-center mb-1 gap-2">
                                    <p className="font-semibold text-gray-800 mr-2">{review.user || "Anonymous"}</p>
                                    {typeof review.rating === 'number' && (
                                        <div className="flex text-yellow-500 justify-center items-center">
                                            {[...Array(5)].map((_, i) => <svg key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
                                            
                                        </div>
                                    )}
                                    {displayRating}
                                </div>
                                <p className="text-gray-600">{review.comment || "No comment."}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AppDetails;