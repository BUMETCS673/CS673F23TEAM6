import React, { useCallback, useState, useEffect } from "react";
import { Card, Col, Empty, Input, Row, Spin, Image, Button } from "antd";
import { getUserRoomList } from "/@/service/api/userRoom";
import InfiniteScroll from "react-infinite-scroller";
import { RoomItemInfoProps } from "/@/service/types/classRoom";
import displayImg1 from '/@/assets/image/display1.png';
import displayImg2 from '/@/assets/image/display2.png';
import { useNavigate } from 'react-router-dom';

const { Meta } = Card;
const { Search } = Input;

const UserRoomsDemo: React.FC = () => {
  const navigate = useNavigate();

  const handleDisplay = () => {
    navigate('/manage/display');
  };

  return (
    <div style={{ marginTop: 30, paddingBottom: 30 }}>
        <Button onClick={handleDisplay}>Back</Button>
        <div style={{ 
          marginTop: '20px',
          display: 'flex',
          flexDirection: 'column'
       }}>
          <div>
                <Image
                    height={350}
                    src={displayImg1}
                    preview={false}
                    style={{ padding: "3px", objectFit: "fill" }}
                />
                <Image
                    height={350}
                    src={displayImg1}
                    preview={false}
                    style={{ padding: "3px", objectFit: "fill" }}
                />
                <Image
                    height={350}
                    src={displayImg1}
                    preview={false}
                    style={{ padding: "3px", objectFit: "fill" }}
                />
          </div>

          <div style={{ marginTop: '20px', fontSize: '25px', fontWeight: '750' }}>
            <span>Harry Potter - Order of Phoenix</span>
            <span style={{ marginLeft: '100px', backgroundColor: '#ddd', padding: '10px' }}>$10</span>
          </div>
          <div style={{ marginTop: '20px', fontSize: '20px' }}>
            <span>The evil Lord Voldemort has returned. His influence is suddenlyeverywhere in the Wizarding world, and his former allies, 
              the DeathEaters, are returning to his side in droves. In response, the Order ofthe Phoenix, which worked to stop him during his last rise to powerhas reconvened.</span>
          </div>
        </div>
    </div>
  );
};

export default UserRoomsDemo;
