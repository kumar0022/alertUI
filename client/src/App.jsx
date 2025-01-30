import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
// import RegionPage from "./components/RegionPage";
import Stand1_6 from "./components/Regions/Stand1_6";
import Stand7_12 from "./components/Regions/Stand7_12";
import Stand13_18 from "./components/Regions/Stand13_18";
import Shear1 from "./components/Regions/Shear1";
import Shear2 from "./components/Regions/Shear2";

import CVRD_L2 from './components/Regions/CVRD_L2'
import CVRD_L1 from "./components/Regions/CVRD_L1.jsx";

import CVAH_L1 from "./components/Regions/CVAH_L1";
import CVAH_L2 from "./components/Regions/CVAH_L2";

import CVR_L1 from "./components/Regions/CVR_L1";
import CVR_L2 from "./components/Regions/CVR_L2";

import FFB_L1 from "./components/Regions/FFB_L1";
import FFB_L2 from "./components/Regions/FFB_L2";

import TWC_1A from "./components/Regions/TWC_1A";
import TWC_1B from "./components/Regions/TWC_1B";

import TWC_2A from "./components/Regions/TWC_2A";
import TWC_2B from "./components/Regions/TWC_2B";



const App = () => {
  return (

    <Routes>

      <Route path="/" element={<HomePage />} />
      {/* <Route path="/:regionName" element={<RegionPage />} /> */}
      <Route path="/stand1-6" element={<Stand1_6 />} />
      <Route path="/shear1" element={<Shear1 />} />
      <Route path="/stand7-12" element={<Stand7_12 />} />
      <Route path="/shear2" element={<Shear2 />} />
      <Route path="/stand13-18" element={<Stand13_18 />} />

      <Route path="/cvrl1" element={<CVR_L1 />} />
      <Route path="/cvrl2" element={<CVR_L2 />} />

      <Route path="/ffbl1" element={<FFB_L1 />} />
      <Route path="/ffbl2" element={<FFB_L2 />} />

      <Route path="/cvrd1" element={<CVRD_L1 />} />
      <Route path="/cvrd2" element={<CVRD_L2 />} />

      <Route path="/cvah-l1" element={<CVAH_L1 />} />
      <Route path="/cvah-l2" element={<CVAH_L2 />} />

      <Route path="/twc-1a" element={<TWC_1A />} />
      <Route path="/twc-1b" element={<TWC_1B />} />

      <Route path="/twc-2b" element={<TWC_2B />} />
      <Route path="/twc-2a" element={<TWC_2A />} />

    </Routes>



  );
};

export default App;







// DESIGN OF STAND WISE


// import React, { useState, useEffect } from 'react';
// import {
//   AlertTriangle,
//   TrendingUp
// } from 'lucide-react';

// const App = () => {
//   const [alerts, setAlerts] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/alerts');
//         const data = await response.json();
//         setAlerts(data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
//       } catch (error) {
//         console.error('Data fetch error:', error);
//       }
//     };

//     fetchData();
//     const intervalId = setInterval(fetchData, 60000);
//     return () => clearInterval(intervalId);
//   }, []);

//   const calculateRiskLevel = (signals) => {
//     const avgScore = signals.reduce((sum, signal) => sum + signal.loss_score, 0) / signals.length;
//     return avgScore > 80 ? 'High Risk' : avgScore > 60 ? 'Medium Risk' : 'Low Risk';
//   };

//   const formatTime = (timestamp) => {
//     const date = new Date(timestamp);
//     return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
//       <div className="max-w-5xl mx-auto">
//         <header className="mb-8 text-center">
//           <h1 className="text-4xl font-bold text-slate-800 mb-2">Signal Monitoring</h1>
//           <p className="text-slate-600">Real-time signal loss tracking</p>
//         </header>

//         <div className="space-y-4">
//           {alerts.map((alert) => {
//             const riskLevel = calculateRiskLevel(alert.top_signals);
//             const riskColorMap = {
//               'High Risk': 'bg-red-50 border-red-300 text-red-800',
//               'Medium Risk': 'bg-yellow-50 border-yellow-300 text-yellow-800',
//               'Low Risk': 'bg-green-50 border-green-300 text-green-800'
//             };

//             return (
//               <div
//                 key={alert.alert_id}
//                 className={`
//                   rounded-xl border shadow-sm p-5 
//                   ${riskColorMap[riskLevel]} 
//                   transform transition-all hover:scale-[1.02]
//                 `}
//               >
//                 <div className="flex justify-between items-start mb-4">
//                   <div className="flex items-center space-x-3">
//                     <AlertTriangle className="text-current" />
//                     <span className="font-semibold text-lg">
//                       {formatTime(alert.timestamp)}
//                     </span>
//                   </div>
//                   <span className={`
//                     px-3 py-1 rounded-full text-xs font-bold
//                     ${riskLevel === 'High Risk' ? 'bg-red-200' :
//                       riskLevel === 'Medium Risk' ? 'bg-yellow-200' : 'bg-green-200'}
//                   `}>
//                     {riskLevel}
//                   </span>
//                 </div>

//                 <div className="w-full space-y-2">
//                   {alert.top_signals.map((signal) => (
//                     <div
//                       key={signal.signal_name}
//                       className="w-full bg-white/50 rounded-md p-3 flex justify-between items-center"
//                     >
//                       <div className="font-semibold">{signal.signal_name}</div>
//                       <div className="text-sm font-bold">{signal.loss_score.toFixed(2)}</div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;

