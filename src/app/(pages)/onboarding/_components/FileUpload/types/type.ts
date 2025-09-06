export type UploadStatus = "loading" | "success" | "error";

export interface UploadedFile {
  id: string;
  name: string;
  size?: number;
  url?: string;
  uploadedAt?: string;
}

export interface UploadedFileProps {
  file?: UploadedFile;
  status?: UploadStatus;
  progress?: number;
  note?: string;
  onRemove?: (id: string) => void;
}
