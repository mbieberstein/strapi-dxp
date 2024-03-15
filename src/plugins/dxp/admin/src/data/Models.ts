
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

// COMMON SCHEMA FOR CONTENT TYPE / COMPONENT
interface ISchema {
    displayName: string
    attributes: object
}

// CONTENT TYPE
interface IContentType {

    uid: string
    apiId: string
    schema: IContentTypeSchema
}

interface IContentTypeSchema extends ISchema {

    draftAndPublish: boolean
    singularName: string
    pluralName: string
    description: string
}

// COMPONENTS
interface IComponents {
    data: IComponent[]
}

interface IComponent {

    uid: string
    category: string
    apiId: string
    schema: IComponentSchema
}

interface IComponentSchema extends ISchema {

    description: string
    icon: string
    collectionName: string
}

// RENDERING
interface IRendering {
    id: number
    __component: string
}
