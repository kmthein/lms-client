import { Form, Input, Modal, Radio, Upload } from "antd";
import React, { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { addAuthor, getAllAuthors } from "../../../api/author";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import { api } from "../../../config/axios";

const AuthorForm = ({ open, setOpen, getAllAuthorsHandler }) => {
  const [form] = Form.useForm();

  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleCancel = () => {
    setOpen(false);
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <BiPlus className=" mx-auto text-xl" />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  const [previewImg, setPreviewImg] = useState([]);
  const [images, setImages] = useState([]);
  const [savedImages, setSavedImages] = useState([]);

  const [imgCount, setImgCount] = useState(0);

  const deleteHandler = (img) => {
    const indexToDelete = previewImg.findIndex((e) => e == img);
    if (indexToDelete != -1) {
      const updatedSelectedImg = [...images];
      updatedSelectedImg.splice(indexToDelete, 1);

      setImgCount((prev) => prev - 1);
      setImages(updatedSelectedImg);
      setPreviewImg(previewImg.filter((e) => e != img));
      URL.revokeObjectURL(img);
    }
  };

  const onChangeHandler = (e) => {
    const selectedImages = e.target.files;
    const selectedImagesArray = Array.from(selectedImages);
    setImages(selectedImagesArray);

    setImgCount((prev) => prev + selectedImagesArray.length);

    const previewImagesArray = selectedImagesArray.map((img) => {
      return URL.createObjectURL(img);
    });
    setPreviewImg((prev) => prev.concat(previewImagesArray));
  };

  const authorSubmitHandler = async (values) => {
    setConfirmLoading(true);
    const formData = new FormData();
    console.log(images);
    formData.append("name", values.name);
    if (images && images.length > 0) {
      images.forEach((file) => {
        formData.append("files", file);
      });
    } else {
      formData.append("files", new Blob([]));
    }
    const data = await addAuthor(formData);
    console.log(data);
    if (data.status == 200) {
      getAllAuthorsHandler();
      setOpen(false);
      setConfirmLoading(false);
      form.resetFields();
      setImages([]);
      setPreviewImg([]);
    }
  };

  return (
    <Modal
      open={open}
      onOk={form.submit}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <Form
        layout="vertical"
        form={form}
        name="form_in_modal"
        initialValues={{
          modifier: "public",
        }}
        clearOnDestroy
        onFinish={authorSubmitHandler}
      >
        <h1 className=" text-xl mb-3 font-medium">Add New Author</h1>
        <Form.Item
          name="name"
          label="Author Name"
          rules={[
            {
              required: true,
              message: "Please input the name of Author!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="author_img" label="Author Image">
          {images.length < 1 && (
            <label htmlFor="upload">
              <div className=" border-[2px] border-dashed rounded-md w-[300px] flex items-center h-[100px]">
                <FaPlus className="mx-auto text-xl cursor-pointer text-black/50 hover:text-black/70 hover:text-[1.3rem]" />
              </div>
            </label>
          )}
          <input
            type="file"
            id="upload"
            name="files"
            multiple
            onChange={onChangeHandler}
            accept="image/png,image/jpg,image/jpeg"
          />
          <div className=" flex gap-2 mt-4">
            {previewImg &&
              previewImg.map((img, index) => (
                <div className=" h-32 relative" key={index}>
                  <img
                    src={img}
                    key={index}
                    className="w-full h-full object-contain rounded-md"
                  />
                  <FaTrashAlt
                    onClick={() => deleteHandler(img)}
                    className="z-50 absolute bottom-2 right-4 text-red-500 text-md cursor-pointer"
                  />
                </div>
              ))}
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AuthorForm;
