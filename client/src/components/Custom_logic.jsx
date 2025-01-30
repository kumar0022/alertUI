import React, { useState, useEffect } from "react";

const CustomAlerts = () => {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortByDate, setSortByDate] = useState(false); // state to toggle sorting order

    useEffect(() => {
        // Fetch custom alerts
        const fetchAlerts = async () => {
            try {
                const response = await fetch("http://localhost:5000/custom_logic_alert"); // Replace with your backend URL
                if (!response.ok) {
                    throw new Error("Failed to fetch alerts");
                }
                const data = await response.json();
                setAlerts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAlerts();
    }, []);

    // Sort alerts based on sortByDate state
    const sortedAlerts = alerts.sort((a, b) => {
        const dateA = new Date(a.timestamp);
        const dateB = new Date(b.timestamp);
        return sortByDate ? dateA - dateB : dateB - dateA; // Toggle sorting order
    });

    const handleSortToggle = () => {
        setSortByDate(!sortByDate); // Toggle the sorting state
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="bg-gray-100 p-4">
            <h1 className="text-2xl font-semibold text-center mb-4">Custom Alerts</h1>
            <div className="mb-4 text-center">
                <button
                    onClick={handleSortToggle}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Sort by Date & Time ({sortByDate ? "Ascending" : "Descending"})
                </button>
            </div>
            <div className="overflow-y-auto max-h-screen border rounded-lg bg-white shadow-lg p-4">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-2 border">ID</th>
                            <th className="p-2 border">Signal Name</th>
                            <th className="p-2 border">Region</th>
                            <th className="p-2 border">Current Value</th>
                            <th className="p-2 border">Threshold</th>
                            <th className="p-2 border">Loss Score</th>
                            <th className="p-2 border">Timestamp</th>
                            <th className="p-2 border">Graph Link</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedAlerts.map((alert) => (
                            <tr key={alert.custom_id} className="odd:bg-white even:bg-gray-50">
                                <td className="p-2 border">{alert.custom_id}</td>
                                <td className="p-2 border">{alert.signal_name}</td>
                                <td className="p-2 border">{alert.region}</td>
                                <td
                                    className={`p-2 border ${alert.current_val > alert.threshold ? 'text-red-500' : ''}`}
                                >
                                    {alert.current_val}
                                </td>
                                <td className="p-2 border">{alert.threshold}</td>
                                <td className="p-2 border">{alert.loss_score}</td>
                                <td className="p-2 border">
                                    {new Date(alert.timestamp).toLocaleString()}
                                </td>
                                <td className="p-2 border">
                                    <a
                                        href={alert.graph_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 underline"
                                    >
                                        View Graph
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CustomAlerts;
