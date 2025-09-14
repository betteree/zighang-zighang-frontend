"use client";

import { useState } from "react";
import PersonalBanner from "./personalBanner";
import RecommendArea from "./recommendArea";
import UploadArea from "./uploadArea";

type FileRow = {
  id: string;
  name: string;
  uploadedAt: string;
};

export default function PersonalMain() {
  const [files, setFiles] = useState<FileRow[]>([]);

  const handleFileUpload = (newFiles: FileRow[]) => {
    setFiles(newFiles);
  };

  return (
    <div className="flex flex-col gap-3.5 md:gap- justify-center itmes-center mt-11 md:mt-19 px-8 md:px-0">
      <h2 className="text-black text-xl md:text-2xl font-semibold ">
        맞춤공고
      </h2>
      <PersonalBanner files={files} />
      <RecommendArea hasFiles={files.length > 0} onFileUpload={() => {}} />
      <UploadArea onFilesChange={handleFileUpload} />
    </div>
  );
}
