#!/bin/bash
# Test runner script for simple-groq-cli
# Run this before committing changes

set -e

echo "================================================"
echo "Running All Tests for simple-groq-cli"
echo "================================================"
echo ""

echo "📦 Ensuring dependencies are installed..."
if [ ! -d "node_modules/jest-environment-jsdom" ]; then
    echo "⚠️  jest-environment-jsdom not found. Running npm install..."
    npm install
else
    echo "✅ Dependencies OK"
fi
echo ""

echo "🧪 Running CLI Tests..."
echo "----------------------------------------"
npm test
CLI_EXIT=$?
echo ""

echo "🌐 Running Web UI Tests..."
echo "----------------------------------------"
npm run test:web
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
    echo "You can now safely commit your changes."
    exit 0
else
    echo "❌ TESTS FAILED!"
    echo "================================================"
    echo ""
    [ $CLI_EXIT -ne 0 ] && echo "✗ CLI Tests: FAILED"
    [ $WEB_EXIT -ne 0 ] && echo "✗ Web UI Tests: FAILED"
    echo ""
    echo "⚠️  DO NOT COMMIT until all tests pass."
    echo "Fix the failing tests and run this script again."
    exit 1
fi
