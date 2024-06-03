import Layout from "@/components/Layout";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import axios from "axios";
import ProductForm from "@/components/ProductForm";

export default function EditProductPage() {


  const [orders, setOrders] = useState([]);
  const router = useRouter();
  const {id} = router.query;
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/api/orders?id='+id).then(response => {
        setOrders(response.data);
    });
  }, []);

;
  return (
    <>
     {orders.length>0 && orders.map(order => (
     <div className="invoice"  key={order._id}>
      <h2>Invoice</h2>
      <p><strong>Date:</strong> {(new Date(order.createdAt)).toLocaleString()}</p>
      <p><strong>Recipient:</strong> {order.name}</p>
      <p><strong>Email:</strong> {order.email}</p>
      <p><strong>Address:</strong> {order.streetAddress}, {order.city}, {order.postalCode}, {order.country}</p>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {order.line_items.map(item => (
            <tr key={item.id}>
              <td>{item.price_data?.product_data.name}</td>
              <td>{item.quantity}</td>
              <td>{item.price_data?.unit_amount / 100}</td>
              <td>{item.quantity * (item.price_data?.unit_amount / 100)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <p><strong>Total:</strong> {total}</p> */}
    </div>
     ))}

    </>
  );
}