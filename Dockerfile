FROM node:22-alpine AS build
ARG APP
WORKDIR /platform

COPY package.json package-lock.json ./
COPY main/package.json main/package.json
COPY approval/package.json approval/package.json
COPY agency/package.json agency/package.json
COPY admin/package.json admin/package.json
RUN npm ci

COPY shared shared
COPY ${APP} ${APP}
RUN npm run build -w ${APP}

FROM nginx:1.27-alpine
ARG APP
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /platform/${APP}/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=15s --timeout=3s --start-period=5s CMD wget -q -O /dev/null http://127.0.0.1/ || exit 1
