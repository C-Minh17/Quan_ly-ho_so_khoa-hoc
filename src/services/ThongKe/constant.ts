import type { IReportSummary, IPaperStat, IProjectStat, ICandidateStat } from './typing';

export const MOCK_REPORT_SUMMARY: IReportSummary = {
  totalPapers: 1250,
  totalProjects: 85,
  totalCandidates: 45,
  totalBudget: 15200.5, // triệu VNĐ
  growthRate: 12.5,
};

export const MOCK_PAPER_STATS: IPaperStat[] = [
  { 
    year: 2021, isiCount: 85, scopusCount: 120, nationalCount: 210, total: 415,
    quartileStats: { Q1: 25, Q2: 35, Q3: 15, Q4: 10 }
  },
  { 
    year: 2022, isiCount: 95, scopusCount: 145, nationalCount: 230, total: 470,
    quartileStats: { Q1: 30, Q2: 40, Q3: 20, Q4: 5 }
  },
  { 
    year: 2023, isiCount: 110, scopusCount: 160, nationalCount: 250, total: 520,
    quartileStats: { Q1: 40, Q2: 45, Q3: 20, Q4: 5 }
  },
  { 
    year: 2024, isiCount: 130, scopusCount: 185, nationalCount: 280, total: 595,
    quartileStats: { Q1: 50, Q2: 55, Q3: 20, Q4: 5 }
  },
  { 
    year: 2025, isiCount: 150, scopusCount: 210, nationalCount: 310, total: 670,
    quartileStats: { Q1: 60, Q2: 65, Q3: 20, Q4: 5 }
  },
];

export const MOCK_PROJECT_STATS: IProjectStat[] = [
  { level: 'Nhà nước', count: 12, totalBudget: 8500.0, status: { ongoing: 8, completed: 3, cancelled: 1 } },
  { level: 'Cấp Bộ', count: 25, totalBudget: 4200.5, status: { ongoing: 15, completed: 9, cancelled: 1 } },
  { level: 'Cấp Tỉnh', count: 18, totalBudget: 1500.0, status: { ongoing: 10, completed: 8, cancelled: 0 } },
  { level: 'Cấp Cơ sở', count: 30, totalBudget: 1000.0, status: { ongoing: 20, completed: 10, cancelled: 0 } },
];

export const MOCK_CANDIDATE_STATS: ICandidateStat[] = [
  { rank: 'GS', unit: 'Khoa Công nghệ thông tin', totalCandidates: 5, qualified: 3, ineligible: 2, averageScore: 18.5 },
  { rank: 'PGS', unit: 'Khoa Công nghệ thông tin', totalCandidates: 12, qualified: 9, ineligible: 3, averageScore: 12.2 },
  { rank: 'GS', unit: 'Khoa Kinh tế', totalCandidates: 3, qualified: 2, ineligible: 1, averageScore: 17.1 },
  { rank: 'PGS', unit: 'Khoa Kinh tế', totalCandidates: 8, qualified: 6, ineligible: 2, averageScore: 11.5 },
  { rank: 'GS', unit: 'Khoa Ngoại ngữ', totalCandidates: 2, qualified: 1, ineligible: 1, averageScore: 16.8 },
  { rank: 'PGS', unit: 'Khoa Ngoại ngữ', totalCandidates: 6, qualified: 4, ineligible: 2, averageScore: 10.9 },
  { rank: 'GS', unit: 'Khoa Khoa học cơ bản', totalCandidates: 4, qualified: 3, ineligible: 1, averageScore: 19.2 },
  { rank: 'PGS', unit: 'Khoa Khoa học cơ bản', totalCandidates: 10, qualified: 7, ineligible: 3, averageScore: 13.0 },
];

export const MOCK_COLLABORATION_DATA = [
  { name: 'CNTT', data: [ { x: 'CNTT', y: 100 }, { x: 'Kinh tế', y: 35 }, { x: 'Ngoại ngữ', y: 12 }, { x: 'KHCB', y: 55 } ] },
  { name: 'Kinh tế', data: [ { x: 'CNTT', y: 35 }, { x: 'Kinh tế', y: 100 }, { x: 'Ngoại ngữ', y: 42 }, { x: 'KHCB', y: 18 } ] },
  { name: 'Ngoại ngữ', data: [ { x: 'CNTT', y: 12 }, { x: 'Kinh tế', y: 42 }, { x: 'Ngoại ngữ', y: 100 }, { x: 'KHCB', y: 25 } ] },
  { name: 'KHCB', data: [ { x: 'CNTT', y: 55 }, { x: 'Kinh tế', y: 18 }, { x: 'Ngoại ngữ', y: 25 }, { x: 'KHCB', y: 100 } ] },
];
