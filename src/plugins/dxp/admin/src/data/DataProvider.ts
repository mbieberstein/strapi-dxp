
import { UID } from "@strapi/types/dist/types";
import ApiAdapter from "./ApiAdapter";
import { Strapi } from "@strapi/strapi";  

class DataProvider {

    static getLocales(data: ILocalisation[]): IEntity[] {

        let result = new Array<IEntity>()

        data.forEach(element => {
            result[result.length] = {
                id: element.code, 
                attributes: {
                    name: element.code,
                    Title: element.name,
                    locale: ""
            }}
        });

        return result
    }

    static async addChildPage(type: IContentType, parentId: number, childData: object): Promise<IPage> {

        // Map data
        const data = this.mapData(type, childData)

        // Create the new page
        const newChild = await ApiAdapter.createPage({data: data})

        // Retrieve new id to add it to the list of children of the parent page
        const newId = newChild.id

        // Retrieve parent to update the list of children
        const parent = await ApiAdapter.getPage(parentId)

        const children = []

        // Collect children in a new array
        parent.attributes.children.data.forEach(e => {
            children.push(e.id)
        });

        // Add the new child id
        children.push(newId)

        // Create data object
        const parentData = {data: {children: children}}
        
        // Update parent
        await ApiAdapter.updatePage(parent.id, parentData)

        return newChild
    }

    static async updatePage(type: IContentType, id: string|number, data: object, locale?: string): Promise<IPage> {

        const apiData = this.mapData(type, data)

        await ApiAdapter.updatePage(id, {data: apiData})

        const updated = await ApiAdapter.getPage(id, locale, true)

        return updated
    }

    static async getComponents(): Promise<Map<string, IComponent>> {

        const map = new Map<string, IComponent>();

        const components = await ApiAdapter.getComponents()

        components.data.forEach((component: IComponent) => {

            map.set(component.uid, component)
        })

        return map
    }

    private static mapData(type: IContentType, data: object): object {

        const newData = {}

       // Map the form data to a valid scheme
       Object.entries(type.schema.attributes).forEach(([key, attribute]) => {  

        //@ts-ignore
        let value = data[key]

        if(value === '') {

            // Empty strings are not allowed for some field types.
            // A null value will delete the content of the field
            value = null;

            // BUT: for dynamic zones an empty value needs to be an empty array
            if(attribute.type == "dynamiczone") {
                value = []
            }
        }

            //@ts-ignore
            newData[key] = value
        })

        return newData
    }

}

export default DataProvider
