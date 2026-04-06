declare module MSupervision {
  interface IRecord {
    supId: string;
    userId: string;
    level: "Tiến sĩ" | "Thạc sĩ" | "Đại học";
    role: "Hướng dẫn chính" | "Đồng hướng dẫn";
    studentName: string;
    institution?: string;
    thesisTitle?: string;
    startDate?: string;
    defenseDate?: string;
    status?: "Đang làm" | "Đã bảo vệ" | "Dừng";
    decisionFileId?: string;
  }
}