import ApiAdapter from "./ApiAdapter";

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

        // Save new page
        const data = {}

        // Map the form data to a valid scheme
        Object.entries(type.schema.attributes).forEach(([key, attribute]) => {  

            //@ts-ignore
            let value = childData[key]

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
            data[key] = value
        })

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
        const updated = await ApiAdapter.updatePage(parent.id, parentData)

        return newChild
    
    }

    static async updatePage(id: number, data: object) {

    }

}

export default DataProvider