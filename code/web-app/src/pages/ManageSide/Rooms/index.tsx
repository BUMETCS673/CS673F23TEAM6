import React, { useEffect, useState } from "react";
import { Button, Input, Popconfirm, Table, Form, DatePicker } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { RoomItem } from "/@/service/types/classRoom";
import { delRoom, getClassroomList } from "/@/service/api/manageRoom";
import bookImg1 from '/@/assets/image/book1.jpg';
import bookImg2 from '/@/assets/image/book2.jpg';
import bookImg3 from '/@/assets/image/book3.jpg';
import bookImg4 from '/@/assets/image/book4.jpg';

const ManageRoomsDemo: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(1000);
  const [list, setList] = useState<any[]>([]);
  const [goodsName, setGoodsName] = useState<any>('');

  const allItems = [{
    name: 'Notre-Dame of Paris',
    src: bookImg1
  }, {
    name: 'War and Peace',
    src: bookImg2
  },{
    name: 'Wuthering Heights',
    src: bookImg3
  },{
    name: 'Red and Black',
    src: bookImg4
  }];

  useEffect(() => {
    const listItems = [...allItems];

    setList(listItems);
  }, [page]);

  const handleSearch = () => {
    let newList = [...list];
    newList = allItems.filter(item => item.name.includes(goodsName));

    setList(newList);
  }; 

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ flexShrink: 0, padding: "20px 0px" }}>
        <Form
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
        >
          <Form.Item label="Goods">
            <Input placeholder="Search for the goods you want" onChange={(e)=> {setGoodsName(e.target.value)}}/>
          </Form.Item>
          <Form.Item label="Year from">
            <DatePicker />
          </Form.Item>
          <Form.Item label="Year to">
            <DatePicker />
          </Form.Item>
          <Form.Item { ...{ wrapperCol: { span: 14, offset: 5 } }}>
            <Button type="primary" onClick={handleSearch}>Search</Button>
          </Form.Item>
        </Form>
      </div>
      <div style={{ flexGrow: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {list?.map?.((item, index) => {
            return (
              <div key={index} style={{ display: 'flex', flexDirection: 'column', maxWidth: 200, marginRight: '20px' }}>
                <img src={item.src} width={ '100%' } height={ '80%' }></img>
                <span style={{ textAlign: 'center' }}>{item.name}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default ManageRoomsDemo;
