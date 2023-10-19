import localHttp from "../http/index";
import { InsertRoomParams } from "../types/classRoom";

enum Api {
  ManageRoomList = "/classroom/list",
  InsertRoom = "/classroom/insert",
  UpdateRoom = "/classroom/update",
  DeleteRoom = "/classroom/delete",
  UploadImage = "/classroom/uploadImage",
  Statistic = "/classroom/statics",
}

/**
 * @description 管理员教室列表
 * @param params
 */

export const getClassroomList = async (params: {
  pageNum: number;
  roomNameRule?: string;
}) =>
  localHttp({
    method: "GET",
    url: Api.ManageRoomList,
    params,
  });

/**
 * @description 添加教室
 * @param data
 */
export const insertRoom = async (data: InsertRoomParams) =>
  localHttp(
    {
      method: "POST",
      url: Api.InsertRoom,
      data,
    },
    {
      isLoading: true,
    }
  );

/**
 * @description 修改教室
 * @param params
 * @param data
 */
export const updateRoom = async (
  params: { id: number },
  data: Partial<InsertRoomParams>
) =>
  localHttp(
    {
      method: "POST",
      url: Api.UpdateRoom,
      data,
      params,
    },
    {
      isLoading: true,
    }
  );

/**
 * @description 删除教室
 * @param params
 */
export const delRoom = async (params: { id: number }) =>
  localHttp({
    method: "DELETE",
    url: Api.DeleteRoom,
    params,
  });

/**
 * @description 上传图像
 * @param data
 */
export const uploadImage = async (data: FormData) =>
  localHttp({
    method: "POST",
    url: Api.UploadImage,
    data,
  });

/**
 * @description 获取统计信息
 * @param params
 */
export const getStatistic = async (params: { date: string }) =>
  localHttp({
    method: "GET",
    url: Api.Statistic,
    params,
  });
