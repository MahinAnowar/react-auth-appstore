// src/Pages/AppDetails/AppDetails.jsx
import React, { useState, useMemo, useEffect, useContext } from 'react';
import { useLoaderData, useParams, useNavigate, useLocation } from 'react-router-dom'; // Added useLocation
import { AuthContext } from './../../Provider/AuthProvider';
import Swal from 'sweetalert2'; // Swal is already imported from your provided code

const AppDetails = () => {
    const allApps = useLoaderData();
    const { id: paramId } = useParams();
    const navigate = useNavigate();
    const location = useLocation(); // For redirecting after login prompt
    const { user } = useContext(AuthContext);

    const [isInstalled, setIsInstalled] = useState(false);
    const [hasInstalledOnce, setHasInstalledOnce] = useState(false); 
    const [userReviewText, setUserReviewText] = useState('');
    const [userRating, setUserRating] = useState(0);
    const [sessionReviews, setSessionReviews] = useState([]);

    const currentApp = useMemo(() => {
        if (!allApps || !Array.isArray(allApps) || !paramId) return null;
        return allApps.find(app => app && String(app.id) === String(paramId)) || null;
    }, [allApps, paramId]);
    
    useEffect(() => {
        setIsInstalled(false);
        setHasInstalledOnce(false); 
        setUserReviewText('');
        setUserRating(0);
        setSessionReviews([]);
        window.scrollTo(0, 0);
    }, [paramId]);

    // --- MODIFIED FUNCTION ---
    const handleInstallToggle = () => {
        const appToNotify = currentApp ? currentApp.name : "The app"; // Get app name for message
        const nextIsInstalledState = !isInstalled; // Determine what the next state will be

        setIsInstalled(prevState => {
            const newState = !prevState; 
            if (newState && !hasInstalledOnce) { 
                setHasInstalledOnce(true);
            }
            return newState;
        });

        // Show SweetAlert based on the action (installing or uninstalling)
        if (nextIsInstalledState) { // If the action was to install
            Swal.fire({
                icon: 'success',
                title: 'Installed!',
                text: `${appToNotify} has been successfully installed.`,
                showConfirmButton: false,
                timer: 1500
            });
        } else { // If the action was to uninstall
            Swal.fire({
                icon: 'info',
                title: 'Uninstalled',
                text: `${appToNotify} has been uninstalled.`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    };
    // --- END OF MODIFIED FUNCTION ---

    const handleRatingChange = (e) => {
        setUserRating(parseInt(e.target.value));
    };

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        if (!user) {
            Swal.fire({
                icon: 'warning',
                title: 'Login Required',
                text: 'Please log in to submit a review.',
                confirmButtonText: 'Go to Login'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } });
                }
            });
            return;
        }

        if (!hasInstalledOnce) {
            Swal.fire({
                icon: 'info',
                title: 'Installation Required',
                text: 'You must install the app (or have installed it previously this session) before submitting a review.',
            });
            return; 
        }

        if (userRating === 0 || !userReviewText.trim()) {
            Swal.fire({
                icon: 'error',
                title: 'Missing Information',
                text: 'Please provide both a star rating and a review comment.',
            });
            return;
        }

        const newReview = {
            user: user.displayName || "Anonymous User",
            rating: userRating,
            comment: userReviewText,
            isSessionReview: true
        };

        setSessionReviews(prevReviews => [...prevReviews, newReview]);
        
        Swal.fire({
            icon: 'success',
            title: 'Review Submitted!',
            text: 'Your review has been added for this session.',
            showConfirmButton: false,
            timer: 1500
        });
        
        setUserReviewText('');
        setUserRating(0);
    };

    if (allApps === undefined || (Array.isArray(allApps) && allApps.length === 0 && !currentApp)) { 
        return (
            <div className="container mx-auto px-4 py-8 text-center min-h-screen flex flex-col justify-center items-center">
                <h1 className="text-2xl font-semibold text-gray-700">Loading App Details...</h1>
            </div>
        );
    }
    if (!currentApp) { 
        return (
            <div className="container mx-auto px-4 py-8 text-center min-h-screen flex flex-col justify-center items-center">
                <h1 className="text-2xl font-bold text-red-600">App Not Found</h1>
                <p className="text-gray-600 mt-4">Details for app ID "{paramId}" were not found.</p>
                <button onClick={() => navigate('/apps')} className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">Back to Apps</button>
            </div>
        );
    }

    const {
        name = "Unnamed App",
        developer = "Unknown Developer",
        appLogo, // Assuming your data uses appLogo for the thumbnail
        banner, downloads,
        category = "Uncategorized",
        rating,
        description = "No description available.",
        features = [],
        reviews: initialReviews = []
    } = currentApp;

    const displayDownloads = typeof downloads === 'number' ? downloads.toLocaleString() : "N/A";
    const displayRating = typeof rating === 'number' ? rating.toFixed(1) : "N/A";
    const combinedReviews = [...initialReviews, ...sessionReviews];

    return (
        <div className="container mx-auto px-4 py-8">
             {/* Banner Image */}
             <div className="mb-8 rounded-lg overflow-hidden shadow-lg h-64 md:h-80 bg-gray-200">
                {banner ? (
                    <img src={banner} alt={`${name} banner`} className="w-full h-full object-cover"/>
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">No Banner Available</div>
                )}
            </div>

            {/* App Header */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start mb-8">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl border-4 border-gray-200 shadow-md mb-4 sm:mb-0 sm:mr-6 bg-gray-100 flex-shrink-0">
                     {appLogo ? (
                        <img src={appLogo} alt={`${name} logo`} className="w-full h-full object-contain rounded-xl p-1"/>
                     ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-gray-400 p-2 text-center">No Logo</div>
                     )}
                </div>
                <div className="flex-1 text-center sm:text-left">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-1">{name}</h1>
                    <p className="text-lg text-blue-600 hover:underline mb-2">{developer}</p>
                    <div className="text-sm text-gray-500 mb-3 flex flex-wrap items-center justify-center sm:justify-start gap-x-3">
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
                    <button
                        onClick={handleInstallToggle} // This now calls the modified function
                        className={`w-full sm:w-auto px-8 py-3 rounded-lg font-semibold text-white transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-opacity-50 shadow-md
                            ${isInstalled 
                                ? 'bg-red-500 hover:bg-red-600 focus:ring-red-400' 
                                : 'bg-green-500 hover:bg-green-600 focus:ring-green-400'}`}
                    >
                        {isInstalled ? 'Uninstall' : 'Install'}
                    </button>
                </div>
            </div>

            {/* Description */}
            <div className="mb-8 p-6 bg-white rounded-lg shadow">
                <h2 className="text-2xl font-semibold text-gray-700 mb-3">Description</h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{description}</p>
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


            {/* User Review Section - Form visibility tied to isInstalled */}
            {isInstalled && user && (
                <div className="mb-8 p-6 bg-white rounded-lg shadow">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Write Your Review</h2>
                    <form onSubmit={handleReviewSubmit}>
                        <div className="mb-4">
                            <label htmlFor="userRatingInputs" className="block text-sm font-medium text-gray-700 mb-1">Your Rating (1-5 stars):</label>
                            <div id="userRatingInputs" className="rating rating-md gap-1">
                                {[1, 2, 3, 4, 5].map(starValue => (
                                    <input 
                                        key={starValue} 
                                        type="radio" 
                                        name="userRatingInputGroup"
                                        value={starValue} 
                                        className="mask mask-star-2 bg-orange-400 checked:bg-orange-500 focus:bg-orange-500"
                                        checked={userRating === starValue} 
                                        onChange={handleRatingChange} 
                                        aria-label={`${starValue} star`}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="userReviewText" className="block text-sm font-medium text-gray-700 mb-1">Your Review:</label>
                            <textarea 
                                id="userReviewText" 
                                name="userReviewText" 
                                rows="4" 
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2" 
                                placeholder="Share your thoughts..." 
                                value={userReviewText} 
                                onChange={(e) => setUserReviewText(e.target.value)} 
                            ></textarea>
                        </div>
                        <button 
                            type="submit" 
                            disabled={!hasInstalledOnce || userRating === 0 || !userReviewText.trim()}
                            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            Submit Review
                        </button>
                    </form>
                </div>
            )}
            {isInstalled && !user && (
                <div className="mb-8 p-6 bg-yellow-50 border border-yellow-200 rounded-lg shadow text-center">
                    <p className="text-yellow-700">You must be <button onClick={() => navigate('/login', { state: { from: location }})} className="font-semibold underline hover:text-yellow-800">logged in</button> to submit a review.</p>
                </div>
            )}
             {!isInstalled && hasInstalledOnce && user && (
                 <div className="mb-8 p-6 bg-blue-50 border border-blue-200 rounded-lg shadow text-center">
                     <p className="text-blue-700">You can write a review for this app if you install it. <br/> (You've installed it previously this session, so reviews are enabled for you once installed).</p>
                 </div>
             )}

             {(combinedReviews && combinedReviews.length > 0) ? (
                <div className="p-6 bg-white rounded-lg shadow">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-6">
                        User Reviews ({combinedReviews.length})
                    </h2>
                    <div className="space-y-6">
                        {combinedReviews.map((review, index) => (
                            <div key={review.isSessionReview ? `session-${index}` : `initial-${index}`} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                                <div className="flex items-center mb-1">
                                    <p className="font-semibold text-gray-800 mr-3">{review.user || "Anonymous"}</p>
                                    {typeof review.rating === 'number' && (
                                        <div className="flex text-yellow-500">
                                            {[...Array(5)].map((_, i) => (
                                                <svg 
                                                    key={i} 
                                                    className={`h-4 w-4 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`} 
                                                    viewBox="0 0 20 20" 
                                                    fill="currentColor"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{review.comment || "No comment provided."}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="p-6 bg-white rounded-lg shadow text-center">
                     {hasInstalledOnce && user ? 
                        <p className="text-gray-500">No reviews yet. Be the first to review this app!</p> 
                        :
                        <p className="text-gray-500">Install the app to write a review.</p>
                    }
                </div>
            )}
        </div>
    );
};

export default AppDetails;