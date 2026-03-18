declare module MEvidenceFile {
  interface IRecord {
    fileId: string;
    ownerUserId: string;
    fileName: string;
    fileType: string;
    source?: "Nội bộ" | "Tải lên" | "Liên kết ngoài" | "API";
    url?: string;
    accessScope?: "Riêng tư" | "Hội đồng" | "Ngành" | "Công khai";
  }
}