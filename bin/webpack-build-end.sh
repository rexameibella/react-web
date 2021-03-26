#!/bin/bash

cp dist/bundle* ./public/
cp -R dist/resources ./public/

INDEX_VIEW="dist/index.html"
if [[ -f "$INDEX_VIEW" ]]; then
    cp "$INDEX_VIEW" protected/views/index.ejs
fi

awk '{sub(/bundle\.css(|?timestamp=[0-9]{14})/, "bundle.css?timestamp="  strftime("%Y%m%d%H%M%S"))}1' "./protected/views/index.ejs" > "./protected/views/index.ejs.temp" && mv "./protected/views/index.ejs.temp" "./protected/views/index.ejs"
awk '{sub(/bundle\.js(|?timestamp=[0-9]{14})/, "bundle.js?timestamp="  strftime("%Y%m%d%H%M%S"))}1' "./protected/views/index.ejs" > "./protected/views/index.ejs.temp" && mv "./protected/views/index.ejs.temp" "./protected/views/index.ejs"

rm -rf dist

echo "Webpack End"
