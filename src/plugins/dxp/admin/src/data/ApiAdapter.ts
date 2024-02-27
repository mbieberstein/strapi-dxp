import axiosInstance from 'axios';

interface IParams {
    url: string
    populate: boolean
    populateDeep: boolean
    preview: boolean
    locale: string
}

class ApiAdapter {

    async getSites(locale: string = ''): Promise<ISite[]> 
    {
        return await this.get({
            url: "/api/sites",
            populate: false,
            populateDeep: false,
            preview: true,
            locale: locale
        })
    }

    async getSite(id: number, locale: string = ''): Promise<ISite> 
    {
        return await this.get({
            url: `/api/sites/${id}`,
            populate: true,
            populateDeep: false,
            preview: true,
            locale: locale
        })
    }

    async getPage(id: number, locale: string = '', populate: boolean = true, populateDeep: boolean = false): Promise<IPage> 
    {
        return await this.get({
            url: `/api/pages/${id}`,
            populate: populate,
            populateDeep: populateDeep,
            preview: true,
            locale: locale
        })
    }

    async getLocales(): Promise<ILocalisation[]> 
    {
        const response = await axiosInstance.get('/api/i18n/locales').then()
        return await response.data
    }

    async getContentType(api: string, type: string): Promise<ContentType> {

        return await this.get({
            url: `/api/content-type-builder/content-types/api::${api}.${type}`,
            populate: false,
            populateDeep: false,
            preview: false,
            locale: ''
        })
    }

    async get<T>(params: IParams): Promise<T> 
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
            params.url += 'deep'
        }

        const response = await axiosInstance.get(params.url)
        return await response.data.data
    }


    /*
    async getWebpage(id: number) {

        const entry = await strapi.entityService.findOne('plugin::dxp.webpage', id, {
            fields: ['name', 'Title'],
            populate: { children: true, renderings: true },
          });

          

        return await entry
    }*/
    
}

export default ApiAdapter