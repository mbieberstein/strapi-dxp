
interface IPage {
    id: number
    attributes: IAttributes
}

interface IAttributes {
    Title: string
    locale: string
    children: IChildren<IPage>
    renderings: Rendering[]
}

interface IChildren<T> {
    data: T[]
}

interface Rendering {
    id: number
}