export interface Product {
    id: string;
    title: string;
    slug: string;
    shortDescription: string;
    pointValue: number;
    condition: string; 
    imageUrl: string | null;
    createdAt: string;
    category: {
        id: string;
        name: string;
    };
    owner: {
        id: string;
        fullname: string;
        avatarUrl: string | null;
    };
}

export interface DetailedProduct {
    id: string;
    title: string;
    slug: string;
    shortDescription: string;
    description: string;
    pointValue: number;
    condition: string; 
    imageUrl: string | null;
    createdAt: string;
    category: {
        id: string;
        name: string;
    };
    owner: {
        id: string;
        fullname: string;
        avatarUrl: string | null;
    };
}
