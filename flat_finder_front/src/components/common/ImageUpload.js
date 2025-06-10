import React, { useState } from 'react';
import { FaCloudUploadAlt } from "react-icons/fa";

const ImageUpload = (props) => {
    const {
        imageUploadHandler,
        ImageResolution,
    } = props;

    const [errMsg, setErrMsg] = useState('');


    // dragging image
    const dragOver = (e) => {
        e.preventDefault();
    };

    const dragEnter = (e) => {
        e.preventDefault();
    };

    const dragLeave = (e) => {
        e.preventDefault();
    };

    const addImage = (file) => {
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = (e) => {
            const image = new Image();
            image.src = e.target.result;
            image.onload = (e) => {
                const height = e.target.height;
                const width = e.target.width;
                if (height > ImageResolution || width > ImageResolution) {
                    // alert('Height and Width must not exceed 100px.');
                    setErrMsg(`Image exceeds Maximum [Size/Dimension]`);
                    return false;
                }
                // alert('Uploaded image has valid Height and Width.');
                setErrMsg('');
                console.log('Image by drag:', file);
               
                imageUploadHandler(file)
            };
        };

    }
    const fileDrop = (e) => {
        e.preventDefault();

        const file = e.dataTransfer.files[0];
         addImage(file)
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        addImage(file)
    };

    return (
        <div
            className={` text-center px-4 pt-7 pb-6 border-2 ${errMsg ? `border-red-500` : `border-gray-300`
                }  border-dashed rounded-lg w-full lg:w-1/2 mx-auto h-auto`}>

            <div
                draggable={true}
                onDragOver={dragOver}
                onDragEnter={dragEnter}
                onDragLeave={dragLeave}
                onDrop={fileDrop}
                onClick={() => setErrMsg(null)}
            >
                <div className="space-y-1 justify-center align text-center">
                    <div className="flex text-sm text-gray-600">
                        <label
                            htmlFor="images"
                            className=" mx-auto relative cursor-pointer bg-white rounded-md font-normal text-base block"
                        >
                            <div className='flex flex-row justify-center'>
                                <FaCloudUploadAlt size={60}/>
                            </div>
                            <p className="text-base font-normal">
                                <b>Click or drag image to this area to upload </b>
                            </p>
                        </label>
                        <input
                            id="images"
                            name="images"
                            type="file"
                            className="sr-only"
                            accept="image/png, image/jpeg"
                            // required
                            onChange={handleImageChange}
                        />
                    </div>
                </div>
            </div>
            {/* showing error message */}
            {errMsg && (
                <p className="my-1 ml-2 text-sm font-normal text-red-500">{errMsg}</p>
            )}
        </div>
    );
};

export default ImageUpload;
