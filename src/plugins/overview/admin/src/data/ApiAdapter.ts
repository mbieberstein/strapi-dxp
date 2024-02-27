import axiosInstance from 'axios';

class ApiAdapter {

    async getHome(): Promise<IPage> {

        const response = await axiosInstance.get("/api/pages/1?populate=deep")
        return await response.data.data
    }

    async getPage(id: Number): Promise<IPage> {

        const response = await axiosInstance.get( `/api/pages/${id}?populate=deep`)
        return await response.data.data
    }

}

export default ApiAdapter