FROM node:20 as builder

WORKDIR .

COPY package*.json ./

RUN npm install --f

COPY . .



ENV PORT 3000
ENV NEXT_PUBLIC_API_BASE_URI https://localhost:44311/api/

EXPOSE 3000

CMD ["dir"]

CMD [ "npm", "start" ]

