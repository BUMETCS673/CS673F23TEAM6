export type InsertRoomParams = {
  location: string;
  floor: number;
  roomName: string;
  capacity: number;
  power: number;
  photo: string;
};

export type RoomItem = {
  capacity: number;
  date: string;
  end_time: string;
  floor: number;
  id: number;
  location: string;
  power: number;
  roomName: string;
  start_time: string;
};

interface RoomItemInfoProps extends RoomItem {
  imageData: string;
  classroomInfo: RoomItem;
}
