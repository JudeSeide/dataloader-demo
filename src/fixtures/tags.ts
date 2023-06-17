import { isEmpty } from 'lodash';

export type Tag = {
    id: string;
    name: string;
    children?: Tag[];
}

export const data: Tag[] = [
    {
        id: '11702996',
        name: 'Fragrance',
        children: [
            {
                id: '11700153',
                name: 'citrus',
            },
            {
                id: '11700154',
                name: 'floral',
            },
            {
                id: '11700155',
                name: 'fresh',
            }
        ],
    },
    {
        id: '11702997',
        name: 'Formulation',
        children: [
            {
                id: '11700156',
                name: 'cream',
            },
            {
                id: '11700157',
                name: 'gel',
            },
            {
                id: '11700158',
                name: 'lotion',
            }
        ]
    },
    {
        id: '11702998',
        name: 'Fabric',
        children: [
            {
                id: '11700159',
                name: 'cotton',
            },
            {
                id: '11700160',
                name: 'denim',
            },
            {
                id: '11700161',
                name: 'leather',
            }
        ]
    }
];

const flatten = (tree: Tag[]): Tag[] => {
    const flat: Tag[] = [];

    const traverse = (root: Tag) => {
        flat.push(root);

        if (root.children?.length > 0) {
            root.children.forEach((child) => traverse(child));
        }
    };

    tree.forEach((node) => traverse(node));

    return flat;
}

export const flatData = flatten(data);

export const tags = {
    find: async (id: string): Promise<Tag | null> => {
        console.log('\x1b[33m', `Find tag with id ${id}`);
        return flatData.find(tag => tag.id === id) || null;
    },
    findAll: async (ids?: string[], batched: boolean = false): Promise<(Tag | null)[]> => {
        if (isEmpty(ids)) {
            console.log('\x1b[33m', 'Find all tags');
            return flatData;
        }

        console.log('\x1b[33m', 'Find all tags with ids', ids);

        if (batched) {
            return ids.map(id => flatData.find(tag => tag.id === id) || null);
        }

        return flatData.filter(tag => ids.includes(tag.id));
    }
};
