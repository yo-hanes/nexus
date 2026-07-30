FROM node:22-alpine
WORKDIR /app
COPY server.js .
USER node
EXPOSE 3000
HEALTHCHECK --interval=15s --timeout=3s CMD wget -q -O /dev/null http://127.0.0.1:3000/health || exit 1
CMD ["node", "server.js"]
