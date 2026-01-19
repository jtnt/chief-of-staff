#!/bin/bash

# Chief of Staff Dashboard launcher

cd "$(dirname "$0")"

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Start the server
echo "Starting Chief of Staff Dashboard..."
npm start &
SERVER_PID=$!

# Wait for server to start
sleep 2

# Open browser
open "http://localhost:3000"

# Wait for server process
wait $SERVER_PID
