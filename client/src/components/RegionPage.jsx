import React from "react";
import { useParams } from "react-router-dom";

const RegionPage = () => {
    const { regionName } = useParams();

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-4">{regionName}</h1>
            <p className="text-lg">Details about {regionName} will be displayed here.</p>
            <button
                className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                onClick={() => window.history.back()}
            >
                Go Back
            </button>
        </div>
    );
};

export default RegionPage;
