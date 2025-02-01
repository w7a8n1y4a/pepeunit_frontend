FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine
EXPOSE 80

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html
COPY --from=builder /app/env_to_json.sh /usr/share/nginx/html/env_to_json.sh
COPY --from=builder /app/entrypoint.sh /entrypoint.sh

RUN chmod +x /usr/share/nginx/html/env_to_json.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]