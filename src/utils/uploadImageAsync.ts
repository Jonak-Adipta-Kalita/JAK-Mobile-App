import {
    StorageReference,
    getDownloadURL,
    uploadBytes,
    uploadString,
} from "firebase/storage";

const uploadImageAsync = async (
    uri: string,
    fileRef: StorageReference,
    base64?: boolean
) => {
    if (base64) {
        await uploadString(fileRef, uri, "base64");
    } else {
        const blob = await fetch(uri).then((response) => response.blob());
        await uploadBytes(fileRef, blob);
    }

    return await getDownloadURL(fileRef);
};

export { uploadImageAsync };
