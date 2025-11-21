"use client";
import { useEffect, useState } from "react";
export default function BlobPage() {
  const [files, setFiles] = useState<any[]>([]);
  const [file, setFile] = useState<File | null>(null);

  const fetchFiles = async () => {
    const res = await fetch("/api/list");
    const data = await res.json();
    setFiles(data);
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", { method: "POST", body: formData });

    if (res.ok) {
      alert("File uploaded!");
      fetchFiles(); // refresh list
    } else {
      const error = await res.json();
      alert(error.error);
    }
  };

  return (
    <div className="text-xl mt-20 flex flex-col p-4 item-center gap-4">
      <h1 className="text-2xl">Upload File</h1>
      <form onSubmit={handleUpload}>
        <input
          className=" text-3xl text-muted-foreground"
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <button className="my-10" type="submit">
          Upload
        </button>
      </form>

      <h2>Files</h2>
      <ul className="p-4 flex items-center flex-col gap-4">
        {files.map((f: any) => (
          <li key={f.key}>
            <a href={f.url} target="_blank" rel="noopener noreferrer">
              {f.key}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
