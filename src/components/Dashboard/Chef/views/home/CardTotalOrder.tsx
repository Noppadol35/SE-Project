
import { Order, PriceList } from '../../models/order-model';
type OrderProps = {
  data: Order;
}
function CardTotalOrder(props: OrderProps) {
  const { data } = props;
  return (
    <>
      {/* <div></div> use */}
      <div className='px-2'>
        <div>{data.orderDetail != null && data.orderDetail.map((v)=>(
        <>
        <div className='grid grid-cols-3 '>

          <div className='flex'>
            <div className='ml-3 text-[#ED7E46]'><input type='checkbox'></input></div>
          <div className='flex gap-2'>
          <div className='ml-3 text-[#ED7E46]'>x {v.qty}</div>
            <div>{v.priceList != null && v.priceList.food.name}</div>
          </div>
          </div>

        <div className='grid grid-cols-2 text-sm py-1 text-[#5F5F5F]'>
          <div>{v.optionDetail.map((i)=>(i.optionDetail.name))}</div>
          <div>{v.priceList.name}</div>
        </div>

        <div className='flex justify-end p-1 text-xs py-1 text-[#0198DD]'>{data.table != null && data.table.map((v) => (<>{v.name}-{v.seat}</>))}</div>
        </div>
        </>))}
        </div>
      </div>

    </>
  )
}

export default CardTotalOrder
