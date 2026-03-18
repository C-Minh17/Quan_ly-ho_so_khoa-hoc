declare module MContribution {
  interface IRecord {
    pubId: string;
    userId: string;
    authorOrder: number;
    role: "Tác giả chính" | "Đồng tác giả";
    affiliationAtPub?: string;
  }
}