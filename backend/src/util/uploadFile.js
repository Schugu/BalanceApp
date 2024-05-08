import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage"; // importar metodos de firebase
import { storage } from "../firebase.js"; // importar nuestra config de firebase
import sharp from "sharp"; // Modulo para optimizar imagenes y que pesen menos

export async function uploadFile(file, usuarioId) {
  let fileBuffer = await sharp(file.buffer)
    .resize({ width: 200, height: 200, fit: "cover" })
    .toBuffer();

  const fileRef = ref(storage, `files/ProfilePhotoOf${usuarioId} ${Date.now()}`);

  const fileMetadata = {
    contentType: file.mimetype
  }

  const fileUploadPromise = uploadBytesResumable(fileRef, fileBuffer, fileMetadata);

  await fileUploadPromise;

  const fileDownloadUrl = await getDownloadURL(fileRef);

  return { ref: fileRef, downloadUrl: fileDownloadUrl };
}
