FROM node:18.0.0

WORKDIR /usr/src/api

COPY . .

RUN npm install --quiet --no-optional --no-fund --loglevel=error

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start:prod" ]

RUN npx prisma reset