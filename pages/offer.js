import Layout from '@/components/Layout'
import React from 'react'
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import Spinner from "@/components/Spinner";
import Image from 'next/image';



function offer() {



    const [products1, setProducts1] = useState([]);
    useEffect(() => {
        axios.get('/api/feature').then(response => {
            setProducts1(response.data);
        });
    }, []);

    const [products2, setProducts2] = useState([]);
    useEffect(() => {
        axios.get('/api/limited').then(response => {
            setProducts2(response.data);
        });
    }, []);


    const products = [
        {
            id: 1,
            name: "Product 1",
            image: "product1.jpg",
            price: "$20",
            description: "Description of Product 1",
        },
        {
            id: 2,
            name: "Product 2",
            image: "product2.jpg",
            price: "$25",
            description: "Description of Product 2",
        }
    ];


    return (
        <Layout>



            <br /> <br />

            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-bold mb-4">Offer section</h1>

                <div className="grid grid-cols-1 gap-4">
                    <div className="bg-white p-4">
                        <div className="container mx-auto py-8">
                            <h1 className="text-3xl font-bold mb-4">Feature items</h1>
                            <div className="grid grid-cols-2 gap-4">
                                {products1.map(product => (

                                    <div key={product.id} className="border p-4 rounded-lg">

                                        <Image src={product.image} alt={product.name} height={100} width={100} className='rounded-lg' />
                                        <h2 className="text-lg font-bold mb-2">{product.name}</h2>
                                        <p className="text-gray-700 mb-2">Rs {product.price}</p>
                                        <p className="text-gray-600">{product.description}</p>
                                        <br />
                                        <Link className="btn-default hover:text-blue-500" href={'/feature/edit/' + product._id}>
                                            Edit
                                        </Link>
                                        &nbsp;
                                        &nbsp;
                                        &nbsp; 
                                        <Link className="btn-red hover:text-red-500" href={'/feature/delete/' + product._id}>
                                            Delete
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>


                    </div>

                    <div className="bg-white p-4">
                        <div className="container mx-auto py-8 align-center  ">
                            <h1 className="text-3xl font-bold mb-4 ">Limited Time Offer</h1>
                            <div className="grid grid-cols-2 gap-4 justify-center items-center">
                                {products2.map(product => (
                                    <div key={product.id} className="border p-4 rounded-lg">
                                        <Image src={product.image} alt={product.name} height={100} width={200} className='rounded-lg' />
                                        <h2 className="text-lg font-bold mb-2">{product.name}</h2>
                                        <p className="text-gray-700 mb-2"> Rs {product.price}</p>
                                        <p className="text-gray-600">{product.description}</p>
                                        <br />
                                        <Link className="btn-default hover:text-blue-500" href={'/limited/edit/' + product._id}>
                                            Edit
                                        </Link>
                                        &nbsp;
                                        &nbsp;
                                        &nbsp; 
                                        <Link className="btn-red hover:text-red-500" href={'/limited/delete/' + product._id}>
                                            Delete
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>


                    </div>


                </div>
            </div>

        </Layout>
    )
}

export default offer
