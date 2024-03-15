import axiosInstance from 'axios';

type IParams = {
    url: string
    populate: boolean
    populateDeep: boolean
    preview: boolean
    locale: string
}

class ApiAdapter {

    private static API_SITES = '/api/sites'
    private static API_PAGES = '/api/pages'
    private static API_LOCALES = '/api/i18n/locales'
    private static API_CONTENT_TYPES = '/api/content-type-builder/content-types'
    private static API_COMPONENTS = '/api/content-type-builder/components'
    private static API_DXP_UPDATE = '/api/dxp/update'

    static POPULATE_DEPTH: number = 10

    static async getSites(locale: string = ''): Promise<ISite[]> 
    {
        return await ApiAdapter.get({
            url: ApiAdapter.API_SITES,
            populate: false,
            populateDeep: false,
            preview: true,
            locale: locale
        })
    }

    static async getSite(id: number, locale: string = ''): Promise<ISite> 
    {
        return await ApiAdapter.get({
            url: `${ApiAdapter.API_SITES}/${id}`,
            populate: true,
            populateDeep: false,
            preview: true,
            locale: locale
        })
    }

    static async getPage(id: number|string, locale: string = '', populate: boolean = true, populateDeep: boolean = false): Promise<IPage> 
    {
        return await ApiAdapter.get({
            url: `${ApiAdapter.API_PAGES}/${id}`,
            populate: populate,
            populateDeep: populateDeep,
            preview: true,
            locale: locale
        })
    }

    static async createPage(data: any): Promise<IPage> 
    {
        const response = await axiosInstance.post(`${ApiAdapter.API_PAGES}?populate=*`, data)

        return await response.data.data
    }

    static async updatePage(id: number|string, data: any): Promise<IPage> 
    {
        const url = `${ApiAdapter.API_DXP_UPDATE}/${id}?populate=*`
        const response = await axiosInstance.put(url, data)

        return await response.data.data
    }


    static async getLocales(): Promise<ILocalisation[]> 
    {
        const response = await axiosInstance.get(ApiAdapter.API_LOCALES)
        return await response.data
    }

    static async getContentType(api: string, type: string): Promise<IContentType> {

        return await ApiAdapter.get({
            url: `${ApiAdapter.API_CONTENT_TYPES}/api::${api}.${type}`,
            populate: false,
            populateDeep: false,
            preview: false,
            locale: ''
        })
    }

    static async getComponents(): Promise<IComponents> {
        
        const response = await axiosInstance.get(ApiAdapter.API_COMPONENTS)
        return await response.data
    }

    private static async get<T>(params: IParams): Promise<T> 
    {
        if(params.locale || params.populate || params.populateDeep || params.preview) {
            if(params.url.indexOf('?') > 0) {
                params.url += '&'
            } else {
                params.url += '?'
            }
        }

        // Retrieve drafts and published versions
        if(params.preview) {
            params.url += 'publicationState=preview'
        }

        if(params.locale) {
            params.url += `&locale=${params.locale}`
        }

        if(params.populate || params.populateDeep) {
            params.url += '&populate='
        }

        if(params.populate) {
            params.url += '*'
        }

        if(params.populateDeep) {
            params.url += `deep,${ApiAdapter.POPULATE_DEPTH}`
        }

        const response = await axiosInstance.get(params.url)
        return await response.data.data
    }    
}

export default ApiAdapter