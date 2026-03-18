declare module MDegree {
  interface IRecord {
    degreeId: string;
    userId: string;
    level: "Cử nhân" | "Kỹ sư" | "Thạc sĩ" | "Tiến sĩ" | "Tiến sĩ Khoa học";
    thesisTitle?: string;
    major?: string;
    institution: string;
    country?: string;
    graduationDate?: string;
    diplomaFileId?: string;
  }
}