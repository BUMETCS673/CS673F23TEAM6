import localHttp from "../http/index";

enum Api {
  UserRoomList = "/classroom/detailedList",
  InsertBooking = "/booking/insert",
  DeleteBooking = "/booking/delete",
  BookingHistory = "/booking/history",
  BookingInfoTime = "/booking/timeSegments",
  ClassroomInfo = "/classroom/info",
  PreferRoomsList = "/preference/classroomInfo",
  InsertPreferRoom = "/preference/insert",
  DelPreferRoom = "/preference/delete",
  FilterRooms = "/classroom/filterClassroom",
}

/**
 * @description 用户教室列表
 * @param params
 */
export const getUserRoomList = async (params: {
  pageNum: number;
  roomNameRule?: string;
}) =>
  localHttp({
    method: "GET",
    url: Api.UserRoomList,
    params,
  });

/**
 * @description 过滤教室
 * @param params
 */
export const getFilterRooms = async (params: {
  pageNum: number;
  floor?: number;
  capacity?: number;
  power?: number;
}) =>
  localHttp({
    method: "GET",
    url: Api.FilterRooms,
    params,
  });

/**
 * @description 获取教室信息
 * @param data
 */
export const getRoomDetail = async (params: { id: number }) =>
  localHttp({
    method: "GET",
    url: Api.ClassroomInfo,
    params,
  });

/**
 * @description 新建预定
 * @param params
 * @param data
 */
export const insertBooking = async (
  params: { classroomID: number },
  data: {
    date: string;
    startTime: string;
    endTime: string;
  }
) =>
  localHttp(
    {
      method: "POST",
      url: Api.InsertBooking,
      data,
      params,
    },
    {
      isLoading: true,
    }
  );

/**
 * @description 删除预定
 * @param params
 * @param data
 */
export const delBooking = async (params: { id: number }) =>
  localHttp({
    method: "DELETE",
    url: Api.DeleteBooking,
    params,
  });

/**
 * @description 获取预约记录
 * @param params
 */
export const getBookingHistory = async (params: {
  pageNum: number;
  roomNameRule?: string;
}) =>
  localHttp({
    method: "GET",
    url: Api.BookingHistory,
    params,
  });

/**
 * @description 获取可预约时间段
 * @param params
 */
export const getBookingTime = async (params: {
  classroomID: number;
  date: string;
}) =>
  localHttp({
    method: "GET",
    url: Api.BookingInfoTime,
    params,
  });

/**
 * @description 获取偏好教室列表
 * @param params
 */
export const getPreferBookingList = async (params: {
  pageNum?: number;
  roomNameRule: string;
}) =>
  localHttp({
    method: "GET",
    url: Api.PreferRoomsList,
    params,
  });

/**
 * @description 添加用户偏好教室
 * @param params
 */
export const insertPreferRoom = async (params: { roomId: number }) =>
  localHttp(
    {
      method: "POST",
      url: Api.InsertPreferRoom,
      params,
    },
    {
      isLoading: true,
    }
  );

/**
 * @description 删除偏好教室
 * @param params
 */
export const delPreferRoom = async (params: { roomId: number }) =>
  localHttp({
    method: "DELETE",
    url: Api.DelPreferRoom,
    params,
  });
