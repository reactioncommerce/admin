/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
require("dotenv").config();
const http = require("http");
const envalid = require("envalid");
const Url = require("url-parse");

const {
  HYDRA_OAUTH2_CLIENT_ID,
  HYDRA_OAUTH2_ADMIN_HOST,
  HYDRA_OAUTH2_ADMIN_PORT,
  OAUTH2_ADMIN_URL,
  HYDRA_REDIRECT_URL
} = envalid.cleanEnv(process.env, {
  HYDRA_OAUTH2_CLIENT_ID: envalid.str({
    desc: "Client ID",
    example: "open-commerce-admin"
  }),
  HYDRA_OAUTH2_ADMIN_HOST: envalid.str({
    desc: "Hydra admin hostname",
    example: "localhost"
  }),
  HYDRA_OAUTH2_ADMIN_PORT: envalid.str({
    desc: "Hydra admin port",
    example: "4445"
  }),
  OAUTH2_ADMIN_URL: envalid.str({
    desc: "Hydra admin API",
    example: "http://localhost:4445"
  }),
  HYDRA_REDIRECT_URL: envalid.url({
    desc: "The canonical root URL for the Reaction Admin Core site",
    example: "http://localhost:8080"
  })
});

const makeAbsolute = (relativeUrl, baseUrl = HYDRA_REDIRECT_URL) => {
  const url = new Url(baseUrl, true);
  url.set("pathname", relativeUrl);
  return url.href;
};

/* eslint-disable camelcase */
const bodyEncoded = JSON.stringify({
  client_id: HYDRA_OAUTH2_CLIENT_ID,
  token_endpoint_auth_method: "none",
  redirect_uris: [
    makeAbsolute("/authentication/callback"),
    makeAbsolute("/authentication/silent_callback")
  ],
  grant_types: ["authorization_code"],
  response_types: ["code"],
  post_logout_redirect_uris: [HYDRA_REDIRECT_URL]
});
/* eslint-enable camelcase */

const options = {
  hostname: HYDRA_OAUTH2_ADMIN_HOST,
  port: HYDRA_OAUTH2_ADMIN_PORT,
  path: "/clients",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(bodyEncoded)
  },
  origin: OAUTH2_ADMIN_URL
};

/**
 * Create Hydra client
 * @returns {Promise} A promise that resolves on success and rejects of failure
 */
async function createHydraClient() {
  const promise = new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      res.setEncoding("utf8");
      let body = "";

      res.on("data", (chunk) => {
        body += chunk.toString();
      });

      res.on("end", () => {
        switch (res.statusCode) {
          case 200:
          // intentional fallthrough!
          // eslint-disable-line no-fallthrough
          case 201:
            console.log("OK: hydra client created");
            resolve();
            break;
          case 409:
            console.log("OK: hydra client already exists");
            resolve();
            break;
          default:
            console.error("ERROR: Could not create hydra clientz");
            console.error(body);
            reject(10);
        }
      });
    });

    req.on("error", (error) => {
      console.error("ERROR: Could not create hydra client");
      console.error(error.message);
      reject(11);
    });
    req.end(bodyEncoded);
  });

  return promise;
}

createHydraClient();
