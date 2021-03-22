
## Admin

## Getting Started

First, run the server:

```bash
npm start
```
## Run Docker

Production:

`docker build -t reactioncommerce/admin .`
`docker run -it -p 4080:3000 -d reactioncommerce/admin`

Development

`docker build -t reactioncommerce/admin-dev -f Dockerfile.dev .`
`docker run -it -p 4080:3000 -d reactioncommerce/admin-dev`
