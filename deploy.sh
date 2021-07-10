#!/bin/sh

npm run build
cp -r public docs
sed -i "s|'/\(.*\)'|'\1'|" docs/index.html
git add docs
git commit -m "Deploy ($(date -u "+%Y-%m-%d"))"
