const { default: customAxios } = require("../CustomeAxios");


export const newOrders = async () => {
    const homeData = await customAxios.get(`rider/orders/new`);
    return homeData?.data?.data?.orders ?  homeData?.data?.data?.orders : homeData?.data?.data
}


export const updateOrderStatus = async(datas) => {
    const acceptData = await customAxios.post(`rider/orders/updateStatus`, datas)
    return acceptData
}


export const activeOrders = async () => {
    const homeData = await customAxios.get(`rider/orders/active`);
    return homeData?.data?.data?.orders ?  homeData?.data?.data?.orders : homeData?.data?.data
}

export const completedOrders = async () => {
    const homeData = await customAxios.get(`rider/orders/completed`);
    return homeData?.data?.data?.orders ?  homeData?.data?.data?.orders : homeData?.data?.data
}