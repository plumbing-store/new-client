import { lazy, useState } from 'react'

type Map = { [key: string]: string }

export const useTabs = (initialTab: string, map: Map) => {
    const [activeTab, setActiveTab] = useState<string>(initialTab)

    const components = Object.entries(map).reduce((result: any, [key, value]) => {
        result[key] = lazy(() => import(`${value}`))
        return result
    }, {})

    const Component = components[activeTab]

    return {
        activeTab,
        setActiveTab,
        Component
    }
}
