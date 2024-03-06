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

    static async addPage(parentId: number, childData: object): Promise<IPage> {

        // Save new page
        const newChild = await ApiAdapter.createPage(childData)

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

        return updated
    
    }

}

export default DataProvider