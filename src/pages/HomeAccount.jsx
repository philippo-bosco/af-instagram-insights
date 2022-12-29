import React from "react";
import Post from "../components/post"
/*
import { useState, useEffect } from "react";
import { Link, renderMatches } from "react-router-dom";

import { AccountService } from "../components/AccountService";
*/
export default function Home(props) {
  return (
    <div>
      <Post src={props.link} didascalia={props.didascalia}/>
    </div>
  );
}
