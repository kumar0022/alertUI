import React from "react";
import { useNavigate } from "react-router-dom";
import CustomAlerts from "./Custom_logic";
import { useEffect } from "react";
import { useState } from "react";

const getBadgeColor = (alertCount) => {
    if (alertCount <= 3) return "bg-green-500";
    if (alertCount <= 6) return "bg-yellow-500";
    return "bg-red-500";
};
const SignalThresholds = {
    elongation: 100, // Example threshold value for elongation
    hmd: 75 // Example threshold value for hmd
};
const Danieli = () => {
    const navigate = useNavigate();

    const [activeAlerts, setActiveAlerts] = useState([]);
    const [currentAlertIndex, setCurrentAlertIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const [autoSliding, setAutoSliding] = useState(true);

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
            "TWC 2B": "/twc-2b"
        };

        const route = regionRoutes[regionName];
        if (route) {
            navigate(route);
        } else {
            console.error(`No route found for region: ${regionName}`);

        }
    }

    // Example alerts - replace with real data
    useEffect(() => {
        const mockAlerts = [
            { id: 1, message: "Elongation value exceeded!", severity: "high", signal: "elongation", value: 105 },
            { id: 2, message: "HMD is normal", severity: "low", signal: "hmd", value: 65 },
            { id: 3, message: "Elongation is within limits", severity: "low", signal: "elongation", value: 85 }
        ];
        setActiveAlerts(mockAlerts);
    }, []);

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
    }, [activeAlerts.length, autoSliding]);

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
            setAutoSliding(false);
            return true; // Signal exceeded threshold
        }
        if (signal === "hmd" && value > SignalThresholds.hmd) {
            setAutoSliding(false);
            return true; // Signal exceeded threshold
        }
        return false;
    };




    return (<div>



        <div className="bg-gray-100 font-sans min-h-screen">




            {/* Alert Banner */}
            {/* <div className="max-w-7xl mx-auto mb-8">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="relative h-24 flex items-center">
                        <div className={`absolute inset-0 flex items-center justify-between px-8 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'
                            } ${activeAlerts[currentAlertIndex]?.severity === "high" ? "bg-rose-100 text-rose-800" :
                                activeAlerts[currentAlertIndex]?.severity === "medium" ? "bg-amber-100 text-amber-800" :
                                    "bg-emerald-100 text-emerald-800"
                            }`}>
                            <div className="flex-1 text-center font-medium">
                                {activeAlerts[currentAlertIndex]?.message}
                            </div>
                        </div>
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
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <button
                                    onClick={handleNextAlert}
                                    className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div> */}
            <div className="max-w-7xl mx-auto mb-8">
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
                                <div className="flex-1 text-center font-medium">
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
            {/* First Row */}
            <div className="flex flex-wrap gap-6 justify-center mt-8">
                {/* Stand 1-6 */}
                <div
                    className="flex-1 min-w-[250px] max-w-xs p-4 border rounded-lg bg-white shadow-md cursor-pointer hover:bg-gray-50"
                    onClick={() => handleRegionClick("Stand 1-6")}
                >
                    <div className="font-semibold text-xl text-gray-800">Stand 1-6</div>
                    <div className="alert-count text-sm mt-2">
                        <span className={`alert-badge ${getBadgeColor(3)} text-white px-2 py-1 rounded-full`}>
                            3 Alerts
                        </span>
                    </div>
                </div>

                {/* Shear 1 */}
                <div
                    className="flex-1 min-w-[250px] max-w-xs p-4 border rounded-lg bg-white shadow-md cursor-pointer hover:bg-gray-50"
                    onClick={() => handleRegionClick("Shear 1")}
                >
                    <div className="font-semibold text-xl text-gray-800">Shear 1</div>
                    <div className="alert-count text-sm mt-2">
                        <span className={`alert-badge ${getBadgeColor(5)} text-white px-2 py-1 rounded-full`}>
                            5 Alerts
                        </span>
                    </div>
                </div>

                {/* Stand 7-12 */}
                <div
                    className="flex-1 min-w-[250px] max-w-xs p-4 border rounded-lg bg-white shadow-md cursor-pointer hover:bg-gray-50"
                    onClick={() => handleRegionClick("Stand 7-12")}
                >
                    <div className="font-semibold text-xl text-gray-800">Stand 7-12</div>
                    <div className="alert-count text-sm mt-2">
                        <span className={`alert-badge ${getBadgeColor(8)} text-white px-2 py-1 rounded-full`}>
                            8 Alerts
                        </span>
                    </div>
                </div>

                {/* Shear 2 */}
                <div
                    className="flex-1 min-w-[250px] max-w-xs p-4 border rounded-lg bg-white shadow-md cursor-pointer hover:bg-gray-50"
                    onClick={() => handleRegionClick("Shear 2")}
                >
                    <div className="font-semibold text-xl text-gray-800">Shear 2</div>
                    <div className="alert-count text-sm mt-2">
                        <span className={`alert-badge ${getBadgeColor(2)} text-white px-2 py-1 rounded-full`}>
                            2 Alerts
                        </span>
                    </div>
                </div>

                {/* Stand 13-18 */}
                <div
                    className="flex-1 min-w-[250px] max-w-xs p-4 border rounded-lg bg-white shadow-md cursor-pointer hover:bg-gray-50"
                    onClick={() => handleRegionClick("Stand 13-18")}
                >
                    <div className="font-semibold text-xl text-gray-800">Stand 13-18</div>
                    <div className="alert-count text-sm mt-2">
                        <span className={`alert-badge ${getBadgeColor(12)} text-white px-2 py-1 rounded-full`}>
                            12 Alerts
                        </span>
                    </div>
                </div>
            </div>

            {/* CVR Lines */}
            <div className="flex flex-wrap gap-6 justify-center mt-12">
                {/* CVR Line 1 */}
                <div
                    className="flex-1 min-w-[250px] max-w-xs p-4 border rounded-lg bg-white shadow-md cursor-pointer hover:bg-gray-50"
                    onClick={() => handleRegionClick("CVR Line 1")}
                >
                    <div className="font-semibold text-xl text-gray-800">CVR Line 1</div>
                    <div className="alert-count text-sm mt-2">
                        <span className={`alert-badge ${getBadgeColor(4)} text-white px-2 py-1 rounded-full`}>
                            4 Alerts
                        </span>
                    </div>
                </div>

                {/* FFB Line 1 */}
                <div
                    className="flex-1 min-w-[250px] max-w-xs p-4 border rounded-lg bg-white shadow-md cursor-pointer hover:bg-gray-50"
                    onClick={() => handleRegionClick("FFB Line 1")}
                >
                    <div className="font-semibold text-xl text-gray-800">FFB Line 1</div>
                    <div className="alert-count text-sm mt-2">
                        <span className={`alert-badge ${getBadgeColor(1)} text-white px-2 py-1 rounded-full`}>
                            1 Alert
                        </span>
                    </div>
                </div>

                {/* CVRD L1 */}
                <div
                    className="flex-1 min-w-[250px] max-w-xs p-4 border rounded-lg bg-white shadow-md cursor-pointer hover:bg-gray-50"
                    onClick={() => handleRegionClick("CVRD L1")}
                >
                    <div className="font-semibold text-xl text-gray-800">CVRD L1</div>
                    <div className="alert-count text-sm mt-2">
                        <span className={`alert-badge ${getBadgeColor(7)} text-white px-2 py-1 rounded-full`}>
                            7 Alerts
                        </span>
                    </div>
                </div>

                {/* CVAH L1 */}
                <div
                    className="flex-1 min-w-[250px] max-w-xs p-4 border rounded-lg bg-white shadow-md cursor-pointer hover:bg-gray-50"
                    onClick={() => handleRegionClick("CVAH L1")}
                >
                    <div className="font-semibold text-xl text-gray-800">CVAH L1</div>
                    <div className="alert-count text-sm mt-2">
                        <span className={`alert-badge ${getBadgeColor(7)} text-white px-2 py-1 rounded-full`}>
                            7 Alerts
                        </span>
                    </div>
                </div>

                {/* TWC 1A */}
                <div
                    className="flex-1 min-w-[250px] max-w-xs p-4 border rounded-lg bg-white shadow-md cursor-pointer hover:bg-gray-50"
                    onClick={() => handleRegionClick("TWC 1A")}
                >
                    <div className="font-semibold text-xl text-gray-800">TWC 1A</div>
                    <div className="alert-count text-sm mt-2">
                        <span className={`alert-badge ${getBadgeColor(7)} text-white px-2 py-1 rounded-full`}>
                            7 Alerts
                        </span>
                    </div>
                </div>

                {/* TWC 2A */}
                <div
                    className="flex-1 min-w-[250px] max-w-xs p-4 border rounded-lg bg-white shadow-md cursor-pointer hover:bg-gray-50"
                    onClick={() => handleRegionClick("TWC 2A")}
                >
                    <div className="font-semibold text-xl text-gray-800">TWC 2A</div>
                    <div className="alert-count text-sm mt-2">
                        <span className={`alert-badge ${getBadgeColor(7)} text-white px-2 py-1 rounded-full`}>
                            7 Alerts
                        </span>
                    </div>
                </div>
            </div>

            {/* FFB Lines */}
            <div className="flex flex-wrap gap-6 justify-center mt-12">
                {/* CVR Line 2 */}
                <div
                    className="flex-1 min-w-[250px] max-w-xs p-4 border rounded-lg bg-white shadow-md cursor-pointer hover:bg-gray-50"
                    onClick={() => handleRegionClick("CVR Line 2")}
                >
                    <div className="font-semibold text-xl text-gray-800">CVR Line 2</div>
                    <div className="alert-count text-sm mt-2">
                        <span className={`alert-badge ${getBadgeColor(6)} text-white px-2 py-1 rounded-full`}>
                            6 Alerts
                        </span>
                    </div>
                </div>

                {/* FFB Line 2 */}
                <div
                    className="flex-1 min-w-[250px] max-w-xs p-4 border rounded-lg bg-white shadow-md cursor-pointer hover:bg-gray-50"
                    onClick={() => handleRegionClick("FFB Line 2")}
                >
                    <div className="font-semibold text-xl text-gray-800">FFB Line 2</div>
                    <div className="alert-count text-sm mt-2">
                        <span className={`alert-badge ${getBadgeColor(7)} text-white px-2 py-1 rounded-full`}>
                            7 Alerts
                        </span>
                    </div>
                </div>

                {/* CVRD L2 */}
                <div
                    className="flex-1 min-w-[250px] max-w-xs p-4 border rounded-lg bg-white shadow-md cursor-pointer hover:bg-gray-50"
                    onClick={() => handleRegionClick("CVRD L2")}
                >
                    <div className="font-semibold text-xl text-gray-800">CVRD L2</div>
                    <div className="alert-count text-sm mt-2">
                        <span className={`alert-badge ${getBadgeColor(7)} text-white px-2 py-1 rounded-full`}>
                            7 Alerts
                        </span>
                    </div>
                </div>

                {/* CVAH L2 */}
                <div
                    className="flex-1 min-w-[250px] max-w-xs p-4 border rounded-lg bg-white shadow-md cursor-pointer hover:bg-gray-50"
                    onClick={() => handleRegionClick("CVAH L2")}
                >
                    <div className="font-semibold text-xl text-gray-800">CVAH L2</div>
                    <div className="alert-count text-sm mt-2">
                        <span className={`alert-badge ${getBadgeColor(7)} text-white px-2 py-1 rounded-full`}>
                            7 Alerts
                        </span>
                    </div>
                </div>

                {/* TWC 1B */}
                <div
                    className="flex-1 min-w-[250px] max-w-xs p-4 border rounded-lg bg-white shadow-md cursor-pointer hover:bg-gray-50"
                    onClick={() => handleRegionClick("TWC 1B")}
                >
                    <div className="font-semibold text-xl text-gray-800">TWC 1B</div>
                    <div className="alert-count text-sm mt-2">
                        <span className={`alert-badge ${getBadgeColor(7)} text-white px-2 py-1 rounded-full`}>
                            7 Alerts
                        </span>
                    </div>
                </div>

                {/* TWC 2B */}
                <div
                    className="flex-1 min-w-[250px] max-w-xs p-4 border rounded-lg bg-white shadow-md cursor-pointer hover:bg-gray-50"
                    onClick={() => handleRegionClick("TWC 2B")}
                >
                    <div className="font-semibold text-xl text-gray-800">TWC 2B</div>
                    <div className="alert-count text-sm mt-2">
                        <span className={`alert-badge ${getBadgeColor(7)} text-white px-2 py-1 rounded-full`}>
                            7 Alerts
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default Danieli;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const getBadgeColor = (alertCount) => {
//     if (alertCount <= 3) return "bg-emerald-500";
//     if (alertCount <= 6) return "bg-amber-500";
//     return "bg-rose-500";
// };

// const Danieli = () => {
//     const navigate = useNavigate();
//     const [activeAlerts, setActiveAlerts] = useState([]);
//     const [currentAlertIndex, setCurrentAlertIndex] = useState(0);
//     const [isVisible, setIsVisible] = useState(true);

//     const handleRegionClick = (regionName) => {
//         const regionRoutes = {
//             "Stand 1-6": "/stand1-6",
//             "Shear 1": "/shear1",
//             "Stand 7-12": "/stand7-12",
//             "Shear 2": "/shear2",
//             "Stand 13-18": "/stand13-18",
//             "CVR Line 1": "/cvrl1",
//             "CVR Line 2": "/cvrl2",
//             "FFB Line 1": "/ffbl1",
//             "FFB Line 2": "/ffbl2",
//             "CVRD L1": "/cvrd1",
//             "CVRD L2": "/cvrd2",
//             "CVAH L1": "/cvah-l1",
//             "CVAH L2": "/cvah-l2",
//             "TWC 1A": "/twc-1a",
//             "TWC 1B": "/twc-1b",
//             "TWC 2A": "/twc-2a",
//             "TWC 2B": "/twc-2b"
//         };

//         navigate(regionRoutes[regionName] || "/");
//     };

//     useEffect(() => {
//         const mockAlerts = [
//             { id: 1, message: "Temperature high in Stand 3", severity: "high" },
//             { id: 2, message: "Low pressure in CVR Line 1", severity: "medium" },
//             { id: 3, message: "Maintenance required in Shear 2", severity: "low" }
//         ];
//         setActiveAlerts(mockAlerts);
//     }, []);

//     const handlePrevAlert = () => {
//         setIsVisible(false);
//         setTimeout(() => {
//             setCurrentAlertIndex(prev =>
//                 prev === 0 ? activeAlerts.length - 1 : prev - 1
//             );
//             setIsVisible(true);
//         }, 200);
//     };

//     const handleNextAlert = () => {
//         setIsVisible(false);
//         setTimeout(() => {
//             setCurrentAlertIndex(prev =>
//                 prev === activeAlerts.length - 1 ? 0 : prev + 1
//             );
//             setIsVisible(true);
//         }, 200);
//     };

//     return (
//         <div className="bg-slate-50 min-h-screen p-6">
//             {/* Alert Banner */}
//             <div className="max-w-7xl mx-auto mb-8">
//                 <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//                     <div className="relative h-24 flex items-center">
//                         <div className={`absolute inset-0 flex items-center justify-between px-8 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'
//                             } ${activeAlerts[currentAlertIndex]?.severity === "high" ? "bg-rose-100 text-rose-800" :
//                                 activeAlerts[currentAlertIndex]?.severity === "medium" ? "bg-amber-100 text-amber-800" :
//                                     "bg-emerald-100 text-emerald-800"
//                             }`}>
//                             <div className="flex-1 text-center font-medium">
//                                 {activeAlerts[currentAlertIndex]?.message}
//                             </div>
//                         </div>
//                     </div>

//                     {activeAlerts.length > 1 && (
//                         <div className="flex items-center justify-between px-4 py-3 bg-slate-50">
//                             <div className="flex items-center gap-2">
//                                 <span className="text-sm text-slate-500">
//                                     {currentAlertIndex + 1} of {activeAlerts.length}
//                                 </span>
//                             </div>
//                             <div className="flex gap-2">
//                                 <button
//                                     onClick={handlePrevAlert}
//                                     className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
//                                 >
//                                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                                     </svg>
//                                 </button>
//                                 <button
//                                     onClick={handleNextAlert}
//                                     className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
//                                 >
//                                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                                     </svg>
//                                 </button>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>

//             {/* Region Grid */}
//             {/* <div className="flex flex-wrap gap-6 justify-center max-w-7xl mx-auto">
//                 {[
//                     { name: "Stand 1-6", count: 3 },
//                     { name: "Shear 1", count: 5 },
//                     { name: "Stand 7-12", count: 8 },
//                     { name: "Shear 2", count: 2 },
//                     { name: "Stand 13-18", count: 12 },
//                     { name: "CVR Line 1", count: 4 },
//                     { name: "FFB Line 1", count: 1 },
//                     { name: "CVRD L1", count: 7 },
//                     { name: "CVAH L1", count: 7 },
//                     { name: "TWC 1A", count: 7 }
//                 ].map((region) => (
//                     <div
//                         key={region.name}
//                         onClick={() => handleRegionClick(region.name)}
//                         className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer p-6 min-w-[250px] max-w-xs flex-1 relative overflow-hidden"
//                     >
//                         <div className="flex flex-col">
//                             <h3 className="text-lg font-semibold text-slate-800 mb-2">
//                                 {region.name}
//                             </h3>
//                             <div className="flex items-center justify-between">
//                                 <span className={`${getBadgeColor(region.count)} text-white text-sm px-3 py-1 rounded-full`}>
//                                     {region.count} Alerts
//                                 </span>
//                                 <svg
//                                     className="w-5 h-5 text-slate-400 group-hover:text-slate-600 transition-colors"
//                                     fill="none"
//                                     stroke="currentColor"
//                                     viewBox="0 0 24 24"
//                                 >
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                                 </svg>
//                             </div>
//                         </div>
//                         <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
//                     </div>
//                 ))}
//             </div> */}
//             <div className="flex flex-wrap gap-6 justify-center max-w-7xl mx-auto mt-8">
//                 {[
//                     { name: "Stand 1-6", count: 3 },
//                     { name: "Shear 1", count: 5 },
//                     { name: "Stand 7-12", count: 8 },
//                     { name: "Shear 2", count: 2 },
//                     { name: "Stand 13-18", count: 12 },
//                     { name: "CVR Line 1", count: 4 },
//                     { name: "FFB Line 1", count: 1 },
//                     { name: "CVRD L1", count: 7 },
//                     { name: "CVAH L1", count: 7 },
//                     { name: "TWC 1A", count: 7 }
//                 ].map((region) => (
//                     <div
//                         key={region.name}
//                         onClick={() => handleRegionClick(region.name)}
//                         className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer p-6 min-w-[250px] max-w-xs flex-1 relative overflow-hidden"
//                     >
//                         <div className="flex flex-col">
//                             <h3 className="text-lg font-semibold text-slate-800 mb-2">
//                                 {region.name}
//                             </h3>
//                             <div className="flex items-center justify-between">
//                                 <span className="text-white text-sm px-3 py-1 rounded-full">
//                                     {region.count} Alerts
//                                 </span>
//                                 <svg
//                                     className="w-5 h-5 text-slate-400 group-hover:text-slate-600 transition-colors"
//                                     fill="none"
//                                     stroke="currentColor"
//                                     viewBox="0 0 24 24"
//                                 >
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                                 </svg>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Danieli;