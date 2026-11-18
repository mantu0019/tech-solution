import { toFile } from "@imagekit/nodejs";
import imagekit from "../config/imgkit.js";

const uploadToImageKit = async (file) => {
  const response = await imagekit.files.upload({
    file: await toFile(file.buffer, file.originalname),
    fileName: `${Date.now()}-${file.originalname}`,
    folder: "/services/results",
    isPrivateFile: true,
  });

  return {
    url: response.url,
    fileId: response.fileId,
    fileType: file.mimetype == "application/pdf" ? "pdf" : "image",
    originalName: file.originalname,
  };
};

export default uploadToImageKit;
