declare module MTeaching {
  interface IRecord {
    teachId: string;
    userId: string;
    academicYear: string;
    semester: "HK1" | "HK2" | "HK3";
    courseCode?: string;
    courseName: string;
    credits: number;
    role?: "Chính" | "Phụ";
    hoursEquiv?: number;
    evaluationScore?: number;
    evidenceFileId?: string;
  }
}