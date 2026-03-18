declare module MAward {
  interface IRecord {
    awardId: string;
    userId: string;
    title: string;
    level?: "Quốc tế" | "Quốc gia" | "Địa phương" | "Cơ sở giáo dục";
    date?: string;
    evidenceFileId?: string;
  }
}