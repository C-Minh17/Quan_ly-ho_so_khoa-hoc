declare module MPositionHistory {
  interface IRecord {
    positionId: string;
    userId: string;
    title: string;
    unit: string;
    startDate: string;
    endDate?: string;
    decisionFileId?: string;
  }
}