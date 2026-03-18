declare module MUser {
  interface IRecord {
    userId: string;
    fullName: string;
    nameAscii?: string;
    gender?: "Nam" | "Nữ" | "Khác";
    dob?: string;
    nationalId?: string;
    orcid?: string;
    externalIds?: any;
    affiliationPrimary: string;
    departments?: any;
    academicRankCurrent?: "Giảng viên" | "Giảng viên chính" | "Phó Giáo sư" | "Giáo sư";
    degreeHighest: "Cử nhân" | "Kỹ sư" | "Thạc sĩ" | "Tiến sĩ" | "Tiến sĩ Khoa học";
    politicalTheoryStatus?: "Sơ cấp" | "Trung cấp" | "Cao cấp" | "Cử nhân" | "Chưa có";
    foreignLanguageCerts?: any;
  }
}