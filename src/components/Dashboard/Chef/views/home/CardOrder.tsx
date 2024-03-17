import { Order } from "../../models/order-model"
import { FaHome } from 'react-icons/fa';
type OrderProps = {
  data: Order;
}
function CardOrder(props: OrderProps) {
  const { data } = props;
  return (
    <>
      <div className="w-full shadow-xl lg:w-auto card bg-base-100 p-3">
        <div className="card-body">
          <h2 className="text-xl flex">{data.table != null && data.table.map((v) => (<><p>{v.name}- {v.seat}, {v.zoneId.name} </p>
            <p className="text-xs flex gap-1 justify-end ml-9"><FaHome /> น.</p></>))}</h2>

          {data.orderDetail != null && data.orderDetail.map((v) => (
            <>
              <div className="flex gap-3 ">
              <input type="checkbox" />
                {v.priceList != null && v.priceList.food.name}
                <p className="justify-end flex">x {v.qty}</p>
              </div>

              <div className="text-sm text-[#D9D9D9] flex gap-3">
                {v.optionDetail.map((i) => (
                  <div>{i.optionDetail.name}</div>
                ))}
                {v.priceList != null && v.priceList.name}
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  )
}

export default CardOrder
