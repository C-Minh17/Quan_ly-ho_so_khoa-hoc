declare module MPublication {
  interface IRecord {
    pubId: string;
    userId: string;
    type: "journal_article" | "conference_paper" | "book" | "book_chapter" | "editorial" | "review" | "other";
    title: string;
    authors: any;
    year: number;
    publicationDate?: string;
    journalTitle?: string;
    proceedingsTitle?: string;
    issn?: string;
    eIssn?: string;
    isbn?: string;
    volume?: string;
    issue?: string;
    pages?: string;
    doi?: string;
    indexing?: ("Scopus" | "WOS" | "ESCI" | "ACI" | "DOAJ" | "VJOL")[];
    quartile?: "Q1" | "Q2" | "Q3" | "Q4";
    citationCount?: number;
    selfCitationCount?: number;
    hdgsPointYear?: number;
    evidenceFileId?: string;
  }
}