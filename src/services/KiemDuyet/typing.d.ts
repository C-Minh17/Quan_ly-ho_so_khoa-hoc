declare namespace MKiemDuyet {
  export type WorkType = 'ARTICLE' | 'CONFERENCE' | 'PROJECT' | 'BOOK' | 'PATENT';

  export type ReviewStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'SUPPLEMENT_REQUESTED' | 'FINAL_REVIEW';

  export interface IScientificWork {
    id: string;
    type: WorkType;
    title: string;
    authors: string[];
    submissionDate: string;
    status: ReviewStatus;
    userName: string;
    userId: string;
    affiliation: string;
    tags: string[];
    evidenceFiles: string[];
    score?: number;
    details: ArticleDetails | ConferenceDetails | ProjectDetails | BookDetails | PatentDetails;
    reviewHistory: IReviewHistory[];
    duplicateCheckResult?: string;
  }

  export interface IReviewHistory {
    date: string;
    action: ReviewStatus;
    actor: string;
    comment?: string;
  }

  export interface ArticleDetails {
    journalName: string;
    issn: string;
    vol: string;
    issue: string;
    pages: string;
    doi?: string;
    scopusId?: string;
    quartile?: string; // Q1, Q2, etc.
  }

  export interface ConferenceDetails {
    conferenceName: string;
    location: string;
    organizer: string;
    date: string;
  }

  export interface ProjectDetails {
    projectName: string;
    projectCode: string;
    fundingAgency: string;
    role: string;
    duration: string;
  }

  export interface BookDetails {
    publisher: string;
    isbn: string;
    edition: string;
  }

  export interface PatentDetails {
    patentNumber: string;
    country: string;
    applicationDate: string;
  }
}
