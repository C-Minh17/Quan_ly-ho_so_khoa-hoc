export const MOCK_SCORING_SNAPSHOTS: MScoringSnapshot.IRecord[] = [
  {
    snapshotId: "SNAP-001",
    userId: "USR-001",
    configVersion: "HDGS-PGS-2023-v2",
    totalPoints: 127.5,
    byCategory: {
      publications: 72.0,
      books: 0,
      projects: 18.0,
      supervision: 20.0,
      teaching: 12.5,
      awards: 5.0,
      other: 0,
    },
    eligibilityFlags: {
      seniority: true,
      foreignLanguage: true,
      degreeRequirement: true,
      publicationMinimum: true,
    },
    generatedAt: "2024-01-10",
    explainJson: {
      publications: [
        { pubId: "PUB-001", points: 2.0, note: "Q1 Scopus/WOS – điểm 2" },
        { pubId: "PUB-002", points: 1.0, note: "Q2 Scopus – điểm 1" },
      ],
      projects: [
        { projectId: "PRJ-001", points: 12.0, note: "Quỹ NAFOSTED – PI – Xuất sắc" },
        { projectId: "PRJ-002", points: 6.0, note: "Cấp Bộ – PI – Đang thực hiện" },
      ],
    },
  },
  {
    snapshotId: "SNAP-002",
    userId: "USR-002",
    configVersion: "HDGS-PGS-2023-v2",
    totalPoints: 98.0,
    byCategory: {
      publications: 60.0,
      books: 0,
      projects: 18.0,
      supervision: 10.0,
      teaching: 8.0,
      awards: 2.0,
      other: 0,
    },
    eligibilityFlags: {
      seniority: true,
      foreignLanguage: true,
      degreeRequirement: true,
      publicationMinimum: true,
    },
    generatedAt: "2024-01-10",
    explainJson: {
      publications: [
        { pubId: "PUB-003", points: 2.0, note: "Q1 Scopus/WOS – điểm 2" },
        { pubId: "PUB-005", points: 2.0, note: "Q1 Scopus/WOS – điểm 2" },
      ],
    },
  },
  {
    snapshotId: "SNAP-003",
    userId: "USR-003",
    configVersion: "HDGS-GS-2023-v2",
    totalPoints: 215.0,
    byCategory: {
      publications: 120.0,
      books: 15.0,
      projects: 30.0,
      supervision: 30.0,
      teaching: 10.0,
      awards: 10.0,
      other: 0,
    },
    eligibilityFlags: {
      seniority: true,
      foreignLanguage: true,
      degreeRequirement: true,
      publicationMinimum: true,
    },
    generatedAt: "2024-01-10",
  },
];