'use client'
import Layout from '@/components/Layout'
import React from 'react';
import { ReactSortable } from "react-sortablejs";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Spinner from "@/components/Spinner";
import Image from 'next/image';






function Banner({
    _id,

    images: existingImages,

}) {






    const [images, setImages] = useState(existingImages || []);
    const [goToProducts, setGoToProducts] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const router = useRouter();

    async function saveProduct(ev) {
        ev.preventDefault();
        const data = {
            images
        };
        console.log(data)
        if (_id) {
            //update
            await axios.put('/api/banner', { ...data, _id });
        } else {
            //create
            await axios.post('/api/banner', data);
        }
        setGoToProducts(true);
    }
    if (goToProducts) {
        router.push('/')
    }
    async function uploadImages(ev) {
        const files = ev.target?.files;
        if (files?.length > 0) {
            setIsUploading(true);
            const data = new FormData();
            for (const file of files) {
                data.append('file', file);
            }
            const res = await axios.post('/api/upload', data);
            setImages(oldImages => {
                return [...oldImages, ...res.data.links];
            });
            setIsUploading(false);
        }
    }
    function updateImagesOrder(images) {
        setImages(images);
    }



    const [products, setProducts] = useState([]);
    useEffect(() => {
        axios.get('/api/banner').then(response => {
            setProducts(response.data);
        });
    }, []);

    return (
        <Layout>

            <form onSubmit={saveProduct}>

                <label>
                    Photos
                </label>
                <div className="mb-2 flex flex-wrap gap-1">
                    <ReactSortable
                        list={images}
                        className="flex flex-wrap gap-1"
                        setList={updateImagesOrder}>
                        {!!images?.length && images.map(link => (
                            <div key={link} className="h-24 bg-white p-4 shadow-sm rounded-sm border border-gray-200">
                                <img src={link} alt="" className="rounded-lg" />
                            </div>
                        ))}
                    </ReactSortable>
                    {isUploading && (
                        <div className="h-24 flex items-center">
                            <Spinner />
                        </div>
                    )}
                    <label className="w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                        </svg>
                        <div>
                            Add image
                        </div>
                        <input type="file" onChange={uploadImages} className="hidden" />
                    </label>
                </div>
                <button
                    type="submit"
                    className="btn-primary">
                    Save
                </button>

            </form>


            <div className='mt-6'>
            


                <div   className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((product) => (
                    <div key={product.id}>
                        <Image className="h-auto max-w-full rounded-lg" src={product.images[0]} height={200}  width={200} alt="" />
                    </div>
                     ))}


                </div>
                

            </div>

        </Layout>
    )
}

export default Banner
