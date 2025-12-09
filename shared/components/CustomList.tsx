"use client"

import { ReactNode } from "react";

interface customListProps<T> {
    items: T[];
    renderItem?: (item: T) => ReactNode;
}

export default function CustomList<T extends object>({ items, renderItem }: customListProps<T>) {

    if (!Array.isArray(items)) {
        return <div className="p-4 text-center text-gray-500">{items}</div>
    }

    return (
        <div className="space-y-3">
            {items.map((item, index) => (

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