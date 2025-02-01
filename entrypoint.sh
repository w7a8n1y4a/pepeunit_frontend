#!/bin/sh

/usr/share/nginx/html/env_to_json.sh > /usr/share/nginx/html/config.js

if [ -n "$VITE_SELF_URI" ]; then
  sed -i "s|%VITE_SELF_URI%|$VITE_SELF_URI|g" /usr/share/nginx/html/index.html
else
  echo "VITE_SELF_URI is not set. Skipping replacement."
fi

exec nginx -g "daemon off;"