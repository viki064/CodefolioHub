import React from "react";
import { BiSolidMessageDots } from "react-icons/bi";

function BotAvatar() {
  return (
    <div
      style={{
        width: 45,
        height: 40,
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "grey",
        marginRight: 15,
      }}
    >
      <BiSolidMessageDots size={22} />
    </div>
  );
}

export default BotAvatar;
