import React, { useState, useEffect } from "react";
import { Order, Menu, Table } from "@/types/entity";
import OrderHistoryPage from './OrderHistoryPage';
import Swal from 'sweetalert2';
import ReactDOMServer from 'react-dom/server';

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
          status: "เสร็จสิ้น", // เพิ่มสถานะให้กับเมนู
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

  const orderHistoryHtml = ReactDOMServer.renderToString(<OrderHistoryPage orders={orders} />);

  const handleViewOrderHistory = () => {
    Swal.fire({
      title: 'Order History',
      html: orderHistoryHtml,
      width: '40%',
      showCloseButton: true,
      showConfirmButton: true,
      scrollbarPadding: true,
      focusConfirm: true,
      allowOutsideClick: true,
    });
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full md:w-[calc(50%-16px)] p-2 md:h-[90dvh] rounded-xl flex flex-col justify-center items-center">
          <div className="flex items-center text-2xl p-3" style={{ marginBottom: "1rem" }}>
            <p style={{ marginRight: "20rem" }}>Food Order - Bill</p>
            <div>
              <button
                className="w-48 rounded-xl text-xl mt-2 p-2 bg-[#F5F5F5] border-none focus:outline-none focus:ring-2 focus:ring-[#ED7E46] focus:ring-opacity-50 transition duration-300 ease-in-out hover:shadow-xl"
                onClick={handleViewOrderHistory}
              >
                Order History
              </button>
            </div>
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
                              <div className="ml-3 text-[#ED7E46]">
                                preparing food
                              </div>
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
                      <button className="rounded-xl bg-[#436850] text-[#FBFADA] w-28 h-10 text-sm border-none focus:outline-none focus:ring-2 focus:ring-[#ED7E46] focus:ring-opacity-50 transition duration-300 ease-in-out hover:shadow-xl">
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
      </div>

    </>
  );
}

export default Home;
