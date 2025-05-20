export type AuthorResponse = {
    authorId: number;
    authorName: string;
    authorPhotoUrl: string;
};

export type AuthorPageResponse = {
    total: number;
    authors: AuthorResponse[];
};

export type AuthorFullResponse = {
    authorId: number;
    authorName: string;
    authorDescription: string;
    authorPhotoUrl: string;
}; 