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

}

export default DataProvider