const { default: customAxios } = require("../CustomeAxios");


export const homeDetails = async () => {
    const homeData = await customAxios.get(`rider/home`);
    return homeData?.data?.data?.orders ?  homeData?.data?.data?.orders : homeData?.data?.data
}