**1. Runing the application using ts-node**

```bash
npm run dev
```
The server starts on http://localhost:3000.


or production mode:

compile:
```bash
npm run build
```
then run the server:
``` bash
npm run start
```

**2. Running the application with docker**

build the dicker image:
```bash
docker build -t random-generator-api:latest .
```
run the container:
```bash
docker run -p 3000:3000 --name random-generator-api random-generator-api:latest
```

## API Endpoints

- POST /v1/generate

  generate num + unique id.
- POST /v1/retrieve/:id

  get num based on id.
