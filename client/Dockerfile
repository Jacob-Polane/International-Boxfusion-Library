FROM node:20

ENV NODE_VERSION 20.9.0
ENV NEXT_PUBLIC_API_BASE_URI=https://localhost:44311/api/

EXPOSE 3000

WORKDIR /app
COPY . /app

CMD ["npm","run","dev"]
