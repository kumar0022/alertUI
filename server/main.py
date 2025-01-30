# from flask import Flask, jsonify
# import random
# from datetime import datetime, timedelta, timezone
# from flask_cors import CORS

# # Initialize Flask app
# app = Flask(__name__)

# CORS(app)
# # Dummy data generation function
# def generate_dummy_data():
#     regions = ["North", "South", "East", "West", "Central", "Northeast", "Southwest"]
#     signal_names = ["Signal_A", "Signal_B", "Signal_C", "Signal_D", "Signal_E", "Signal_F", "Signal_G"]
#     signals = []

#     for _ in range(50):  # Generating 50 entries
#         region = random.choice(regions)
#         signal_name = random.choice(signal_names)
#         loss_score = round(random.uniform(0, 100), 2)  # Loss score between 0 and 100
#         timestamp = datetime.now(timezone.utc) - timedelta(minutes=random.randint(1, 60))  # Random timestamp in the last hour
        
#         signals.append({
#             "region": region,
#             "signal_name": signal_name,
#             "loss_score": loss_score,
#             "timestamp": timestamp.strftime("%Y-%m-%d %H:%M:%S")
#         })

#     return signals

# @app.route("/signals", methods=["GET"])
# def get_top_signals():
#     # Generate dummy data
#     signals = generate_dummy_data()
    
#     # Return the dummy data as a JSON response
#     return jsonify(signals)

# if __name__ == "__main__":
#     app.run(debug=True)



from flask import Flask, jsonify
import random
from datetime import datetime, timedelta, timezone
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def generate_dummy_alerts():
    custom_logic_alert = [
    {
        "signal_name": "elongation",
        "current_val": 52.4,
        "threshold": 50.0,
        "loss_score": 0.03,
        "graph_link": "https://example.com/graphs/elongation"
    },
    {
        "signal_name": "looper",
        "current_val": 74.8,
        "threshold": 75.0,
        "loss_score": 0.01,
        "graph_link": "https://example.com/graphs/looper"
    },
    {
        "signal_name": "diverter",
        "current_val": 89.1,
        "threshold": 90.0,
        "loss_score": 0.02,
        "graph_link": "https://example.com/graphs/diverter"
    },
    {
        "signal_name": "breaking cycle",
        "current_val": 40.5,
        "threshold": 42.0,
        "loss_score": 0.04,
        "graph_link": "https://example.com/graphs/breaking-cycle"
    },
    {
        "signal_name": "hmd",
        "current_val": 120.3,
        "threshold": 125.0,
        "loss_score": 0.01,
        "graph_link": "https://example.com/graphs/hmd"
    }
]

    alerts_data = [
        {
            "alert_id": 1,
            "alert_name": "Alert 1",
            "region": "North",
            "timestamp": (datetime.now(timezone.utc) - timedelta(minutes=10)).strftime("%Y-%m-%dT%H:%M:%SZ"),
            "top_signals": [
                {"signal_name": "Signal_A", "loss_score": round(random.uniform(70, 90), 2)},
                {"signal_name": "Signal_B", "loss_score": round(random.uniform(60, 80), 2)},
                {"signal_name": "Signal_C", "loss_score": round(random.uniform(50, 70), 2)}
            ]
        },
        {
            "alert_id": 2,
            "alert_name": "Alert 2",
            "region": "South",
            "timestamp": (datetime.now(timezone.utc) - timedelta(minutes=20)).strftime("%Y-%m-%dT%H:%M:%SZ"),
            "top_signals": [
                {"signal_name": "Signal_X", "loss_score": round(random.uniform(70, 90), 2)},
                {"signal_name": "Signal_Y", "loss_score": round(random.uniform(60, 80), 2)},
                {"signal_name": "Signal_Z", "loss_score": round(random.uniform(50, 70), 2)}
            ]
        },
        {
            "alert_id": 3,
            "alert_name": "Alert 3",
            "region": "East",
            "timestamp": (datetime.now(timezone.utc) - timedelta(minutes=30)).strftime("%Y-%m-%dT%H:%M:%SZ"),
            "top_signals": [
                {"signal_name": "Signal_P", "loss_score": round(random.uniform(50, 70), 2)},
                {"signal_name": "Signal_Q", "loss_score": round(random.uniform(40, 60), 2)}
            ]
        },
        {
            "alert_id": 4,
            "alert_name": "Alert 4",
            "region": "West",
            "timestamp": (datetime.now(timezone.utc) - timedelta(minutes=40)).strftime("%Y-%m-%dT%H:%M:%SZ"),
            "top_signals": [
                {"signal_name": "Signal_R", "loss_score": round(random.uniform(80, 95), 2)},
                {"signal_name": "Signal_S", "loss_score": round(random.uniform(70, 85), 2)},
                {"signal_name": "Signal_T", "loss_score": round(random.uniform(60, 75), 2)}
            ]
        }
    ]
    return alerts_data

def generate_signals(num_signals=50):
    regions = ["North", "South", "East", "West", "Central", "Northeast", "Southwest"]
    signal_names = ["Signal_A", "Signal_B", "Signal_C", "Signal_D", "Signal_E", "Signal_F", "Signal_G"]
    signals = []

    for _ in range(num_signals):
        region = random.choice(regions)
        signal_name = random.choice(signal_names)
        loss_score = round(random.uniform(0, 100), 2)
        timestamp = datetime.now(timezone.utc) - timedelta(minutes=random.randint(1, 60))
        
        signals.append({
            
            "signal_name": signal_name,
            "loss_score": loss_score,
            "timestamp": timestamp.strftime("%Y-%m-%d %H:%M:%S")
        })

    return signals

def generate_custom_alerts():
    custom_alerts = [
        {
            "custom_id": random.randint(100, 999),
            "signal_name": "custom_signal_" + str(random.randint(1, 10)),
            "region": random.choice(["North", "South", "East", "West"]),
            "current_val": round(random.uniform(10, 100), 2),
            "threshold": round(random.uniform(50, 100), 2),
            "loss_score": round(random.uniform(0, 1), 2),
            "graph_link": "https://example.com/custom_graphs/signal_" + str(random.randint(1, 10)),
            "timestamp": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
        } for _ in range(5)
    ]
    return custom_alerts




@app.route("/alerts", methods=["GET"])
def get_alerts():
    alerts = generate_dummy_alerts()
    return jsonify(alerts)

@app.route("/custom_logic_alert", methods=["GET"])
def get_custom_alerts():
    custom_alert = generate_custom_alerts()
    return jsonify(custom_alert)


if __name__ == "__main__":
    app.run(debug=True)