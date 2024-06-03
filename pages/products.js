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
  return (
    <Layout>
      <Link className="btn-primary" href={'/products/new'}>Add new product</Link>
      

      {/* <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr className="divide-x divide-gray-200">
            <th
              scope="col"
              className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
            >
              <span>Employee</span>
            </th>
            <th
              scope="col"
              className="px-12 py-3.5 text-left text-sm font-normal text-gray-500"
            >
              Title
            </th>

            <th
              scope="col"
              className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
            >
              Description
            </th>

            <th
              scope="col"
              className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
            >
              Stock
            </th>

            <th
              scope="col"
              className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
            >
              Price
            </th>
            <th scope="col" className="relative px-4 py-3.5">
              <span >Edit</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {products.map((product) => (
            <tr key={product.id} className="divide-x divide-gray-200">
              <td className="whitespace-nowrap px-4 py-4">
                <div className="flex items-center">
                  <div className="h-20 w-20 flex-shrink-0">
                    <img
                      className="h-20 w-30   rounded-full object-cover"
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
              <td className="whitespace-nowrap px-12 py-4">
                <div className="text-sm text-gray-900">{product.title}</div>
              </td>
              <td className=" px-4 py-4">
                <span className="inline-flex rounded-full px-2 text-xs font-semibold leading-5 ">
                <div className="text-sm text-gray-500">{product.description}</div>                  
                </span>
              </td>
              <td className=" px-4 py-4">
                <span className="inline-flex rounded-full px-2 text-xs font-semibold leading-5 ">
                <div className="text-sm text-gray-500">{product.stock}</div>                  
                </span>
              </td>
              <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                {product.price}
              </td>
              <td className="whitespace-nowrap px-4 py-4  text-sm font-medium">
                <Link className="btn-default" href={'/products/edit/' + product._id}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                  Edit
                </Link>
                &nbsp;
                <Link className="btn-red" href={'/products/delete/' + product._id}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}

<table className="border-collapse w-full">
  <thead className="bg-gray-50">
    <tr className="divide-x divide-gray-200">
      <th scope="col" className="px-4 py-3.5 text-left text-sm font-medium text-gray-500">
        <span>Employee</span>
      </th>
      <th scope="col" className="px-12 py-3.5 text-left text-sm font-medium text-gray-500">
        Title
      </th>
      <th scope="col" className="px-4 py-3.5 text-left text-sm font-medium text-gray-500">
        Description
      </th>
      <th scope="col" className="px-4 py-3.5 text-left text-sm font-medium text-gray-500">
        Stock
      </th>
      <th scope="col" className="px-4 py-3.5 text-left text-sm font-medium text-gray-500">
        Price
      </th>
      <th scope="col" className="px-4 py-3.5 text-left text-sm font-medium text-gray-500">
        Actions
      </th>
    </tr>
  </thead>
  <tbody className="divide-y divide-gray-200 bg-white">
    {products.map((product) => (
      <tr key={product.id} className="divide-x divide-gray-200">
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
          <div className="text-sm text-gray-500">{product.stock}</div>
        </td>
        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">{product.price}</td>
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