import {
    StorageReference,
    getDownloadURL,
    uploadBytes,
} from "firebase/storage";
import b64toBlob from "b64-to-blob";

const uploadImageAsync = async (
    uri: string,
    fileRef: StorageReference,
    base64?: boolean
) => {
    const blob = base64
        ? b64toBlob(uri, "image/png")
        : await fetch(uri).then((response) => response.blob());

    await uploadBytes(fileRef, blob);
    return await getDownloadURL(fileRef);
};

export { uploadImageAsync };
