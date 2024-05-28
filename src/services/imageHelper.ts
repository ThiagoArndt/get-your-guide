import mime from "mime-types";
import fs from "fs";
import path from "path";

// Function to extract the base64 data and save it as an image
export function saveBase64Image(base64Image: string, userId: string) {
  const PROFILE_IMAGE_DIR = path.join(__dirname, "profile_images");

  // Ensure the profile image directory exists
  if (!fs.existsSync(PROFILE_IMAGE_DIR)) {
    fs.mkdirSync(PROFILE_IMAGE_DIR);
  }
  const base64Index = base64Image.indexOf("base64/");
  if (base64Index === -1) {
    throw new Error("Invalid base64 data format");
  }

  // Extract the base64 data
  const mimeType = base64Image.substring(4, base64Index);

  // Extract the base64 data
  const base64Data = base64Image.substring(base64Index + 7);
  console.log(mimeType);
  console.log(base64Data);
  // Determine the file extension from the mime type
  const extension = mime.extension(mimeType);

  if (!extension) {
    throw new Error("Invalid mime type");
  }

  // Convert base64 data to buffer
  console.log(base64Data.substring(0, 100));
  const buffer = Buffer.from("/" + base64Data, "base64");

  // Save the buffer as an image file
  const profileImageFilePath = path.join(PROFILE_IMAGE_DIR, `${userId}.${extension}`);

  fs.writeFileSync(profileImageFilePath, buffer);

  return profileImageFilePath;
}
