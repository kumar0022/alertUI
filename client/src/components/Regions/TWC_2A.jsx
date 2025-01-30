import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import {
    AlertTriangle,
    ChevronRight,
    X,
    Activity,
    MessageCircle,
    Send
} from 'lucide-react';

const TWC_2A = () => {
    const [selectedSignal, setSelectedSignal] = useState(null);
    const [feedbackModal, setFeedbackModal] = useState(null);
    const [alerts] = useState([
        {
            timestamp: "2025-01-24T12:10:00Z",
            top_signals: [
                { signal_name: "Signal_P", loss_score: 65.75, max_threshold: 60 },
                { signal_name: "Signal_Q", loss_score: 58.34, max_threshold: 55 }
            ]
        },
        {
            timestamp: "2025-01-24T11:50:00Z",
            top_signals: [
                { signal_name: "Signal_R", loss_score: 91.45, max_threshold: 80 },
                { signal_name: "Signal_S", loss_score: 83.67, max_threshold: 75 },
                { signal_name: "Signal_T", loss_score: 76.89, max_threshold: 70 }
            ]
        }
    ]);

    const FeedbackModal = ({ signal, onClose }) => {
        const [feedback, setFeedback] = useState('');

        const handleSubmit = () => {
            console.log(`Feedback for ${signal}: ${feedback}`);
            onClose();
        };

        return (
            <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl w-full max-w-md">
                    <div className="p-6 border-b flex justify-between items-center">
                        <h2 className="text-xl font-bold">Feedback for {signal}</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="p-6">
                        <textarea
                            className="w-full h-32 p-3 border rounded-lg mb-4"
                            placeholder="Provide your feedback here..."
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                        />
                        <button
                            onClick={handleSubmit}
                            className="w-full bg-blue-500 text-white py-2 rounded-lg flex items-center justify-center hover:bg-blue-600"
                        >
                            <Send className="mr-2" size={20} />
                            Submit Feedback
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    const SignalDetailsModal = ({ signal, onClose }) => {
        const currentAlert = alerts.find(a =>
            a.top_signals.some(s => s.signal_name === signal)
        );

        const allSignalsData = currentAlert?.top_signals.map(signal => ({
            name: signal.signal_name,
            data: [
                { time: '11:40', value: Math.random() * 100 },
                { time: '11:50', value: signal.loss_score }, // Placeholder data
                { time: '12:00', value: Math.random() * 100 }
            ]
        }));

        return (
            <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-auto">
                    <div className="p-6 border-b flex justify-between items-center">
                        <h2 className="text-2xl font-bold">{signal} - All Signal Analysis</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="p-6 space-y-8">
                        {allSignalsData?.map((signalData, index) => (
                            <div key={index}>
                                <h3 className="font-semibold text-xl mb-4">{signalData.name}</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={signalData.data}>
                                        <XAxis dataKey="time" />
                                        <YAxis />
                                        <Tooltip />
                                        <Line type="monotone" dataKey="value" stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`} strokeWidth={2} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">TWC 2A</h1>
                    <div className="bg-white shadow-md rounded-full px-4 py-2 text-sm text-gray-600">
                        {new Date().toLocaleDateString()}
                    </div>
                </div>

                <div className="space-y-4">
                    {alerts.map((alert, alertIndex) => (
                        <div
                            key={alertIndex}
                            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow"
                        >
                            <div className="p-4 border-b flex justify-between items-center">
                                <span className="text-sm text-gray-500">
                                    {new Date(alert.timestamp).toLocaleString()}
                                </span>
                                <AlertTriangle
                                    className={
                                        alert.top_signals.some(s => s.loss_score > s.max_threshold)
                                            ? 'text-red-500'
                                            : 'text-green-500'
                                    }
                                />
                            </div>

                            {alert.top_signals.map((signal, signalIndex) => {
                                const isExceeded = signal.loss_score > signal.max_threshold;
                                return (
                                    <div
                                        key={signalIndex}
                                        className={`
                      p-4 flex justify-between items-center
                      ${isExceeded ? 'bg-red-50/50' : ''}
                    `}
                                    >
                                        <div className="flex-1 flex items-center">
                                            <div
                                                onClick={() => setSelectedSignal(signal.signal_name)}
                                                className={`font-semibold cursor-pointer ${isExceeded ? 'text-red-700' : ''}`}
                                            >
                                                {signal.signal_name}
                                            </div>
                                            <button
                                                onClick={() => setFeedbackModal(signal.signal_name)}
                                                className="ml-3 text-gray-500 hover:text-blue-600"
                                            >
                                                <MessageCircle size={18} />
                                            </button>
                                        </div>

                                        <div className="flex items-center space-x-4">
                                            <div className="text-right">
                                                <div className="text-xs text-gray-500">Max Threshold</div>
                                                <div className="font-bold text-green-600">
                                                    {signal.max_threshold}
                                                </div>
                                            </div>

                                            <div className="text-right">
                                                <div className="text-xs text-gray-500">Current Value</div>
                                                <div
                                                    className={`font-bold ${isExceeded ? 'text-red-700' : 'text-blue-700'
                                                        }`}
                                                >
                                                    {signal.loss_score}
                                                </div>
                                            </div>

                                            <div className="text-right">
                                                <div className="text-xs text-gray-500">Loss Score</div>
                                                <div
                                                    className={`font-bold ${isExceeded ? 'text-red-700' : 'text-green-700'
                                                        }`}
                                                >
                                                    {signal.loss_score}
                                                </div>
                                            </div>

                                            <ChevronRight
                                                className="text-gray-400 cursor-pointer"
                                                onClick={() => setSelectedSignal(signal.signal_name)}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>

            {selectedSignal && (
                <SignalDetailsModal
                    signal={selectedSignal}
                    onClose={() => setSelectedSignal(null)}
                />
            )}

            {feedbackModal && (
                <FeedbackModal
                    signal={feedbackModal}
                    onClose={() => setFeedbackModal(null)}
                />
            )}
        </div>
    );
};

export default TWC_2A;
