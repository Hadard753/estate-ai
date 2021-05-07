#!/bin/bash

check_errcode() {
    status=$?

    if [ $status -ne 0 ]; then
        echo "${1}"
        exit $status
    fi
}

echo "Checking for missing dependencies before build..."

# Check if node_modules exists, if not throw an error
if [ ! -d "./node_modules" ] || [ ! -d "./estateai-client/node_modules" ]; then
    echo "node_modules are missing! running install script..."
    npm run install:all
    echo "Installed all missing dependencies! starting installation..."
else
    echo "All dependencies are installed! Ready to run build!"
fi

# This script compiles typescript and React application and puts them into a single NodeJS project
ENV=${NODE_ENV:-production}
echo -e "\n-- Started build script for React & NodeJS (environment $ENV) --"
echo "Removing dist directory..."
rm -rf dist

echo "Compiling typescript..."
./node_modules/.bin/tsc -p ./tsconfig.prod.json
check_errcode "Failed to compile typescript! aborting script!"

echo "Copying configuration files..."
cp -Rf src/config dist/src/config
check_errcode "Failed to copy configuration files! aborting script!"

echo "Starting to configure React app..."
pushd estateai-client

echo "Building React app for $ENV..."
npm run build --configuration $ENV
check_errcode "Failed to build react! stopping script!"

echo "Copying react dist into dist directory..."
mkdir ../dist/src/dist
cp -Rf build ../dist/src
check_errcode "Failed to copy react dist files! aborting script!"

echo "Removing estateai-client dist directory..."
rm -rf build

# Go back to the current directory
popd

echo "-- Finished building React & NodeJS, check dist directory --"
