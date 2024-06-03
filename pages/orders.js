import Layout from "@/components/Layout";
import {useEffect, useState} from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faDownload } from '@fortawesome/free-solid-svg-icons';

export default function OrdersPage() {
  const [orders,setOrders] = useState([]);
  useEffect(() => {
    axios.get('/api/orders').then(response => {
      setOrders(response.data);
    });
  }, []);
  return (
    <Layout>
      <h1>Orders</h1>
      {/* <table className="basic">
        <thead>
          <tr>
            <th>Date</th>
            <th>Paid</th>
            <th>Recipient</th>
            <th>Products</th>
          </tr>
        </thead>
        <tbody>
        {orders.length > 0 && orders.map(order => (
          <tr key={order._id}>
            <td>{(new Date(order.createdAt)).toLocaleString()}
            </td>
            <td className={order.paid ? 'text-green-600' : 'text-red-600'}>
              {order.paid ? 'YES' : 'NO'}
            </td>
            <td>
              {order.name} {order.email}<br />
              {order.city} {order.postalCode} {order.country}<br />
              {order.streetAddress}
            </td>
            <td>
              {order.line_items.map(l => (
                <>
                  {l.price_data?.product_data.name} x
                  {l.quantity}<br />
                </>
              ))}
            </td>
          </tr>
        ))}
        </tbody>
      </table> */}
{/* 
<table className="border-collapse w-full">
  <thead>
    <tr className="bg-gray-100">
      <th className="border border-gray-300 px-4 py-2">Date</th>
      <th className="border border-gray-300 px-4 py-2">Paid</th>
      <th className="border border-gray-300 px-4 py-2">Recipient</th>
      <th className="border border-gray-300 px-4 py-2">Products</th>
    </tr>
  </thead>
  <tbody>
    {orders.length > 0 && orders.map(order => (
    <tr key={order._id} className="border border-gray-300">
      <td className="border border-gray-300 px-4 py-2">{(new Date(order.createdAt)).toLocaleString()}</td>
      <td className={`border border-gray-300 px-4 py-2 ${order.paid ? 'text-green-600' : 'text-red-600'}`}>
        {order.paid ? 'YES' : 'NO'}
      </td>
      <td className="border border-gray-300 px-4 py-2">
        <div className="text-sm">{order.name} {order.email}</div>
        <div className="text-xs">{order.city} {order.postalCode} {order.country}</div>
        <div className="text-xs">{order.streetAddress}</div>
      </td>
      <td className="border border-gray-300 px-4 py-2">
        {order.line_items.map((l, index) => (
          <div key={index} className="text-sm">
            {l.price_data?.product_data.name} x{l.quantity}
          </div>
        ))}
      </td>
    </tr>
    ))}
  </tbody>
</table> */}

<div className="overflow-x-auto">
  <table className="border-collapse w-full">
    <thead>
      <tr className="bg-gray-100">
        <th className="border border-gray-300 px-4 py-2">Date</th>
        <th className="border border-gray-300 px-4 py-2">Image</th>
        <th className="border border-gray-300 px-4 py-2">Paid</th>
        <th className="border border-gray-300 px-4 py-2">Status</th>
        <th className="border border-gray-300 px-4 py-2">Recipient</th>
        <th className="border border-gray-300 px-4 py-2">Products</th>
        <th className="border border-gray-300 px-4 py-2">Quantity</th>
        <th className="border border-gray-300 px-4 py-2">Actions</th>

      </tr>
    </thead>
    <tbody>
      {orders.length > 0 && orders.map(order => (
      <tr key={order._id} className="border border-gray-300">
        <td className="border border-gray-300 px-4 py-2">{(new Date(order.createdAt)).toLocaleString()}</td>
        <td>{order.images}</td>
        <td className={`border border-gray-300 px-4 py-2 ${order.paid ? 'text-green-600' : 'text-red-600'}`}>
          {order.paid ? 'YES' : 'NO'}
        </td>
        <td ></td>
        <td className="border border-gray-300 px-4 py-2">
          <div className="text-sm"><span className="font-bold">Name : </span>{order.name}</div>
          <div className="text-xs"><span className="font-bold">Email : </span>{order.email}</div>
          <div className="text-xs"><span className="font-bold">Sreet Address : </span>{order.streetAddress}</div>
          <div className="text-xs"><span className="font-bold">City : </span>{order.city}</div>
          <div className="text-xs"><span className="font-bold">postalcode : </span> {order.postalCode}</div> 
          <div className="text-xs"><span className="font-bold">Country : </span>{order.country}</div>
          
        </td>
        <td className="border border-gray-300 px-4 py-2">
          {order.line_items.map((l, index) => (
            <div key={index} className="text-sm">
              {l.price_data?.product_data.name}
            </div>
          ))}
        </td>
        <td className="border border-gray-300 px-4 py-2">
          {order.line_items.map((l, index) => (
            <div key={index} className="text-sm">
              {l.quantity}
            </div>
          ))}
        </td>

        <td className="border border-gray-300 px-4 py-2">
          <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
            <FontAwesomeIcon icon={faTimes} className="mr-2" />
            Cancel
          </button>
          <a href={`/invoice/${order._id}`} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ml-2">
            <FontAwesomeIcon icon={faDownload} className="mr-2" />
            Invoice
          </a>
        </td>
      </tr>
      ))}
    </tbody>
  </table>
</div>


    </Layout>
  );
}
