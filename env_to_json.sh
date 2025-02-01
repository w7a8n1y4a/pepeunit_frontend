#!/bin/sh
echo 'window.env = {'
env | grep VITE | while IFS='=' read -r key value; do
  echo "  \"$key\": \"$value\","
done | sed '$s/,$//'
echo '};'