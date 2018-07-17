import { Injectable } from "@angular/core";

export interface IDataItem {
    id: number;
    name: string;
    description: string;
    image: string;
}

@Injectable()
export class DataService {

    private items = new Array<IDataItem>(
        {
            id: 1,
            name: "Item 1",
            description: "Description for Item 1",
            image: "http://i.blogs.es/6ed0af/portada-2/450_1000.jpg"
        },
        {
            id: 2,
            name: "Item 2",
            description: "Description for Item 2",
            image: "https://i.blogs.es/6ed0af/portada-2/450_1000.jpg"
        },
        {
            id: 3,
            name: "Item 3",
            description: "Description for Item 3",
            image: "https://i.blogs.es/6ed0af/portada-2/450_1000.jpg"
        },
        {
            id: 4,
            name: "Item 4",
            description: "Description for Item 4",
            image: "https://i.blogs.es/6ed0af/portada-2/450_1000.jpg"
        },
        {
            id: 5,
            name: "Item 5",
            description: "Description for Item 5",
            image: "https://i.blogs.es/6ed0af/portada-2/450_1000.jpg"
        },
        {
            id: 6,
            name: "Item 6",
            description: "Description for Item 6",
            image: "https://i.blogs.es/6ed0af/portada-2/450_1000.jpg"
        },
        {
            id: 7,
            name: "Item 7",
            description: "Description for Item 7",
            image: "https://i.blogs.es/6ed0af/portada-2/450_1000.jpg"
        },
        {
            id: 8,
            name: "Item 8",
            description: "Description for Item 8",
            image: "https://i.blogs.es/6ed0af/portada-2/450_1000.jpg"
        },
        {
            id: 9,
            name: "Item 9",
            description: "Description for Item 9",
            image: "https://i.blogs.es/6ed0af/portada-2/450_1000.jpg"
        },
        {
            id: 10,
            name: "Item 10",
            description: "Description for Item 10",
            image: "https://i.blogs.es/6ed0af/portada-2/450_1000.jpg"
        },
        {
            id: 11,
            name: "Item 11",
            description: "Description for Item 11",
            image: "https://i.blogs.es/6ed0af/portada-2/450_1000.jpg"
        },
        {
            id: 12,
            name: "Item 12",
            description: "Description for Item 12",
            image: "https://i.blogs.es/6ed0af/portada-2/450_1000.jpg"
        },
        {
            id: 13,
            name: "Item 13",
            description: "Description for Item 13",
            image: "https://i.blogs.es/6ed0af/portada-2/450_1000.jpg"
        },
        {
            id: 14,
            name: "Item 14",
            description: "Description for Item 14",
            image: "https://i.blogs.es/6ed0af/portada-2/450_1000.jpg"
        },
        {
            id: 15,
            name: "Item 15",
            description: "Description for Item 15",
            image: "https://i.blogs.es/6ed0af/portada-2/450_1000.jpg"
        },
        {
            id: 16,
            name: "Item 16",
            description: "Description for Item 16",
            image: "https://i.blogs.es/6ed0af/portada-2/450_1000.jpg"
        }
    );

    getItems(): Array<IDataItem> {
        return this.items;
    }

    getItem(id: number): IDataItem {
        return this.items.filter((item) => item.id === id)[0];
    }
}
