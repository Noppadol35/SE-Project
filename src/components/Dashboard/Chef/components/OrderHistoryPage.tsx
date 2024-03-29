import React from 'react';

function OrderHistoryPage({ orders }: { orders: Array<any> }) {
  return (
    <div className="order-history">
      <div className="order-history-content">
        {orders.map((order: any) => (
          <div key={order.id} className="order-item">
            <h2 className="table-name">Table: {order.tableID[0].name}</h2>
            <div className="table-menu-box">
              {order.menu.map((menuItem: any) => (
                <div key={menuItem.id} className="menu-item">
                  <div className="menu-item-details">
                    <span className="food-name">{menuItem.priceList?.food?.name}</span>
                    <span className="quantity">x {menuItem.qty}</span>
                  </div>
                  <span className={`status ${menuItem.status === 'กำลังทำ' ? 'preparing' : 'completed'}`}>
                    {menuItem.status === 'กำลังทำ' ? 'Preparing' : 'Completed'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* CSS */}
      <style>
        {`
          .order-history {
            font-family: Arial, sans-serif;
          }
          
          .order-history-title {
            font-size: 24px;
            margin-bottom: 10px;
          }
          
          .order-history-content {
            max-height: 300px;
            overflow-y: auto;
          }
          
          .order-item {
            margin-bottom: 20px;
          }
          
          .table-name {
            font-size: 18px;
            margin-bottom: 10px;
          }
          
          .table-menu-box {
            border: 1px solid #ccc;
            padding: 10px;
            border-radius: 5px;
          }
          
          .menu-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 5px;
          }
          
          .menu-item-details {
            display: flex;
            align-items: center;
          }
          
          .food-name {
            margin-right: 10px;
          }
          
          .status {
            color: #fff;
            padding: 5px 10px;
            border-radius: 5px;
            font-weight: bold;
          }
          
          .preparing {
            background-color: #ff9800; /* orange */
          }
          
          .completed {
            background-color: #4caf50; /* green */
          }
        `}
      </style>
    </div>
  );
}

export default OrderHistoryPage;
