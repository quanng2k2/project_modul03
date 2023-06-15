import React, { useEffect, useState } from "react";
import Homeadmin from "./Homeadmin";
import Table from "react-bootstrap/esm/Table";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Form from "react-bootstrap/Form";
import "./css/adminuser.css";
import { formatDate1 } from "../../formatDatas/Formatdata";

export default function Adminusers() {
  const [dataUser, setDataUser] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/v1/users");
        setDataUser(response.data.users);
      } catch (error) {
        console.log(error);
      }
    };
    loadUsers();
  }, []);

  return (
    <>
      <Homeadmin />
      <div className="container-admintrips">
        <h1>Quản lý người dùng</h1>

        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-success">Search</Button>
        </Form>

        <Table striped bordered hover size="sm">
          <thead className="table-users">
            <tr>
              <th>STT</th>
              <th>Email</th>
              <th>Username</th>
              <th>Thời gian đăng ký</th>
              <th>Xóa</th>
            </tr>
          </thead>
          <tbody className="content-users">
            {dataUser.map((user, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{user.email}</td>
                <td>{user.username}</td>
                <td>{formatDate1(user.created_at)}</td>
                <td>
                  <Button variant="danger">Xóa Acc</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}
