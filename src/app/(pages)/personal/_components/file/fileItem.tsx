"use client";

type FileRow = {
  id: string;
  name: string;
  uploadedAt: string;
};

type FileItemProps = {
  file: FileRow;
  index: number;
  onDelete: (id: string) => void;
};

export default function FileItem({ file, index, onDelete }: FileItemProps) {
  return (
    <li className="grid grid-cols-12 items-center px-2 py-3">
      <div className="col-span-2 text-sm text-zinc-700">{index + 1}</div>
      <div className="col-span-7 text-sm text-zinc-900 truncate">
        {file.name}
      </div>
      <div className="col-span-2 text-sm text-zinc-700">{file.uploadedAt}</div>
      <div className="col-span-1">
        <button
          type="button"
          className="ml-auto block text-red-500 text-sm hover:underline"
          onClick={() => onDelete(file.id)}
        >
          삭제
        </button>
      </div>
    </li>
  );
}
