import { ref, getDownloadURL, uploadBytesResumabl } from "firebase/storage"; // importar metodos de firebase
import { storage } from "../firebase.js"; // importar nuestra config de firebase
import sharp from "sharp"; // Modulo para optimizar imagenes y que pesen menos

export async function uploadFile(file) {
  let fileBuffer = await sharp(file.buffer)
    .resize({ width: 200, height: 200, fit: "cover" })
    .toBuffer();
}
