const { default: customAxios } = require("../CustomeAxios");

export const workList = async () => {
    const listData = await customAxios.get('rider/work/list');
    return listData?.data?.data;
}

export const filterList = async (data) => {
    const filterList = await customAxios.post('rider/work/list-filter', data);
    return filterList?.data?.data;
}

export const workLogs = async (data) => {
    const workLog = await customAxios.post('rider/work/logs', data);
    return workLog?.data?.data;
}