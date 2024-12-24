import React, { useEffect, useState } from "react";
import { Form, Input, Button } from "antd";
import {
  addalbum,
  deletealbum,
  setcurrentalbum,
} from "../reduxtoolkit/AlbumSlice";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./album.css";

function Albumpage() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [albumname, setAlbumname] = useState("");

  const useralbums = useSelector((state) => state.album.useralbum);

  useEffect(() => {
    const storealbum = JSON.parse(localStorage.getItem("useralbums")) || [];
    if (storealbum && useralbums.length === 0) {
      // if(storealbum.length > 0)
      storealbum.forEach((album) => dispatch(addalbum({ ...album })));
    }
  }, [dispatch, useralbums.length]);

  const Submitalbum = () => {
    const newalbum = { albumname, id: Date.now() };
    dispatch(addalbum(newalbum));

    // console.log(newalbum);

    setAlbumname("");
    form.resetFields();
  };
  const removealbum = (id) => {
    dispatch(deletealbum(id));
    console.log(albumname);
  };
  const handleopnalbum = (album) => {
    dispatch(
      setcurrentalbum({ albumid: album.id, albumname: album.albumname })
    );
    navigate("/showphotos", { state: { albumid: album.id } });
  };

  return (
    <div>
      <div className="album">
        <h1 style={{ marginBottom: "20px" }}>Album</h1>
        <Form className="input-btn" form={form} onFinish={Submitalbum}>
          <Form.Item>
            <Input
              type="text"
              value={albumname}
              onChange={(e) => setAlbumname(e.target.value)} required
            />
          </Form.Item>

          <Button className="btn" htmlType="submit">
            Create
          </Button>
        </Form>
        <div className="album-data">
          {useralbums.map((item) => (
            <div key={item.id} className="show-album">
              <h2 className="album-name" onClick={() => handleopnalbum(item)}>
                {item.albumname}
              </h2>
              <Button className="rem-btn" onClick={() => removealbum(item.id)}>
                remove
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Albumpage;
