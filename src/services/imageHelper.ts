export function getImageFromBuffer(data: any) {
  const base64Image = Buffer.from(data.data).toString("base64");
  // Correct the prefix
  let result;

  // Correct the prefix
  if (base64Image!.startsWith("dataimage/jpegbase64/")) {
    result = base64Image!.replace("dataimage/jpegbase64/", "");
  }

  return `data:image/jpeg;base64,/${result}`;
}
