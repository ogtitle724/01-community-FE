import { useState, useEffect } from "react";
import axios from "axios";

import HorizontalList from "../component/horizontal_list/Horizontal_List";
import Board from "../component/board/Board";
import "./style.css";

export default function ContentHome({ domain, postData }) {
  return (
    <div className="main__content">
      <HorizontalList />
      <Board title={"Recent Posts"} postData={postData} />
    </div>
  );
}
