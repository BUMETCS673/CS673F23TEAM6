import React, { useEffect, useState } from "react";
import { Button, Input, Popconfirm, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { RoomItem } from "/@/service/types/classRoom";
import { delBooking, getBookingHistory } from "/@/service/api/userRoom";
import dayjs from "dayjs";

const { Search } = Input;

const UserHIstoryDemo: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);
  const [items, setItems] = useState<RoomItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getHistoryFunc = async () => {
    try {
      setLoading(true);
      const res = await getBookingHistory({
        pageNum: page - 1,
        roomNameRule: name,
      });
      if (res?.data?.length) {
        setItems(res?.data || []);
        setCount(res?.data?.total_count);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHistoryFunc();
  }, [page]);
  const columns: ColumnsType<RoomItem> = [
    {
      title: "Item",
      dataIndex: "roomName",
      key: "roomName",
    },
    {
      title: "From",
      dataIndex: "start_time",
      key: "start_time",
      render(_value, record) {
        return `${record?.date} ${record?.start_time}`;
      },
    },
    {
      title: "To",
      dataIndex: "end_time",
      key: "end_time",
      render(_value, record) {
        return `${record?.date} ${record?.end_time}`;
      },
    },
    {
      title: "Action",
      key: "operation",
      width: 200,
      render: (record) => {
        if (
          dayjs(`${record?.date} ${record?.end_time}`).diff(
            dayjs().format("YYYY-MM-DD HH:mm:ss"),
            "s"
          ) > 0
        ) {
          return (
            <div>
              <Popconfirm
                title="Cancel Room"
                description="Are you sure to cancel this room?"
                onConfirm={async () => {
                  const res = await delBooking({ id: Number(record?.id) });
                  if ((res as any)?.errorCode == 0) {
                    getHistoryFunc();
                  }
                }}
                okText="Yes"
                cancelText="No"
              >
                <Button type="primary" size="small" danger>
                  Cancel
                </Button>
              </Popconfirm>
            </div>
          );
        } else {
          return "--";
        }
      },
    },
  ];
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ maxWidth: 300, flexShrink: 0, padding: "20px 0px" }}>
        <Search
          placeholder="search rooms"
          allowClear
          enterButton="Search"
          size="large"
          onInput={(e) => {
            setName(e?.currentTarget?.value);
          }}
          onSearch={() => {
            setPage(1);
            getHistoryFunc();
          }}
        />
      </div>
      <div style={{ flexGrow: 1 }}>
        <Table
          columns={columns}
          dataSource={items}
          style={{ flexGrow: 1 }}
          sticky={true}
          rowKey="id"
          pagination={{
            onChange(page) {
              setPage(page);
            },
            total: count,
            current: page,
          }}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default UserHIstoryDemo;
