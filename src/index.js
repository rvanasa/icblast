import icblast, { fileIdentity, blast } from "./sys/index.js";

let ic = icblast({ local: true });

let can = await ic("r7inp-6aaaa-aaaaa-aaabq-cai");

let r = await can.config_get();

console.log(r);
