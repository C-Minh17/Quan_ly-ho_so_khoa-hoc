declare module MScoringSnapshot {
  interface IRecord {
    snapshotId: string;
    userId: string;
    configVersion: string;
    totalPoints: number;
    byCategory?: any;
    eligibilityFlags?: any;
    generatedAt: string;
    explainJson?: any;
  }
}