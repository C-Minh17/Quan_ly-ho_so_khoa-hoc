declare module MSupervision {
  interface IRecord {
    supId: string;
    userId: string;
    level: "Tiến sĩ" | "Thạc sĩ" | "Đại học";
    studentName: string;
    institution?: string;
    thesisTitle?: string;
    startDate?: string;
    defenseDate?: string;
    status?: "Đang làm" | "Đã bảo vệ" | "Dừng";
    decisionFileId?: string;
  }
}