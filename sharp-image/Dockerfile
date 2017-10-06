FROM node:8

RUN mkdir /src

WORKDIR /src
ADD ./package.json /src/package.json
RUN npm install --production
COPY app/*.js /src/app/
# COPY apidoc /src/apidoc

EXPOSE 3000

CMD ["node", "/src/app/app.js", "--max-old-space-size=128"]