
// BASE DEFINITIONS

interface IEntity {
    id: number | string
    attributes: IAttributes
}

interface IAttributes {
    name: string
    Title: string
    locale: string
}

interface ISingleReference<T> {
    data: T
}
interface IMultiReference<T> {
    data: T[]
}


// Site
interface ISite extends IEntity {
    attributes: ISiteAttributes
}

interface ISiteAttributes extends IAttributes {
    home: ISingleReference<IPage>
    hostname: string
}

// Page
interface IPage extends IEntity {
    attributes: IPageAttributes
}

interface IPageAttributes extends IAttributes {
    renderings: Rendering[]
    children: IMultiReference<IPage>
}

interface Rendering extends IEntity {

}

// LOCALE
interface ILocalisation extends IEntity {
    name: string
    code: string
    default: boolean
}

interface IContentType {

    uid: string
    apiId: string
    schema: ISchema
}
interface ISchema {

    draftAndPublish: boolean
    displayName: string
    singularName: string
    pluralName: string
    description: string
    attributes: object
}

class Page implements IPage {

    attributes: IPageAttributes
    id: string | number
    
    constructor() {
        this.id = 0
        this.attributes = new PageAttributes
    }
}

class PageAttributes implements IPageAttributes {
    renderings: Rendering[] = []
    children!: IMultiReference<IPage>
    name!: string
    Title!: string
    locale!: string
}
