"use client";

import { useState } from "react";
import PersonalBanner from "./personalBanner";
import RecommendArea from "./recommendArea";
import UploadArea from "./uploadArea";

export default function PersonalMain() {
  const [hasFiles, setHasFiles] = useState(false);
  const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState(false);

  const handleFileChange = (hasFiles: boolean) => {
    setHasFiles(hasFiles);
  };

  const handleAnalysisModalChange = (isOpen: boolean) => {
    setIsAnalysisModalOpen(isOpen);
  };

  return (
    <div className="flex flex-col gap-3.5 md:gap- justify-center itmes-center mt-11 md:mt-19 px-8 md:px-0">
      <h2 className="text-black text-xl md:text-2xl font-semibold ">
        맞춤공고
      </h2>
      <PersonalBanner hasFiles={hasFiles} />
      <RecommendArea
        hasFiles={hasFiles}
        isAnalysisModalOpen={isAnalysisModalOpen}
        onFileUpload={() => {}}
      />
      <UploadArea
        onFilesChange={handleFileChange}
        onAnalysisModalChange={handleAnalysisModalChange}
      />
    </div>
  );
}
