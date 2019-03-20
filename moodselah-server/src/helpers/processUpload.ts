import { createWriteStream } from "fs";
import mkdirp from "mkdirp";
import nanoid from "nanoid";
import format from "date-fns/format";

const { UPLOAD_FILE_PATH } = process.env;
mkdirp.sync(UPLOAD_FILE_PATH);

const storeUpload = async ({
  createReadStream,
  filename,
  prefix
}): Promise<any> => {
  const id = nanoid();
  const extension = (filename as string).split(".").pop();
  const suffix = extension ? `.${extension.toLowerCase()}` : "";
  const datePath = format(new Date(), "YYYY/MM/DD");
  const basePath = prefix
    ? `${UPLOAD_FILE_PATH}/${datePath}/${prefix}`
    : `${UPLOAD_FILE_PATH}/${datePath}`;
  mkdirp.sync(basePath);

  const path = `${basePath}/${id}${suffix}`;
  return new Promise((resolve, reject) =>
    createReadStream()
      .pipe(createWriteStream(path))
      .on("finish", () => resolve({ id, path }))
      .on("error", reject)
  );
};

const recordFile = file => {
  // TODO 파일 업로드
  return file;
};

const processUpload = async (upload, prefix: string | number = "") => {
  const { createReadStream, filename, mimetype, encoding } = await upload;
  const { id, path } = await storeUpload({
    createReadStream,
    filename,
    prefix
  });
  return recordFile({ id, filename, mimetype, encoding, path });
};

export const passingUpload = async upload => {
  const { createReadStream } = await upload;
  createReadStream();
  return upload;
};

export default processUpload;
