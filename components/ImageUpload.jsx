'use client';
import { Storage } from 'appwrite';

export default function ImageUpload({ onUpload }) {
  const uploadToAppwrite = async (file) => {
    const storage = new Storage(client);
    const result = await storage.createFile(
      'garments',
      ID.unique(),
      file
    );
    const url = `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/garments/files/${result.$id}/view`;
    onUpload(url);
  };

  return <input type="file" onChange={e => uploadToAppwrite(e.target.files[0])} />;
}
