import {
    StorageReference,
    getDownloadURL,
    uploadBytes,
} from "firebase/storage";

const uploadImageAsync = async (
    uri: string,
    fileRef: StorageReference,
    base64?: boolean
) => {
    if (base64) {
        // Upload Base64 Image
    }
    const blob = await fetch(uri).then((response) => response.blob());
    await uploadBytes(fileRef, blob);
    return await getDownloadURL(fileRef);
};

export { uploadImageAsync };
