import React, { useEffect, useState } from "react";
import { Button, Card, DatePicker, Radio, message } from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import dayjs, { Dayjs } from "dayjs";
import { PlusOutlined } from "@ant-design/icons";
import { RoomItem } from "/@/service/types/classRoom";
import { useParams } from "react-router-dom";
import {
  getBookingTime,
  getRoomDetail,
  insertBooking,
  insertPreferRoom,
} from "/@/service/api/userRoom";

const disabledDate: RangePickerProps["disabledDate"] = (current) => {
  return (
    current &&
    (current < dayjs().add(-1, "day").endOf("day") ||
      current > dayjs().add(2, "day").endOf("day"))
  );
};

const UseRoomDemo: React.FC = () => {
  const params = useParams();
  const [info, setInfo] = useState<Partial<RoomItem>>({});
  const [timePoint, setTimePoint] = useState<Array<any>>([]);
  const [date, setDate] = useState<Dayjs>(dayjs());
  const [selected, setSelected] = useState<any>();
  const routeParams = useParams();
  const getInfo = async () => {
    const res = await getRoomDetail({ id: Number(routeParams) });
    if (res?.data?.id) {
      setInfo(res?.data);
    }
  };

  const getTimePointFunc = async () => {
    const res = await getBookingTime({
      classroomID: Number(params?.id),
      date: dayjs(date).format("YYYY-MM-DD"),
    });
    if (res?.data?.length) {
      setTimePoint(res?.data);
    }
  };
  useEffect(() => {
    getInfo();
  }, []);
  useEffect(() => {
    getTimePointFunc();
  }, [date]);
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        padding: "30px 0px",
        display: "flex",
        flexDirection: "column",
        maxWidth: 1000,
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          paddingBottom: 10,
        }}
      >
        <h1 style={{ paddingRight: 20 }}>{info?.roomName}</h1>
        <div>
          <DatePicker
            onChange={(e) => {
              setDate(e as any);
            }}
            disabledDate={disabledDate}
            value={date}
          />
          <Button
            type="primary"
            style={{ marginLeft: 20 }}
            onClick={() => getTimePointFunc()}
          >
            SHOW
          </Button>
        </div>
      </div>
      <Card style={{ flexGrow: 1, minHeight: 400 }}>
        <Radio.Group
          onChange={(e) => {
            setSelected(e.target.value);
          }}
        >
          {timePoint?.map?.((item, index) => {
            return (
              <Radio value={item} key={index}>
                {item?.startTime} - {item?.endTime}
              </Radio>
            );
          })}
        </Radio.Group>
      </Card>
      <div
        style={{
          flexShrink: 0,
          display: "flex",
          justifyContent: "space-between",
          padding: "10px 0px",
        }}
      >
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={async () => {
            await insertPreferRoom({ roomId: Number(params?.id) });
          }}
        >
          ADD
        </Button>
        <Button
          type="primary"
          onClick={async () => {
            if (!selected) {
              message.error("Please select a time period first！");
              return;
            }
            await insertBooking(
              { classroomID: Number(params?.id) },
              {
                date: dayjs(date).format("YYYY-MM-DD"),
                startTime: selected?.startTime,
                endTime: selected?.endTime,
              }
            );
          }}
        >
          SUBMIT
        </Button>
      </div>
    </div>
  );
};

export default UseRoomDemo;
