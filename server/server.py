from flask import Flask, render_template
import pandas as pd
from datetime import datetime, timedelta, timezone
from influxdb_client import InfluxDBClient
import psycopg2  # Importing psycopg2 for PostgreSQL
from psycopg2 import sql

# Placeholder for the necessary values
FREQUENCY = 3600  # example frequency in seconds (1 hour)
BUCKET = "your_bucket_name"
ORG = "iit_bh"
TOKEN = "KxQfuQJ82eToyi06WvpapWSEafPOH_7J2pjEuUpmjl1_vWusmpfCKxus6MscFmKZ8UWceCi7Ok22j-yRU-sk3Q=="
URL = "http://localhost:8086"  # InfluxDB URL

# PostgreSQL connection details
POSTGRES_HOST = "localhost"
POSTGRES_DB = "your_db_name"
POSTGRES_USER = "your_username"
POSTGRES_PASSWORD = "your_password"

# Initialize Flask app
app = Flask(__name__)

# Initialize InfluxDB Client
client = InfluxDBClient(url=URL, token=TOKEN, org=ORG)
query_api = client.query_api()

# Function to connect to PostgreSQL
def get_postgres_connection():
    conn = psycopg2.connect(
        host=POSTGRES_HOST,
        dbname=POSTGRES_DB,
        user=POSTGRES_USER,
        password=POSTGRES_PASSWORD
    )
    return conn

def get_time_range():
    end_time = datetime.now(timezone.utc)
    start_time = end_time - timedelta(seconds=FREQUENCY)
    start_time = start_time.isoformat()
    end_time = end_time.isoformat()
    return end_time, start_time

def query_top_signals(timestamp, region, n=4):
    measurement = f"{region}_loss_per_signal"  
    start = timestamp.isoformat()
    end = (timestamp + timedelta(seconds=1)).isoformat()
    
    query = f"""
    from(bucket: "{BUCKET}")
        |> range(start: {start}, stop: {end})
        |> filter(fn: (r) => r._measurement == "{measurement}")
        |> filter(fn: (r) => r._time == {start})
        |> group()
        |> sort(columns: ["_value"], desc: true)
        |> limit(n: {n})
    """
    
    result = query_api.query_data_frame(org=ORG, query=query)
    
    # Dropping unnecessary columns
    result.drop(columns=['_result', '_time', 'table'], inplace=True)
    
    # Extracting top signals and their loss scores
    top_signals = result["_field"].tolist()
    top_signals_loss_score = result["_value"].tolist()
    
    return dict(zip(top_signals, top_signals_loss_score))

def insert_data_into_postgresql(top_signals, region):
    # Connect to PostgreSQL
    conn = get_postgres_connection()
    cursor = conn.cursor()
    
    # Create a table if it doesn't exist (adjust table schema as needed)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS top_signals (
        id SERIAL PRIMARY KEY,
        region VARCHAR(255),
        signal_name VARCHAR(255),
        loss_score FLOAT,
        timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    );
    """)
    
    # Insert data into PostgreSQL
    for signal, score in top_signals.items():
        cursor.execute("""
        INSERT INTO top_signals (region, signal_name, loss_score)
        VALUES (%s, %s, %s);
        """, (region, signal, score))
    
    conn.commit()
    cursor.close()
    conn.close()

@app.route("/")
def display_top_signals():
    # Fetch time range
    end_time, start_time = get_time_range()

    # Example region to fetch data for
    region = "region_name"  # Replace with actual region
    
    # Get top signals for that region
    top_signals = query_top_signals(datetime.now(timezone.utc), region)

    if top_signals is None:
        return render_template("alerts.html", signals=None)

    # Insert data into PostgreSQL
    insert_data_into_postgresql(top_signals, region)

    # Return the results to be displayed in the template
    return render_template("alerts.html", signals=top_signals)

if __name__ == "__main__":
    app.run(debug=True)









