import React, { useState } from "react";
import { Input, Modal } from "antd";
import {
  addimg,
  deleteimgaction,
  deleteselectedallimgs,
} from "../reduxtoolkit/PhotoSlice";
import { useDispatch, useSelector } from "react-redux";
import { DeleteOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";

function Showphotos() {
  const dispatch = useDispatch();
  const location = useLocation();
  const currentlyalbum = useSelector((state) => state.album.currentalbum);

  const albumid = location.state?.albumid || currentlyalbum.albumid;
  const albumname = location.state?.albumname || currentlyalbum.albumname;

  const [photoname, setPhotoname] = useState("");

  const [selected, setSelected] = useState(new Set());

  const [searchname, setSearchName] = useState("");

  const [previewimg, setPreviewimg] = useState(null);
  const [ismodalopn, setIsModalopn] = useState(false);

  const userphotos = useSelector((state) => state.photopage.userphotos);
  const filterphotos = userphotos.filter((photo) => photo.albumid === albumid);

  const handlefilechange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const newphoto = {
          photoURL: reader.result,
          id: Date.now(),
          photoname: photoname || "unitiled",
          albumid,
        };
        dispatch(addimg(newphoto));
        return newphoto;
      };

      reader.readAsDataURL(file);
    });
    setPhotoname("");
  };

  const deleteimg = (id) => {
    dispatch(deleteimgaction(id));
  };

  const selectchkbox = (id) => {
    setSelected((prev) => {
      const newselect = new Set(prev);
      if (newselect.has(id)) {
        newselect.delete(id);
      } else {
        newselect.add(id);
      }
      return newselect;
    });
  };
  const deleteselectedall = () => {
    dispatch(deleteselectedallimgs(Array.from(selected)));
    setSelected(new Set());
  };

  const OpenPreview = (imgurl) => {
    setPreviewimg(imgurl);
    setIsModalopn(true);
  };
  const closeModal = () => {
    setIsModalopn(false);
    setPreviewimg(null);
  };

  return (
    <div>
      <p className="title">
        Add Photos from Your Computer Gallery in {albumname}
      </p>
      <div style={{ position: "relative" }}>
        <div className="photo-pag">
          <div className="left">
            <Input
              className="name"
              type="text"
              value={photoname}
              onChange={(e) => setPhotoname(e.target.value)}
              placeholder="Enter image name"
              required
            />
            {/* <br/><br /> */}
            <Input
              className="choose-file"
              type="file"
              accept="image/*"
              multiple
              onChange={handlefilechange}
            />
          </div>
          <div className="right">
            <DeleteOutlined
              className="allimg-delete"
              onClick={deleteselectedall}
            />
            <Input.Search
              value={searchname}
              onChange={(e) => setSearchName(e.target.value)}
              className="search"
            />
          </div>
          {/* <Button className="search-btn">Search</Button> */}
        </div>

        <div className="display-img">
          <div className="img-box">
            {filterphotos
              .filter((file) =>
                file.photoname.toLowerCase().includes(searchname.toLowerCase())
              )
              .map((file) => (
                <div className="img-container" key={file.id}>
                  <img
                    className="img"
                    src={file.photoURL}
                    alt={file.photoURL}
                  />
                  <p style={{ textAlign: "center" }}>{file.photoname}</p>

                  <div className="overlay">
                    <input
                      type="checkbox"
                      checked={selected.has(file.id)}
                      onChange={() => selectchkbox(file.id)}
                      className="chk-box"
                    />
                    <DeleteOutlined
                      className="del-icon"
                      onClick={() => deleteimg(file.id)}
                    />
                    <button
                      className="prev-btn"
                      onClick={() => OpenPreview(file.photoURL)}
                    >
                      preview
                    </button>
                  </div>
                </div>
              ))}
            {}
          </div>
        </div>
        {/* modal oopen */}
        <Modal
          className="modal"
          open={ismodalopn}
          onCancel={closeModal}
          footer={null}
          closable={true}
          centered
          width={800}
          height={800}
          style={{ padding: 0 }}
        >
          <img src={previewimg} alt="" style={{ width: "100%" }} />
        </Modal>
      </div>
    </div>
  );
}

export default Showphotos;
