export interface PurchaseData {
    id: string;
    PK: string | undefined;
    SK: string | any;
    type: string | any;
    imagefile: string | any;
    price: number | any;
    username: string | any;
    description: string | any;
    isInCart: number | any;
    isPurchased: number | any;
    index: number | any;
}

export interface NewItemValue {
    PK: string;
    SK: string;
    type: string;
    imagefile: string;
    price: number;
    username: string;
    description: string;
    isInCart: number;
}

export interface UpdateItemValue {
    PK: string;
    SK: string;
    type: string;
    imagefile: string;
    price: number;
    username: string;
    description: string;
    isInCart: number;
}
