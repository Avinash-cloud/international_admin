import Layout from "@/components/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get('/api/products').then(response => {
      setProducts(response.data);
    });
  }, []);


  console.log(products)
  return (
    <Layout>
      <Link className="btn-primary float-" href={'/products/new'}>Add new product</Link>
      <br />
      <br />
      <br />
      



     

      <table className="border-collapse w-full">
        <thead className="bg-gray-50">
          <tr className="divide-x divide-gray-200">
          <th scope="col" className="border border-gray-300 px-4 py-3.5 text-left text-sm font-medium text-gray-500">
              <span>SKU ID</span>
            </th>
            <th scope="col" className="border border-gray-300 px-4 py-3.5 text-left text-sm font-medium text-gray-500">
              <span>Image</span>
            </th>
            <th scope="col" className="border border-gray-300 px-12 py-3.5 text-left text-sm font-medium text-gray-500">
              Title
            </th>
            <th scope="col" className="border border-gray-300 px-4 py-3.5 text-left text-sm font-medium text-gray-500">
              Description
            </th>
            <th scope="col" className="border border-gray-300 px-4 py-3.5 text-left text-sm font-medium text-gray-500">
              Stock
            </th>
            <th scope="col" className="border border-gray-300 px-4 py-3.5 text-left text-sm font-medium text-gray-500">
              Price
            </th>
            <th scope="col" className="border border-gray-300 px-4 py-3.5 text-left text-sm font-medium text-gray-500">
              Discounted Price
            </th>
            <th scope="col" className="border border-gray-300 px-4 py-3.5 text-left text-sm font-medium text-gray-500">
              Actions
            </th>
            
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {products.map((product) => (
            <tr key={product.id} className="divide-x divide-gray-200">
              <td className="whitespace-nowrap px-12 py-4 text-sm text-gray-900">{product.sku}</td>
              <td className="whitespace-nowrap px-4 py-4">
                <div className="flex items-center">
                  <div className="h-16 w-16 flex-shrink-0">
                    <img
                      className="h-16 w-16 rounded-full object-cover"
                      src={product.images[0]}
                      alt=""
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                    <div className="text-sm text-gray-500">{product.email}</div>
                  </div>
                </div>
              </td>
              <td className="whitespace-nowrap px-12 py-4 text-sm text-gray-900">{product.title}</td>
              <td className="px-4 py-4">
                <div className="text-sm text-gray-500">{product.description}</div>
              </td>
              <td className="px-4 py-4">
                <div className="text-sm text-gray-500">{product.stockQuantity}</div>
              </td>
              <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">{product.price}</td>
              <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">{product.discountedPrice}</td>
              <td className="whitespace-nowrap px-4 py-4 text-sm font-medium space-x-2">
                <Link className="btn-default hover:text-blue-500" href={'/products/edit/' + product._id}>
                  Edit
                </Link>
                <Link className="btn-red hover:text-red-500" href={'/products/delete/' + product._id}>
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </Layout>
  );
}