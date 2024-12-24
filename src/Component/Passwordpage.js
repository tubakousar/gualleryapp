import React, { useEffect, useState } from "react";
import { savepassword } from "../reduxtoolkit/PasswordSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, message, Input, Button } from "antd";
import "./album.css";

function Passwordpage() {
  const [form] = Form.useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const existentrpassword = useSelector(
    (state) => state.password.savedpassword
  );

  const [password, setPassword] = useState("");

  useEffect(() => {
    setPassword("");
  }, [existentrpassword]);

  const submitpassword = () => {
    if (existentrpassword) {
      if (password !== existentrpassword) {
        message.error("incorrect password");
      } else {
        navigate("/albumpage");
      }
    } else {
      dispatch(savepassword({ password }));
      alert("password set successfully");
      navigate("/albumpage");
      setPassword("");
      form.resetFields();
    }
  };

  return (
    <div className="password-pag">
      <h2 style={{ marginBottom: "20px" }}>Set Your Password</h2>
      <Form form={form} onFinish={submitpassword}>
        <Form.Item style={{ paddingLeft: "20px", paddingRight: "20px" }}>
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            required
          />
        </Form.Item>
        <Button htmlType="submit">
          {existentrpassword ? "Enter password " : "set password"}
        </Button>
      </Form>
    </div>
  );
}

export default Passwordpage;
