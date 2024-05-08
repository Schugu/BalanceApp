import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage"; // importar metodos de firebase
import { storage } from "../firebase.js"; // importar nuestra config de firebase
import sharp from "sharp"; // Modulo para optimizar imagenes y que pesen menos

export async function uploadFile(file, usuarioId) {
  let fileBuffer = await sharp(file.buffer)
    .resize({ width: 200, height: 200, fit: "cover" })
    .toBuffer();

  const fileRef = ref(storage, `files/ProfilePhotoOf${usuarioId}`);

  const fileMetadata = {
    contentType: file.mimetype
  }

  const fileUploadPromise = uploadBytesResumable(fileRef, fileBuffer, fileMetadata);

  await fileUploadPromise;

  const fileDownloadUrl = await getDownloadURL(fileRef);

  return { ref: fileRef, downloadUrl: fileDownloadUrl };
}


export async function deleteFile(filePath) {
  try {
    // Crear una referencia al archivo que se va a eliminar
    const fileRef = ref(storage, filePath);

    // Eliminar el archivo
    await deleteObject(fileRef);

    console.log("Archivo eliminado correctamente.");
    return true;
  } catch (error) {
    console.error("Error al eliminar el archivo:", error);
    return false;
  }
}

// Función para verificar si el archivo de perfil ya existe
export async function profilePhotoExists(usuarioId) {
  try {
    const fileRef = ref(storage, `files/ProfilePhotoOf${usuarioId}`);
    await getDownloadURL(fileRef);
    return true; // El archivo existe
  } catch (error) {
    if (error.code === "storage/object-not-found") {
      return false; // El archivo no existe
    }
    throw error; // Si ocurre otro tipo de error, lo lanzamos
  }
}