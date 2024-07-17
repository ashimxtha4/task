"use client";

import Image from "next/image";
import { useState } from "react";
import Group from "../../public/Group.svg";
import Docs from "../../public/document 1.svg";
import Drop from "../../public/mingcute_down-line.svg";
import Delete from "../../public/material-symbols-light_delete-outline.svg";
type UserType = { name: String; post: String; id: String; city: String };
type CityType = { name: String; id: String; users: UserType[] };
type propsType = {
  cityData: CityType[];
  setCityData: any;
  currentOpen: String | null;
  setCrrentOpen: any;
};

export default function DropZone(props: propsType) {
  function handleOnDrop(e: React.DragEvent, index: number) {
    console.log(e.dataTransfer.getData("value") as string);
    let temp = [...props.cityData];
    temp[index].users.push(JSON.parse(e.dataTransfer.getData("value")));
    props.setCityData(temp);
  }
  function handleOnDragOver(e: React.DragEvent) {
    e.preventDefault();
    console.log("data");
  }
  function changeCurrent(index: String) {
    if (index == props.currentOpen) props.setCrrentOpen(null);
    else props.setCrrentOpen(index);
  }

  return props.cityData.map((data: CityType, index) => (
    <div key={index} className="w-full border-2 border-[#066699] p-[16px] flex flex-col gap-[12px] rounded-[8px]">
      <div className="flex justify-between h-[28px] items-center topDiv">
        <div className="">
          City: <span className="ml-[8px] text-[#414141]">{data.name}</span>
        </div>
        <div className="flex items-center">
          <span>
            <Image src={Docs} alt="docs"></Image>
          </span>
          <span className="ml-[10px] text-[14px]">{data.users.length} User</span>
          <span className="ml-[32px] cursor-pointer" onClick={() => changeCurrent(data.id)}>
            <Image src={Drop} alt="drop"></Image>
          </span>
        </div>
      </div>
      {props.currentOpen == data.id ? (
        <div className="flex flex-col gap-[12px]">
          {data.users.map((user, indx) => (
            <div key={indx} className="py-[12px] flex justify-between items-center border border-solid">
              <div className="leftGroup flex flex-col gap-[8px]">
                <span className="text-[#066699] font-medium">{user.name}</span>
                <div className="flex gap-[16px]">
                  <div>
                    <Image src={Group} alt="icon"></Image>
                  </div>
                  <span className="font-normal font-[14px] text-[#414141]">{user.post}</span>
                </div>
              </div>
              <div>
                <div className="cursor-pointer">
                  <Image src={Delete} alt="delete"></Image>
                </div>
              </div>
            </div>
          ))}
          <div
            onDrop={(e) => handleOnDrop(e, index)}
            onDragOver={handleOnDragOver}
            className="dropZone h-[81px] px-[32px] py-[10px] border-2 border-dashed border-[#066699] rounded-[8px] grid place-items-center text-[#066699]"
          >
            Drag Items from the Users list
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  ));
}
