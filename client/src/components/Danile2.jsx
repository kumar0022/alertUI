
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const getBadgeColor = (count) => {
    if (count <= 7) return "bg-green-500"; // Green for count <= 7
    if (count <= 10) return "bg-yellow-500"; // Yellow for count > 7 and <= 10
    return "bg-red-500"; // Red for count > 10
};

const SignalThresholds = {
    elongation: 100, // Example threshold value for elongation
    hmd: 75, // Example threshold value for hmd
};

const Danieli = () => {
    const navigate = useNavigate();
    const [activeAlerts, setActiveAlerts] = useState([]);
    const [currentAlertIndex, setCurrentAlertIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const [autoSliding, setAutoSliding] = useState(true);
    const [count, setCount] = useState(0); // Random counter state

    // Random counter logic
    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevCount) => prevCount + Math.floor(Math.random() * 3)); // Increment by 0, 1, or 2
        }, 1000); // Update every 2 seconds

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, []);

    const handleRegionClick = (regionName) => {
        const regionRoutes = {
            "Stand 1-6": "/stand1-6",
            "Shear 1": "/shear1",
            "Stand 7-12": "/stand7-12",
            "Shear 2": "/shear2",
            "Stand 13-18": "/stand13-18",
            "CVR Line 1": "/cvrl1",
            "CVR Line 2": "/cvrl2",
            "FFB Line 1": "/ffbl1",
            "FFB Line 2": "/ffbl2",
            "CVRD L1": "/cvrd1",
            "CVRD L2": "/cvrd2",
            "CVAH L1": "/cvah-l1",
            "CVAH L2": "/cvah-l2",
            "TWC 1A": "/twc-1a",
            "TWC 1B": "/twc-1b",
            "TWC 2A": "/twc-2a",
            "TWC 2B": "/twc-2b",
        };

        const route = regionRoutes[regionName];
        if (route) {
            navigate(route);
        } else {
            console.error(`No route found for region: ${regionName}`);
        }
    };

    // Example alerts - replace with real data
    useEffect(() => {
        const mockAlerts = [
            { id: 1, message: "Elongation value exceeded!", severity: "high", signal: "elongation", value: 105 },
            { id: 2, message: "HMD is normal", severity: "low", signal: "hmd", value: 65 },
            { id: 3, message: "Elongation is within limits", severity: "low", signal: "elongation", value: 85 },
        ];
        setActiveAlerts(mockAlerts);
    }, []);

    // Check thresholds and update state accordingly
    useEffect(() => {
        const exceededThresholdAlert = activeAlerts.find(
            (alert) =>
                (alert.signal === "elongation" && alert.value > SignalThresholds.elongation) ||
                (alert.signal === "hmd" && alert.value > SignalThresholds.hmd)
        );
        if (exceededThresholdAlert) {
            setAutoSliding(false); // Stop auto-sliding when threshold is exceeded
        }
    }, [activeAlerts]);

    // Handle alert carousel rotation
    useEffect(() => {
        if (autoSliding && activeAlerts.length > 1) {
            const interval = setInterval(() => {
                setIsVisible(false);
                setTimeout(() => {
                    setCurrentAlertIndex((prev) =>
                        prev === activeAlerts.length - 1 ? 0 : prev + 1
                    );
                    setIsVisible(true);
                }, 500);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [autoSliding, activeAlerts.length]);

    const handlePrevAlert = () => {
        setIsVisible(false);
        setTimeout(() => {
            setCurrentAlertIndex((prev) =>
                prev === 0 ? activeAlerts.length - 1 : prev - 1
            );
            setIsVisible(true);
        }, 500);
    };

    const handleNextAlert = () => {
        setIsVisible(false);
        setTimeout(() => {
            setCurrentAlertIndex((prev) =>
                prev === activeAlerts.length - 1 ? 0 : prev + 1
            );
            setIsVisible(true);
        }, 500);
    };

    const checkSignalThreshold = (signal, value) => {
        if (signal === "elongation" && value > SignalThresholds.elongation) {
            return true; // Signal exceeded threshold
        }
        if (signal === "hmd" && value > SignalThresholds.hmd) {
            return true; // Signal exceeded threshold
        }
        return false;
    };


    return (
        <div className="bg-gray-100 font-sans min-h-screen">
            {/* Alert Banner */}
            <div className="max-w-7xl mx-auto mb-8 mt-10">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="relative h-24 flex items-center">
                        {activeAlerts.length > 0 && (
                            <div
                                className={`absolute inset-0 flex items-center justify-between px-8 transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"
                                    } ${checkSignalThreshold(activeAlerts[currentAlertIndex]?.signal, activeAlerts[currentAlertIndex]?.value)
                                        ? "bg-red-100 text-red-800"
                                        : activeAlerts[currentAlertIndex]?.severity === "high"
                                            ? "bg-rose-100 text-rose-800"
                                            : activeAlerts[currentAlertIndex]?.severity === "medium"
                                                ? "bg-amber-100 text-amber-800"
                                                : "bg-emerald-100 text-emerald-800"
                                    }`}
                            >
                                <div className="flex-1 text-center text-5xl font-medium">
                                    {activeAlerts[currentAlertIndex]?.message}
                                </div>
                            </div>
                        )}
                    </div>

                    {activeAlerts.length > 1 && (
                        <div className="flex items-center justify-between px-4 py-3 bg-slate-50">
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-slate-500">
                                    {currentAlertIndex + 1} of {activeAlerts.length}
                                </span>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={handlePrevAlert}
                                    className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 19l-7-7 7-7"
                                        />
                                    </svg>
                                </button>
                                <button
                                    onClick={handleNextAlert}
                                    className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Rest of your component... */}
            <div className="flex flex-wrap gap-6 justify-center mt-8">
                {/* Stand 1-6 */}
                <div
                    className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer p-6 min-w-[250px] max-w-xs flex-1 relative overflow-hidden"
                    onClick={() => handleRegionClick("Stand 1-6")}
                >
                    <div className="flex flex-col">
                        <div className="grid grid-cols-2 items-center gap-15 justify-between">
                            <h3 className="text-3xl whitespace-nowrap font-semibold text-slate-800 mb-2">Stand 1-6</h3>
                            <div className="flex items-center justify-between">
                                <span className={`text-white text-6xl font-bold px-4 py-2 rounded-full ${getBadgeColor(count)}`}>
                                    {count}
                                </span>

                            </div>
                        </div>
                    </div>
                </div>


                {/* Shear 1 */}
                <div
                    className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer p-6 min-w-[250px] max-w-xs flex-1 relative overflow-hidden"
                    onClick={() => handleRegionClick("Stand 1-6")}
                >
                    <div className="flex flex-col">
                        <div className="grid grid-cols-2 items-center gap-15 justify-between">
                            <h3 className="text-3xl whitespace-nowrap font-semibold text-slate-800 mb-2">Stand 1-6</h3>
                            <div className="flex items-center justify-between">
                                <span className={`text-white text-6xl font-bold px-4 py-2 rounded-full ${getBadgeColor(count)}`}>
                                    {count}
                                </span>

                            </div>
                        </div>
                    </div>
                </div>


                {/* Stand 7-12 */}
                <div
                    className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer p-6 min-w-[250px] max-w-xs flex-1 relative overflow-hidden"
                    onClick={() => handleRegionClick("Stand 1-6")}
                >
                    <div className="flex flex-col">
                        <div className="grid grid-cols-2 items-center gap-15 justify-between">
                            <h3 className="text-3xl whitespace-nowrap font-semibold text-slate-800 mb-2">Stand 1-6</h3>
                            <div className="flex items-center justify-between">
                                <span className={`text-white text-6xl font-bold px-4 py-2 rounded-full ${getBadgeColor(count)}`}>
                                    {count}
                                </span>

                            </div>
                        </div>
                    </div>
                </div>

                {/* Shear 2 */}
                <div
                    className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer p-6 min-w-[250px] max-w-xs flex-1 relative overflow-hidden"
                    onClick={() => handleRegionClick("Stand 1-6")}
                >
                    <div className="flex flex-col">
                        <div className="grid grid-cols-2 items-center gap-15 justify-between">
                            <h3 className="text-3xl whitespace-nowrap font-semibold text-slate-800 mb-2">Stand 1-6</h3>
                            <div className="flex items-center justify-between">
                                <span className={`text-white text-6xl font-bold px-4 py-2 rounded-full ${getBadgeColor(count)}`}>
                                    {count}
                                </span>

                            </div>
                        </div>
                    </div>
                </div>


                {/* Stand 13-18 */}
                <div
                    className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer p-6 min-w-[250px] max-w-xs flex-1 relative overflow-hidden"
                    onClick={() => handleRegionClick("Stand 1-6")}
                >
                    <div className="flex flex-col">
                        <div className="grid grid-cols-2 items-center gap-15 justify-between">
                            <h3 className="text-3xl whitespace-nowrap font-semibold text-slate-800 mb-2">Stand 1-6</h3>
                            <div className="flex items-center justify-between">
                                <span className={`text-white text-6xl font-bold px-4 py-2 rounded-full ${getBadgeColor(count)}`}>
                                    {count}
                                </span>

                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* CVR Lines */}
            <div className="flex flex-wrap gap-6 justify-center mt-12">
                {/* CVR Line 1 */}
                <div
                    className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer p-6 min-w-[250px] max-w-xs flex-1 relative overflow-hidden"
                    onClick={() => handleRegionClick("Stand 1-6")}
                >
                    <div className="flex flex-col">
                        <div className="grid grid-cols-2 items-center gap-15 justify-between">
                            <h3 className="text-3xl whitespace-nowrap font-semibold text-slate-800 mb-2">Stand 1-6</h3>
                            <div className="flex items-center justify-between">
                                <span className={`text-white text-6xl font-bold px-4 py-2 rounded-full ${getBadgeColor(count)}`}>
                                    {count}
                                </span>

                            </div>
                        </div>
                    </div>
                </div>


                {/* FFB Line 1 */}
                <div
                    className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer p-6 min-w-[250px] max-w-xs flex-1 relative overflow-hidden"
                    onClick={() => handleRegionClick("Stand 1-6")}
                >
                    <div className="flex flex-col">
                        <div className="grid grid-cols-2 items-center gap-15 justify-between">
                            <h3 className="text-3xl whitespace-nowrap font-semibold text-slate-800 mb-2">Stand 1-6</h3>
                            <div className="flex items-center justify-between">
                                <span className={`text-white text-6xl font-bold px-4 py-2 rounded-full ${getBadgeColor(count)}`}>
                                    {count}
                                </span>

                            </div>
                        </div>
                    </div>
                </div>

                {/* CVRD L1 */}
                <div
                    className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer p-6 min-w-[250px] max-w-xs flex-1 relative overflow-hidden"
                    onClick={() => handleRegionClick("Stand 1-6")}
                >
                    <div className="flex flex-col">
                        <div className="grid grid-cols-2 items-center gap-15 justify-between">
                            <h3 className="text-3xl whitespace-nowrap font-semibold text-slate-800 mb-2">Stand 1-6</h3>
                            <div className="flex items-center justify-between">
                                <span className={`text-white text-6xl font-bold px-4 py-2 rounded-full ${getBadgeColor(count)}`}>
                                    {count}
                                </span>

                            </div>
                        </div>
                    </div>
                </div>


                {/* CVAH L1 */}
                <div
                    className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer p-6 min-w-[250px] max-w-xs flex-1 relative overflow-hidden"
                    onClick={() => handleRegionClick("Stand 1-6")}
                >
                    <div className="flex flex-col">
                        <div className="grid grid-cols-2 items-center gap-15 justify-between">
                            <h3 className="text-3xl whitespace-nowrap font-semibold text-slate-800 mb-2">Stand 1-6</h3>
                            <div className="flex items-center justify-between">
                                <span className={`text-white text-6xl font-bold px-4 py-2 rounded-full ${getBadgeColor(count)}`}>
                                    {count}
                                </span>

                            </div>
                        </div>
                    </div>
                </div>


                {/* TWC 1A */}
                <div
                    className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer p-6 min-w-[250px] max-w-xs flex-1 relative overflow-hidden"
                    onClick={() => handleRegionClick("Stand 1-6")}
                >
                    <div className="flex flex-col">
                        <div className="grid grid-cols-2 items-center gap-15 justify-between">
                            <h3 className="text-3xl whitespace-nowrap font-semibold text-slate-800 mb-2">Stand 1-6</h3>
                            <div className="flex items-center justify-between">
                                <span className={`text-white text-6xl font-bold px-4 py-2 rounded-full ${getBadgeColor(count)}`}>
                                    {count}
                                </span>

                            </div>
                        </div>
                    </div>
                </div>


                {/* TWC 2A */}
                <div
                    className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer p-6 min-w-[250px] max-w-xs flex-1 relative overflow-hidden"
                    onClick={() => handleRegionClick("Stand 1-6")}
                >
                    <div className="flex flex-col">
                        <div className="grid grid-cols-2 items-center gap-15 justify-between">
                            <h3 className="text-3xl whitespace-nowrap font-semibold text-slate-800 mb-2">Stand 1-6</h3>
                            <div className="flex items-center justify-between">
                                <span className={`text-white text-6xl font-bold px-4 py-2 rounded-full ${getBadgeColor(count)}`}>
                                    {count}
                                </span>

                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* FFB Lines */}
            <div className="flex flex-wrap gap-6 justify-center mt-12">
                {/* CVR Line 2 */}
                <div
                    className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer p-6 min-w-[250px] max-w-xs flex-1 relative overflow-hidden"
                    onClick={() => handleRegionClick("Stand 1-6")}
                >
                    <div className="flex flex-col">
                        <div className="grid grid-cols-2 items-center gap-15 justify-between">
                            <h3 className="text-3xl whitespace-nowrap font-semibold text-slate-800 mb-2">Stand 1-6</h3>
                            <div className="flex items-center justify-between">
                                <span className={`text-white text-6xl font-bold px-4 py-2 rounded-full ${getBadgeColor(count)}`}>
                                    {count}
                                </span>

                            </div>
                        </div>
                    </div>
                </div>


                {/* FFB Line 2 */}
                <div
                    className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer p-6 min-w-[250px] max-w-xs flex-1 relative overflow-hidden"
                    onClick={() => handleRegionClick("Stand 1-6")}
                >
                    <div className="flex flex-col">
                        <div className="grid grid-cols-2 items-center gap-15 justify-between">
                            <h3 className="text-3xl whitespace-nowrap font-semibold text-slate-800 mb-2">Stand 1-6</h3>
                            <div className="flex items-center justify-between">
                                <span className={`text-white text-6xl font-bold px-4 py-2 rounded-full ${getBadgeColor(count)}`}>
                                    {count}
                                </span>

                            </div>
                        </div>
                    </div>
                </div>


                {/* CVRD L2 */}
                <div
                    className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer p-6 min-w-[250px] max-w-xs flex-1 relative overflow-hidden"
                    onClick={() => handleRegionClick("Stand 1-6")}
                >
                    <div className="flex flex-col">
                        <div className="grid grid-cols-2 items-center gap-15 justify-between">
                            <h3 className="text-3xl whitespace-nowrap font-semibold text-slate-800 mb-2">Stand 1-6</h3>
                            <div className="flex items-center justify-between">
                                <span className={`text-white text-6xl font-bold px-4 py-2 rounded-full ${getBadgeColor(count)}`}>
                                    {count}
                                </span>

                            </div>
                        </div>
                    </div>
                </div>


                {/* CVAH L2 */}
                <div
                    className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer p-6 min-w-[250px] max-w-xs flex-1 relative overflow-hidden"
                    onClick={() => handleRegionClick("Stand 1-6")}
                >
                    <div className="flex flex-col">
                        <div className="grid grid-cols-2 items-center gap-15 justify-between">
                            <h3 className="text-3xl whitespace-nowrap font-semibold text-slate-800 mb-2">Stand 1-6</h3>
                            <div className="flex items-center justify-between">
                                <span className={`text-white text-6xl font-bold px-4 py-2 rounded-full ${getBadgeColor(count)}`}>
                                    {count}
                                </span>

                            </div>
                        </div>
                    </div>
                </div>


                {/* TWC 1B */}
                <div
                    className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer p-6 min-w-[250px] max-w-xs flex-1 relative overflow-hidden"
                    onClick={() => handleRegionClick("Stand 1-6")}
                >
                    <div className="flex flex-col">
                        <div className="grid grid-cols-2 items-center gap-15 justify-between">
                            <h3 className="text-3xl whitespace-nowrap font-semibold text-slate-800 mb-2">Stand 1-6</h3>
                            <div className="flex items-center justify-between">
                                <span className={`text-white text-6xl font-bold px-4 py-2 rounded-full ${getBadgeColor(count)}`}>
                                    {count}
                                </span>

                            </div>
                        </div>
                    </div>
                </div>

                {/* TWC 2B */}
                <div
                    className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer p-6 min-w-[250px] max-w-xs flex-1 relative overflow-hidden"
                    onClick={() => handleRegionClick("Stand 1-6")}
                >
                    <div className="flex flex-col">
                        <div className="grid grid-cols-2 items-center gap-15 justify-between">
                            <h3 className="text-3xl whitespace-nowrap font-semibold text-slate-800 mb-2">Stand 1-6</h3>
                            <div className="flex items-center justify-between">
                                <span className={`text-white text-6xl font-bold px-4 py-2 rounded-full ${getBadgeColor(count)}`}>
                                    {count}
                                </span>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Danieli;
