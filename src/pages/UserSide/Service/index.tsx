import React, { useCallback, useState } from "react";
import {
  ReloadOutlined,
  FilterOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import {
  Card,
  Col,
  Empty,
  Form,
  InputNumber,
  Modal,
  Radio,
  Row,
  Spin,
  Image,
} from "antd";
import { useNavigate } from "react-router-dom";
import { getFilterRooms } from "/@/service/api/userRoom";
import InfiniteScroll from "react-infinite-scroller";
import { RoomItemInfoProps } from "/@/service/types/classRoom";
const { Meta } = Card;

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [items, setItems] = useState<Array<RoomItemInfoProps>>([]);
  let [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [form] = Form.useForm();

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  const onFinish = () => {
    reload();
    setIsModalOpen(false);
  };

  // 获取房间
  const fetchItems = useCallback(async () => {
    const res = await getFilterRooms({
      floor: 1,
      pageNum: page - 1,
      ...(form?.getFieldsValue?.() || {}),
    });
    if (res?.data?.length) {
      const itemsArr = [...items, ...res.data];
      setItems(itemsArr);
      setPage((page += 1));
      if (itemsArr?.length >= res?.data?.[0]?.classroomInfo?.total_count) {
        setHasMore(false);
      }
    } else {
      setHasMore(false);
    }
  }, [items, page]);

  // 重置
  const reload = () => {
    setPage(1);
    setItems([]);
    setHasMore(true);
  };

  return (
    <div style={{ padding: "30px 0px" }}>
      <div style={{ paddingBottom: 20 }}>
        <FilterOutlined
          style={{
            fontSize: 25,
            paddingRight: 10,
            cursor: "pointer",
            color: "#000",
          }}
          onClick={() => setIsModalOpen(true)}
        />
        <ReloadOutlined
          style={{
            fontSize: 25,
            paddingRight: 10,
            cursor: "pointer",
            color: "#000",
          }}
          onClick={() => {
            form.resetFields();
            reload();
          }}
        />
      </div>
      <InfiniteScroll
        loadMore={fetchItems}
        hasMore={hasMore}
        loader={
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              paddingTop: 30,
            }}
            key={0}
          >
            <Spin />
          </div>
        }
      >
        <Row gutter={[12, 12]} wrap={true}>
          {items?.length ? (
            items.map((item, index) => {
              return (
                <Col
                  className="gutter-row"
                  sm={12}
                  md={12}
                  lg={8}
                  xl={6}
                  xxl={4}
                  key={index}
                >
                  <Card
                    cover={
                      <Image
                        height={200}
                        src={item?.imageData}
                        preview={false}
                        style={{ padding: "3px", objectFit: "fill" }}
                        fallback="data:image/png;base64,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"
                      />
                    }
                    actions={[
                      <a
                        onClick={() => {
                          navigate(`/user/useRoom/${item?.classroomInfo?.id}`);
                        }}
                      >
                        <LinkOutlined
                          key="setting"
                          style={{ paddingRight: "10px" }}
                        />
                        use room
                      </a>,
                    ]}
                    bordered
                  >
                    <Meta
                      title={`Maximun capacity：${item?.classroomInfo?.capacity}`}
                      description={`Location：${item?.classroomInfo?.floor}`}
                    />
                  </Card>
                </Col>
              );
            })
          ) : (
            <Empty description="No data" style={{ margin: "100px auto" }} />
          )}
        </Row>
      </InfiniteScroll>

      <Modal
        title="Filter"
        open={isModalOpen}
        onOk={onFinish}
        onCancel={() => setIsModalOpen(false)}
        okText="Apply"
        cancelText="Close"
        getContainer={undefined}
      >
        <Form form={form} {...formItemLayout} style={{ maxWidth: 600 }}>
          <Form.Item name="floor" label="Floor">
            <Radio.Group>
              <Radio value={1}>1</Radio>
              <Radio value={2}>2</Radio>
              <Radio value={3}>3</Radio>
              <Radio value={4}>4</Radio>
              <Radio value={5}>5</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="power" label="Power Available">
            <Radio.Group>
              <Radio value={1}>YES</Radio>
              <Radio value={2}>NO</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="capacity" label="Capacity">
            <InputNumber min={1} precision={0} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default App;
