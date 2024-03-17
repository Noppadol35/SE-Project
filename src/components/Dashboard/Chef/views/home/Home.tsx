import React, { useState, useEffect } from "react";
import CardOrder from "./CardOrder"
import CardTotalOrder from "./CardTotalOrder";
import { Order } from "@/types/entity";
import { getOrder } from "../../models/getOrder";


function Home() {
  const [orders, setOrders] = useState<Order[] | undefined>([])


  const [selectedZone, setSelectedZone] = useState("");

  useEffect(() => {
    async function getAll() {
      try {
        const order = await getOrder();
        console.log(order);

        setOrders(order);
      } catch (error) {
        console.error(error);
      }
    }
    getAll();
  }, []);

  return (
    <>
      <div className="flex flex-col-reverse md:flex-row ">
        <div className="md:w-1/2 p-2 md:h-[90dvh] rounded-xl">
          <div className="text-2xl p-3 flex gap-32"><p>รายการอาหารใหม่ -บิล</p>
            <select
              className="w-48 rounded-xl text-xl "
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
            >
              <option value="">ทั้งหมด</option>
              {orders && orders.length > 0 ? (
                Array.from(
                  new Set(
                    orders
                      .map((data) => data.menu.map((v) => v.zoneId.name))
                      .flat()
                  )
                ).map((zoneName) => (
                  <option key={zoneName} value={zoneName}>
                    {zoneName}
                  </option>
                ))
              ) : (
                <option disabled>ไม่พบข้อมูล</option>
              )}
            </select></div>

          <div className="flex flex-wrap justify-center flex-grow-0 gap-4 py-6  overflow-y-scroll ">

            {orders ? (
              orders
                .filter(
                  (data) =>
                    selectedZone === "" ||
                    (data.table &&
                      data.table.some((v) => v.zoneId.name === selectedZone))
                )
                .map((data) => (
                  <div key={data?.id}>{data && <CardOrder data={data} />}</div>
                ))
            ) : (
              <div>ไม่พบข้อมูล</div>
            )}
          </div>
        </div>


        <div className="md:w-1/2 p-2 md:h-[90dvh] p-3">
          <div className="text-2xl p-3 "><p>รายการอาหารทั้งหมด </p>
          </div>
          <div className="overflow-y-scroll h-64 bg-white">
            {orders?.map((data) => (
              <CardTotalOrder key={data.id} data={data} />
            ))}
          </div>


          <div className="text-2xl p-3  "><p>รายการที่กำลังทำ </p>
          </div>
          <div className="overflow-y-scroll h-32 bg-white">
            {orders?.map((data) => (
              <CardTotalOrder key={data.id} data={data} />
            ))}

          </div>

      <div className="flex gap-6 justify-end p-6">
      <button
            className="rounded-xl bg-[#AEAEAE] text-[#FFFFFF] w-28 h-10 text-sm"
          >
            ล้างทั้งหมด
          </button>

          <button
            className="rounded-xl bg-[#ED7E46] text-[#FFFFFF] w-28 h-10 text-sm"
          >
            เริ่มทำ
          </button>
      </div>


        </div>

      </div>
    </>
  )
}

export default Home