import React, { useState, useEffect } from "react";
import { Order, Menu, Table } from "@/types/entity";

function Home() {
  const [orders, setOrders] = useState([
    {
      id: 1,
      tableID: [
        {
          name: "Table 1",
          seat: 4,
          zoneId: { name: "Zone A" },
        },
      ],
      menu: [
        {
          id: 1,
          priceList: {
            food: { name: "Pad Thai" },
            name: "Main Course",
          },
          qty: 2,
          optionDetail: [{ name: "No chili" }, { name: "Extra Tofu" }],
          status: "กำลังทำ", // เพิ่มสถานะให้กับเมนู
        },
        {
          id: 2,
          priceList: {
            food: { name: "Tom Yum Soup" },
            name: "Appetizer",
          },
          qty: 1,
          optionDetail: [],
          status: "เสร็จสิ้น", // เพิ่มสถานะให้กับเมนู
        },
      ],
    },
    {
      id: 2,
      tableID: [
        {
          name: "Table 2",
          seat: 6,
          zoneId: { name: "Zone B" },
        },
      ],
      menu: [
        {
          id: 3,
          priceList: {
            food: { name: "Green Curry" },
            name: "Main Course",
          },
          qty: 3,
          optionDetail: [{ name: "Spicy level: Medium" }],
          status: "เสร็จสิ้น",
        },
      ],
    },
    {
      id: 3,
      tableID: [
        {
          name: "Table 3",
          seat: 2,
          zoneId: { name: "Zone C" },
        },
      ],
      menu: [
        {
          id: 4,
          priceList: {
            food: { name: "Som Tum" },
            name: "Appetizer",
          },
          qty: 2,
          optionDetail: [{ name: "Extra Spicy" }],
          status: "เสร็จสิ้น",
        },
        {
          id: 5,
          priceList: {
            food: { name: "Pad Kra Pao" },
            name: "Main Course",
          },
          qty: 1,
          optionDetail: [{ name: "With Fried Egg" }],
          status: "เสร็จสิ้น",
        },
      ],
    },
    {
      id: 4,
      tableID: [
        {
          name: "Table 4",
          seat: 8,
          zoneId: { name: "Zone D" },
        },
      ],
      menu: [
        {
          id: 6,
          priceList: {
            food: { name: "Massaman Curry" },
            name: "Main Course",
          },
          qty: 2,
          optionDetail: [{ name: "Mild" }],
          status: "เสร็จสิ้น",
        },
      ],
    },
    {
      id: 5,
      tableID: [
        {
          name: "Table 5",
          seat: 4,
          zoneId: { name: "Zone E" },
        },
      ],
      menu: [
        {
          id: 7,
          priceList: {
            food: { name: "Spring Rolls" },
            name: "Appetizer",
          },
          qty: 2,
          optionDetail: [],
          status: "เสร็จสิ้น",
        },
        {
          id: 8,
          priceList: {
            food: { name: "Pineapple Fried Rice" },
            name: "Main Course",
          },
          qty: 1,
          optionDetail: [{ name: "No Shrimp" }],
          status: "เสร็จสิ้น",
        },
      ],
    },
  ]);

  const [selectedZone, setSelectedZone] = useState<string>("");

  return (
    <>
      <div className="flex flex-col-reverse md:flex-row ">
      <div className="w-full md:w-[calc(50%-16px)] p-2 md:h-[90dvh] rounded-xl flex flex-col justify-center items-center">
  <div className="text-2xl p-3">
    <p>รายการอาหารใหม่ - บิล</p>
    <select
      className="w-48 rounded-xl text-xl mt-2"
      value={selectedZone}
      onChange={(e) => setSelectedZone(e.target.value)}
    >
      <option value="">ทั้งหมด</option>
      {orders && orders.length > 0 ? (
        Array.from(
          new Set(
            orders.map((data) => data.tableID.map((v) => v.name)).flat()
          )
        ).map((tableName) => (
          <option key={tableName} value={tableName}>
            {tableName}
          </option>
        ))
      ) : (
        <option disabled>ไม่พบข้อมูล</option>
      )}
    </select>
  </div>

  <div className="flex flex-wrap justify-center gap-4 py-6 overflow-y-scroll w-full">
    {orders ? (
      orders
        .filter(
          (data) =>
            selectedZone === "" ||
            (Array.isArray(data.tableID) &&
              data.tableID.some((v) => v.name === selectedZone))
        )
        .map((data) => (
          <div key={data.id} className="w-full shadow-xl p-5 mb-6 bg-white rounded-xl card ">
            <div className="card-body">
              <h2 className="text-xl">
                {Array.isArray(data.tableID) &&
                  data.tableID.map((v) => (
                    <React.Fragment key={v.name}>
                      <p>
                        {v.name} - {v.seat} Seats, {v.zoneId.name}
                      </p>
                      <p className="text-xs flex gap-1 justify-end ml-9">
                        8:00 PM
                      </p>
                    </React.Fragment>
                  ))}
              </h2>

              {Array.isArray(data.menu) &&
                data.menu.map((v) => (
                  <React.Fragment key={v.id}>
                    <div className="flex gap-3">
                      <input type="checkbox" />
                      {v.priceList != null && v.priceList.food.name}
                      <p className="justify-end flex">x {v.qty}</p>
                    </div>
                    <div className="text-sm text-[#D9D9D9] flex gap-3">
                      {v.optionDetail.map((i) => (
                        <div key={i.name?.toString()}>{i.name}</div>
                      ))}
                      {v.priceList != null && v.priceList.name}
                    </div>
                  </React.Fragment>
                ))}
            </div>
            <div className="flex gap-6 justify-end p-6">
            <button className="rounded-xl bg-[#436850] text-[#FBFADA] w-28 h-10 text-sm">
              Success
            </button>
          </div>
          </div>
        ))
    ) : (
      <div>ไม่พบข้อมูล</div>
    )}
  </div>
</div>


        <div className="md:w-1/2 p-2 md:h-[90dvh]">
          <div className="text-2xl p-3 ">
            <p>รายการอาหารทั้งหมด </p>
          </div>
          <div className="overflow-y-scroll h-32 bg-white">
            {orders?.map((data) => (
              <div key={data.id}>
                <div className="px-2">
                  <div>
                    {Array.isArray(data.menu) &&
                      data.menu.map((v) => (
                        <div key={v.id} className="grid grid-cols-3 ">
                          <div className="flex">
                            <div className="ml-3 text-[#ED7E46]">
                              <input type="checkbox"></input>
                            </div>
                            <div className="flex gap-2">
                              <div className="ml-3 text-[#ED7E46]">
                                x {v.qty}
                              </div>
                              <div>
                                {v.priceList != null && v.priceList.food.name}
                              </div>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 text-sm py-1 text-[#5F5F5F]">
                            <div>
                              {v.optionDetail.map((i) => (
                                <div key={i.name}>{i.name}</div>
                              ))}
                            </div>
                            <div>{v.priceList.name}</div>
                          </div>
                          <div className="flex justify-end p-1 text-xs py-1 text-[#0198DD]">
                            {Array.isArray(data.tableID) &&
                              data.tableID.map((v) => (
                                <React.Fragment key={v.name}>
                                  {v.name}
                                </React.Fragment>
                              ))}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-2xl p-3  ">
            <p>รายการที่กำลังทำ </p>
          </div>
          <div className="overflow-y-scroll h-32 bg-white">
            {orders?.map((data) => (
              <div key={data.id}>
                <div className="px-2">
                  <div>
                    {Array.isArray(data.menu) &&
                      data.menu.map((v) => (
                        <div key={v.id} className="grid grid-cols-3 ">
                          <div className="flex">
                            <div className="ml-3 text-[#ED7E46]">
                              <input type="checkbox"></input>
                            </div>
                            <div className="flex gap-2">
                              <div className="ml-3 text-[#ED7E46]">
                                x {v.qty}
                              </div>
                              <div>
                                {v.priceList != null && v.priceList.food.name}
                              </div>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 text-sm py-1 text-[#5F5F5F]">
                            <div>
                              {v.optionDetail.map((i) => (
                                <div key={i.name}>{i.name}</div>
                              ))}
                            </div>
                            <div>{v.priceList.name}</div>
                          </div>
                          <div className="flex justify-end p-1 text-xs py-1 text-[#0198DD]">
                            {Array.isArray(data.tableID) &&
                              data.tableID.map((v) => (
                                <React.Fragment key={v.name}>
                                  {v.name}
                                </React.Fragment>
                              ))}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-2xl p-3  ">
            <p>รายการที่สำเร็จ </p>
          </div>
          <div className="overflow-y-scroll h-32 bg-white">
            {orders?.map((data) => (
              <div key={data.id}>
                <div className="px-2">
                  <div>
                    {Array.isArray(data.menu) &&
                      data.menu.map((v) => (
                        <div key={v.id} className="grid grid-cols-3 ">
                          <div className="flex">
                            <div className="ml-3 text-[#ED7E46]">
                              <input type="checkbox"></input>
                            </div>
                            <div className="flex gap-2">
                              <div className="ml-3 text-[#ED7E46]">
                                x {v.qty}
                              </div>
                              <div>
                                {v.priceList != null && v.priceList.food.name}
                              </div>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 text-sm py-1 text-[#5F5F5F]">
                            <div>
                              {v.optionDetail.map((i) => (
                                <div key={i.name}>{i.name}</div>
                              ))}
                            </div>
                            <div>{v.priceList.name}</div>
                          </div>
                          <div className="flex justify-end p-1 text-xs py-1 text-[#0198DD]">
                            {Array.isArray(data.tableID) &&
                              data.tableID.map((v) => (
                                <React.Fragment key={v.name}>
                                  {v.name}
                                </React.Fragment>
                              ))}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-6 justify-end p-6">
            <button className="rounded-xl bg-[#AEAEAE] text-[#FBFADA] w-28 h-10 text-sm">
              ล้างทั้งหมด
            </button>
            <button className="rounded-xl bg-[#436850] text-[#FBFADA] w-28 h-10 text-sm">
              เริ่มทำ
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
