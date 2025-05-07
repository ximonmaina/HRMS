export type Project = {
    id: number;
    name: string;
    description: string;
    logo: string;
    employees: number[];
    subProjectIds: number[];
}