#!/bin/bash

# Mobile Development Script for Puente Scientific
# This script sets up the mobile development environment

echo "🚀 Setting up Mobile Development Environment for Puente Scientific"
echo "================================================================"

# Check if we're in the right directory
if [ ! -f "index.html" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

echo "✅ Project directory confirmed"

# Start local development server
echo "🌐 Starting local development server..."
echo "   Server will be available at: http://localhost:8000"
echo "   For mobile testing, use your computer's IP address"
echo ""

# Get the local IP address
LOCAL_IP=$(ifconfig | grep "inet " | grep -v 127.0.0.1 | head -1 | awk '{print $2}')
if [ -z "$LOCAL_IP" ]; then
    LOCAL_IP="YOUR_IP_ADDRESS"
fi

echo "📱 Mobile Testing URLs:"
echo "   Desktop: http://localhost:8000"
echo "   Mobile:  http://$LOCAL_IP:8000"
echo "   Test Page: http://localhost:8000/mobile-test.html"
echo ""

# Check if Python 3 is available
if command -v python3 &> /dev/null; then
    echo "🐍 Python 3 found - starting server..."
    echo "   Press Ctrl+C to stop the server"
    echo ""
    
    # Start the server in the background
    python3 -m http.server 8000 &
    SERVER_PID=$!
    
    echo "✅ Server started with PID: $SERVER_PID"
    echo ""
    echo "🔧 Mobile Testing Tools:"
    echo "   1. Chrome DevTools: F12 → Device toolbar"
    echo "   2. Firefox: F12 → Responsive Design Mode"
    echo "   3. Safari: Develop → Responsive Design Mode"
    echo ""
    echo "📱 Real Device Testing:"
    echo "   1. Connect phone to same WiFi network"
    echo "   2. Visit: http://$LOCAL_IP:8000"
    echo "   3. Test all pages and interactions"
    echo ""
    echo "⚡ Performance Testing:"
    echo "   1. Chrome DevTools → Lighthouse"
    echo "   2. WebPageTest.org"
    echo "   3. GTmetrix.com"
    echo ""
    echo "🎯 Mobile Testing Checklist:"
    echo "   □ Navigation works on all devices"
    echo "   □ Forms are easy to use"
    echo "   □ Images load properly"
    echo "   □ Touch targets are 44px+"
    echo "   □ No horizontal scrolling"
    echo "   □ Performance score > 90"
    echo ""
    echo "📊 Quick Performance Check:"
    echo "   - Open Chrome DevTools"
    echo "   - Go to Lighthouse tab"
    echo "   - Select 'Mobile' and 'Performance'"
    echo "   - Click 'Generate report'"
    echo ""
    echo "🛠️ Development Tips:"
    echo "   - Test on real devices early and often"
    echo "   - Use mobile-first CSS approach"
    echo "   - Optimize images for mobile"
    echo "   - Test with slow network connections"
    echo "   - Validate touch targets and spacing"
    echo ""
    echo "Press Ctrl+C to stop the server when done testing"
    
    # Wait for user to stop the server
    wait $SERVER_PID
    
elif command -v python &> /dev/null; then
    echo "🐍 Python 2 found - starting server..."
    echo "   Press Ctrl+C to stop the server"
    echo ""
    python -m SimpleHTTPServer 8000 &
    SERVER_PID=$!
    echo "✅ Server started with PID: $SERVER_PID"
    echo "Press Ctrl+C to stop the server when done testing"
    wait $SERVER_PID
    
else
    echo "❌ Python not found. Please install Python 3 to run the development server."
    echo "   You can still test by opening index.html directly in a browser."
    exit 1
fi

echo ""
echo "🎉 Mobile development environment ready!"
echo "   Check mobile-dev-guide.md for detailed instructions"
echo "   Check mobile-optimization-plan.md for improvement strategies"
