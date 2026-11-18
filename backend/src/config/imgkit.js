import ImageKit from "@imagekit/nodejs";
import envConfig from "./env.js";

const imagekit = new ImageKit({
    privateKey:envConfig.IMAGE_KIT_PRIVATE_KEY
});

export default imagekit;