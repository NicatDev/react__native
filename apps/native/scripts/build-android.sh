#!/bin/bash

mode=${1:-release}
echo "Building app in ${mode} mode"

if [[ "$mode" != "debug" && "$mode" != "release" ]]; then
  echo "Invalid mode: $mode. Must be 'debug' or 'release'."
  exit 1
fi
gradle_mode="$(tr '[:lower:]' '[:upper:]' <<< "${mode:0:1}")${mode:1}"

pushd ./android || exit 1
rm -rf app/build/generated/assets/createBundleReleaseJsAndAssets/index.android.bundle
./gradlew build "assemble${gradle_mode}" || exit 1
popd || exit 1

mkdir -p build
rm -rf build/android.apk
cp android/app/build/outputs/apk/"$mode"/app-"$mode".apk build/android.apk
