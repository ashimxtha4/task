"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import DropZone from "@/components/dropZoneComponent";
import Group from "../../public/Group.svg";
import Drag from "../../public/ri_draggable.svg";


export default function Home() {
  type UserType = { name: String; post: String; id: String; city: String };
  type CityType = { name: String; id: String; users: UserType[] };
  type listType = { cityId: String; users: String[] };

  let tempUser = [
    { name: "Sunil", post: "Accountant", id: "1", city: "1" },
    { name: "Akash", post: "Enginner", id: "2", city: "2" },
    { name: "Bhanu", post: "Cook", id: "3", city: "1" },
    { name: "Chandu", post: "Cleaner", id: "4", city: "2" },
  ];

  const [list, setList] = useState<listType[] | null>(null);
  const [users, setUsers] = useState(tempUser);
  const [currentOpen, setCrrentOpen] = useState<String | null>("1");
  const [cityData, setCityData] = useState<CityType[]>([
    { name: "Kathmandu", id: "1", users: [] },
    { name: "Lalitpur", id: "2", users: [] },
  ]);

  useEffect(() => {
    if (currentOpen) {
      setUsers(tempUser.filter((user) => user.city == currentOpen));
    } else {
      setUsers(tempUser);
    }
  }, [currentOpen]);

  function handleOnDrag(e: React.DragEvent, data: UserType) {
    e.dataTransfer.setData("value", JSON.stringify(data));
  }
  function showData() {
    if (!list) {
      let temp = cityData.map((city) => ({ cityId: city.id, users: city.users.map((user) => user.id) }));
      setList(temp);
    } else setList(null);
  }
  return (
    <main className="h-full ">
      <div className="flex  w-[90.42%] mx-auto h-[100svh]">
        <div className="leftDiv w-[62%] h-full flex items-center bg-[#F7F7FC]">
          <div className="w-[98%] h-[91%]  bg-[#FCFCFC] rounded-[16px] p-[16px] flex flex-col gap-[24px]">
            <div className="flex flex-col gap-[24px]  h-[calc(100% - 90px)] overflow-hidden">
              <h3 className="text-[#066699] font-bold text-[24px]">Create User By City</h3>
              <div className="rounded-[8px] overflow-y-scroll flex flex-col gap-[24px]">
                <DropZone
                  cityData={cityData}
                  setCityData={setCityData}
                  currentOpen={currentOpen}
                  setCrrentOpen={setCrrentOpen}
                />
              </div>
            </div>
            <div className="buttonDiv flex flex-col gap-[24px]">
              <button
                onClick={showData}
                className="py-[8px] w-full border border-[#066699] bg-[#066699] text-[#ffffff]"
              >
                Create user by city
              </button>
              <div className="detailsDiv">
                {/* {`[{"cityId": 1,"users": [1, 2]},{"cityId": 2,"users": [7]}]`} */}
                {list ? JSON.stringify(list) : ""}
              </div>
            </div>
            {/* <div className="flex justify-between h-[28px] items-center topDiv">
              <div className="">
                City: <span className="ml-[8px]">Kathmandu</span>
              </div>
              <div>
                <span>I</span>
                <span className="ml-[10px]">User</span>
                <span className="ml-[32px]">I</span>
              </div>
            </div> */}
          </div>
        </div>
        <div className="rightDiv w-[38%] h-full bg-[#FCFCFC] p-[16px] flex flex-col gap-[16px]">
          <h4>User List</h4>
          {users.map((data, index) => (
            <div
              key={index}
              draggable
              onDragStart={(e) => handleOnDrag(e, data)}
              className="p-[10px] flex gap-[16px] items-center bg-[#FFFFFF] cursor-pointer"
            >
              <span>
                <Image src={Drag} alt="drag"></Image>
              </span>
              <div className="leftGroup flex flex-col gap-[8px]">
                <span className="text-[#066699] font-medium">{data.name}</span>
                <div className="flex gap-[16px]">
                  <div>
                    <Image src={Group} alt="icon"></Image>
                  </div>
                  <span className="font-normal">{data.post}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
