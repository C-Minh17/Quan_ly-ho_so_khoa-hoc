export type ReportGroup = 'PAPERS' | 'PROJECTS' | 'CANDIDATES';

export interface IPaperStat {
  year: number;
  isiCount: number;
  scopusCount: number;
  nationalCount: number;
  total: number;
  quartileStats: {
    Q1: number;
    Q2: number;
    Q3: number;
    Q4: number;
  };
}

export interface IProjectStat {
  level: string; // Nhà nước, Bộ, Cơ sở, v.v.
  count: number;
  totalBudget: number;
  status: {
    ongoing: number;
    completed: number;
    cancelled: number;
  };
}

export interface ICandidateStat {
  rank: 'GS' | 'PGS';
  unit: string;
  totalCandidates: number;
  qualified: number;
  ineligible: number;
  averageScore: number;
}

export interface ICollaborationHeatmap {
  department: string;
  collaborations: {
    targetDept: string;
    value: number;
  }[];
}

export interface IReportSummary {
  totalPapers: number;
  totalProjects: number;
  totalCandidates: number;
  totalBudget: number;
  growthRate: number; // Tỷ lệ tăng trưởng so với năm trước (%)
}
