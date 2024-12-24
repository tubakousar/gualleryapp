import React from "react";
import {Button} from "antd"
import { useNavigate } from "react-router-dom";
import "./album.css";
// import { ArrowRightOutlined } from "@ant-design/icons";
function Landingpage() {
  const navigate = useNavigate();

  const clickgallery = () => {
    navigate("/passwordpage");
  };

  return (
    <div className="galery" style={{ cursor: "pointer" }}>
      <Button className="text" onClick={clickgallery}>
        Gallery Photos
      </Button>
      <div>
        {/* <ArrowRightOutlined className="aero" /> */}
      </div>
    </div>
  );
}

export default Landingpage;
