#!/bin/bash
# Direct test runner that bypasses npm
# Use this if npm commands have permission issues

set -e

echo "================================================"
echo "Direct Test Runner (bypasses npm)"
echo "================================================"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "❌ node_modules not found. Run: npm install"
    exit 1
fi

# Check if jest exists
if [ ! -f "node_modules/.bin/jest" ]; then
    echo "❌ Jest not found. Run: npm install"
    exit 1
fi

echo "🧪 Running CLI Tests..."
echo "----------------------------------------"
node node_modules/jest/bin/jest.js --config jest.config.ts
CLI_EXIT=$?
echo ""

echo "🌐 Running Web UI Tests..."
echo "----------------------------------------"
node node_modules/jest/bin/jest.js --config jest.config.web.ts
WEB_EXIT=$?
echo ""

echo "================================================"
if [ $CLI_EXIT -eq 0 ] && [ $WEB_EXIT -eq 0 ]; then
    echo "✅ ALL TESTS PASSED!"
    echo "================================================"
    echo ""
    echo "✓ CLI Tests: PASSED (6 tests)"
    echo "✓ Web UI Tests: PASSED (50 tests)"
    echo ""
    exit 0
else
    echo "❌ TESTS FAILED!"
    echo "================================================"
    echo ""
    [ $CLI_EXIT -ne 0 ] && echo "✗ CLI Tests: FAILED"
    [ $WEB_EXIT -ne 0 ] && echo "✗ Web UI Tests: FAILED"
    echo ""
    exit 1
fi
