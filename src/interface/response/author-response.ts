export interface AuthorResponse {
    data: {
        id: string;
        name: string;
    }
}
export interface AuthorListResponse {
    data: {
        id: string;
        name: string;
    }[],    
}