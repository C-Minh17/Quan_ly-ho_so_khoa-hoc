declare module MProject {
  interface IRecord {
    projectId: string;
    userId: string;
    title: string;
    level: "Quốc gia" | "Bộ" | "Ngành" | "Cơ sở" | "Quỹ";
    role?: "PI" | "co-PI" | "member";
    startDate?: string;
    endDate?: string;
    status?: "Đang thực hiện" | "Đã nghiệm thu" | "Đình chỉ";
    acceptanceResult?: "Xuất sắc" | "Đạt" | "Không đạt";
    outputs?: any[];
    evidenceFileId?: string;
  }
}