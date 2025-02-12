import path from "path";
import dfidentity from "@dfinity/identity";
import fs from "fs";
import os from "os";
import getRandomValues from "get-random-values";
export const MAX_IDENTITIES = 10;

const newIdentity = () => {
  const entropy = getRandomValues(new Uint8Array(32));
  const identity = dfidentity.Ed25519KeyIdentity.generate(entropy);
  return identity;
};

let fileContents = null;

export const pemIdentity = (path) => {
  // let myFile = fs.readFileSync(path).toString();
  // const rawKey = myFile.replace(/---.*/gm, "").trim();
  // let buff = new Buffer.from(rawKey, "base64");
  // let rawBuffer = new Uint8Array(buff).buffer;
  // const privKey = Uint8Array.from(sha256(rawBuffer, { asBytes: true }));
  // return dfidentity.Secp256k1KeyIdentity.fromSecretKey(privKey);
};

export const fileIdentity = (num) => {
  if (num >= MAX_IDENTITIES) throw new Error("increase MAX identities");

  let dir = os.homedir() + "/.icblast/";
  let fn = path.resolve(dir, "identity.json");

  if (fileContents === null)
    try {
      fileContents = JSON.parse(fs.readFileSync(fn));
    } catch (e) {
      console.log("Creating new identity and saving it in identity.json");
      fileContents = [];
      for (let i = 0; i < MAX_IDENTITIES; i++) {
        fileContents[i] = newIdentity();
      }

      fileContents = JSON.parse(JSON.stringify(fileContents));

      fs.mkdir(dir, (err) => {
        fs.writeFileSync(fn, JSON.stringify(fileContents));
      });
    }

  return dfidentity.Ed25519KeyIdentity.fromParsedJson(fileContents[num]);
};
