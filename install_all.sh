#!/bin/bash

# Install all of the dependencies, including the development and productin
function install_deps() {
    # Install dev depdendencies but ignore postinstall script
    npm install --only=dev --ignore-scripts
    # Install prod dependencies and run postinstall script if exists
    npm install --only=prod
}

echo "Installing all dependencies for NodeJS & React..."
install_deps

# Install the react deps
pushd estateai-client
install_deps
popd
echo "Finished installing dependencies!"
