"use client"

import { ReactNode } from "react";

interface customListProps<T> {
    items: T[];
    renderItem?: (item: T) => ReactNode;
}

const hasArray = (obj: object) => {

    for (const key in obj) {
        const value = (obj as any)[key];
        if (Array.isArray(value)) {
            return value;
        }
    }
    return [];
}

export default function CustomList<T extends object>({ items, renderItem }: customListProps<T>) {

    const itArray = hasArray(items);

    return (
        <div className="space-y-3">

            {itArray.map((item, index) => (

                <div key={index} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                    {renderItem ? (renderItem(item)) : (<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                        {Object.entries(item).map(([key, value]) => (
                            <div key={key}>
                                {/* <div className="text-sm font-medium">{key.replace(/([A-Z])/g, ' $1')}:</div> */}
                                <div className="mt-1 text-gray-900">
                                    {value === null || value === undefined || Array.isArray(value) ? '-' : Array.isArray(value) ?
                                        value.join(', ') : String(value)}
                                </div>
                            </div>
                        ))}
                    </div>
                    )}
                </div>
            ))}
        </div>)
}