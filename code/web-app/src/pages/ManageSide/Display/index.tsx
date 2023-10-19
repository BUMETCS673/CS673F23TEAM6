import React, { useCallback, useState, useEffect } from "react";
import { Card, Col, Empty, Input, Row, Spin, Image } from "antd";
import { getUserRoomList } from "/@/service/api/userRoom";
import InfiniteScroll from "react-infinite-scroller";
import { RoomItemInfoProps } from "/@/service/types/classRoom";
import displayImg1 from '/@/assets/image/display1.png';
import displayImg2 from '/@/assets/image/display2.png';
import { useNavigate } from 'react-router-dom';

const { Meta } = Card;
const { Search } = Input;

const UserRoomsDemo: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [items, setItems] = useState<Array<RoomItemInfoProps>>([]);
  let [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(false);

  // 获取房间
  // const fetchItems = useCallback(async () => {
  //   const res = await getUserRoomList({ pageNum: page, roomNameRule: name });
  //   if (res?.data?.length) {
  //     const itemsArr = [...items, ...res.data];
  //     setItems(itemsArr);
  //     setPage((page += 1));
  //     if (itemsArr?.length >= res?.data?.[0]?.classroomInfo?.total_count) {
  //       setHasMore(false);
  //     }
  //   } else {
  //     setHasMore(false);
  //   }
  // }, [items, page]);

  useEffect(()=>{
    const itemsArr = [{
      imageData: displayImg1,
    },{
      imageData: displayImg2,
    },{
      imageData: displayImg1,
    },{
      imageData: displayImg2,
    },{
      imageData: displayImg1,
    },{
      imageData: displayImg2,
    },{
      imageData: displayImg1,
    }];

    setItems(itemsArr);
  }, [])

  // 重置
  const reload = () => {
    setPage(1);
    setItems([]);
    setHasMore(true);
  };

  const navigate = useNavigate();

  const handleDetail = () => {
    navigate('/manage/details');
  };

  return (
    <div style={{ marginTop: 30, paddingBottom: 30 }}>
      <InfiniteScroll
        // loadMore={fetchItems}
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
                  lg={6}
                  xl={6}
                  xxl={4}
                  key={index}
                >
                  <div style={{ cursor: 'pointer' }} onClick={handleDetail}>
                    <Image
                          height={350}
                          src={item?.imageData}
                          preview={false}
                          style={{ padding: "3px", objectFit: "fill" }}
                      />
                      <div style={{ 
                        fontSize: '32px', 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        marginTop: '10px',
                        color: '#000' 
                      }}>
                        <span style={{ fontWeight: 800 }}>Title</span>
                        <span style={{ fontWeight: 800, marginRight: '30px' }}>$$</span>
                      </div>
                      <div>
                        <span style={{ fontSize: '20px',  fontWeight: 800, color: '#000'  }}>Short Description</span>
                      </div>
                    </div>
                </Col>
              );
            })
          ) : (
            <Empty description="No data" style={{ margin: "100px auto" }} />
          )}
        </Row>
      </InfiniteScroll>
    </div>
  );
};

export default UserRoomsDemo;
