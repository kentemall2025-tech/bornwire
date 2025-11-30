import { list } from "@vercel/blob";
import Image from "next/image";

export default async function Page() {
  const response = await list();

  return (
    <>
      {response.blobs.map((blob) => (
        <div className="grid grid-cols-1 md:grid-cols-2 items-center   gap-4 ">
          <Image
            src={`https://csmvkgdme8w3hyot.public.blob.vercel-storage.com/${blob.pathname}`}
            alt="consiege"
            className="w-full h-[50vh]  p-8 object-cover"
            width={600}
            height={400}
          />
          <p className="px-6 text-blue-500">{`https://csmvkgdme8w3hyot.public.blob.vercel-storage.com/${blob.pathname}`}</p>
        </div>
      ))}
    </>
  );
}
