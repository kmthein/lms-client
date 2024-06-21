import {
  Form,
  Input,
  Modal,
  Radio,
  Select,
  Space,
  Upload,
  notification,
} from "antd";
import React, { useEffect, useState } from "react";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import { getAllAuthors } from "../../../api/author";
import { getAllGenres } from "../../../api/genre";
import { getAllPublisher } from "../../../api/publisher";
import { createBook, getBookById, updateBook } from "../../../api/book";

export const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const openNotificationWithIcon = (type, message, description) => {
  notification({
    message: message,
    description: description,
  });
};

const BookForm = ({
  open,
  setOpen,
  getAllBooksHandler,
  selectedBookId,
  editForm,
  setEditForm,
}) => {
  const [allAuthors, setAllAuthors] = useState([]);
  const [allGenres, setAllGenres] = useState([]);
  const [allPublishers, setAllPublishers] = useState([]);
  const [previewImg, setPreviewImg] = useState(null);
  const [images, setImages] = useState([]);
  const [savedImages, setSavedImages] = useState([]);
  const [imgCount, setImgCount] = useState(0);
  const [oldBook, setOldBook] = useState(null);
  const [oldGenres, setOldGenres] = useState([]);

  const getAllAuthorsHandler = async () => {
    try {
      const response = await getAllAuthors();
      const modifiedData = response.data.map((d) => {
        return {
          label: d.name,
          value: d.id,
          desc: d.name,
        };
      });
      setAllAuthors(modifiedData);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllPublishersHandler = async () => {
    try {
      const response = await getAllPublisher();
      const modifiedData = response.data.map((d) => {
        return {
          label: d.publisherName,
          value: d.publisherId,
          desc: d.publisherName,
        };
      });
      setAllPublishers(modifiedData);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllGenresHandler = async () => {
    try {
      const response = await getAllGenres();
      const modifiedData = response.data.map((d) => {
        return {
          label: d.genreName,
          value: d.genreId,
          desc: d.genreName,
        };
      });
      setAllGenres(modifiedData);
    } catch (error) {
      console.log(error);
    }
  };

  const getOldBookDataHandler = async () => {
    try {
      const response = await getBookById(selectedBookId);
      const { title, publishYear, stock, author, publisher } = response.data;
      console.log(response.data);
      setOldBook(response.data);
      if (response.data.bookImg != "") {
        const oldImages = import.meta.env.VITE_API + response.data.bookImg;
        setPreviewImg((prev) => [...prev, oldImages]);
        // form.setFieldValue("bookImg", response.data.bookImg);
      }
      // setImages()
      form.setFieldValue("title", title);
      form.setFieldValue("publishYear", publishYear);
      form.setFieldValue("stock", stock);
      form.setFieldValue("authorId", author.id);
      form.setFieldValue("publisherId", publisher.publisherId);
      const genreNames = response.data?.genres.map((d) => d.genreId);
      form.setFieldValue("genreIds", genreNames);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllAuthorsHandler();
    getAllPublishersHandler();
    getAllGenresHandler();
  }, []);

  useEffect(() => {
    setPreviewImg([]);
    if (editForm) {
      getOldBookDataHandler();
    } else {
      setOldBook(null);
      setOldGenres([]);
    }
  }, [selectedBookId, editForm]);

  const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
    });
  };

  const [form] = Form.useForm();

  const onCreate = async (values) => {
    setConfirmLoading(true);
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }
    images.forEach((file) => {
      formData.append("files", file);
    });
    console.log(values);
    let response;
    if (editForm) {
      formData.append("id", oldBook.id);
      if (previewImg == null) {
        formData.append("bookImg", "");
      } else {
        formData.append("bookImg", oldBook.bookImg);
      }
      response = await updateBook(formData);
    } else {
      response = await createBook(formData);
    }
    if (response.status == 200) {
      openNotificationWithIcon("success", "Success", response.data);
      setOpen(false);
      setConfirmLoading(false);
      form.resetFields();
      getAllBooksHandler();
      setEditForm(false);
    }
    setConfirmLoading(false);
  };

  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleCancel = () => {
    form.resetFields();
    setOpen(false);
    setOldBook(null);
    setEditForm(false);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

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
    setPreviewImg(null);
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

  return (
    <Modal
      open={open}
      onOk={() => {
        form.submit();
      }}
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
        onFinish={(values) => onCreate(values)}
      >
        <h1 className=" text-xl mb-3 font-medium">
          {editForm ? "Edit" : "Add New"} Book
        </h1>
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: "Please input the title of book!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="publishYear"
          label="Published Year"
          rules={[
            {
              required: true,
              message: "Please input the published year of book!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="authorId"
          label="Author Name"
          rules={[
            {
              required: true,
              message: "Please select the author name of book!",
            },
          ]}
        >
          <Select
            defaultValue={oldBook ? oldBook?.author?.name : "Select One"}
            style={{
              width: 120,
            }}
            onChange={handleChange}
            options={allAuthors}
          />
        </Form.Item>
        <Form.Item
          name="publisherId"
          label="Publisher Name"
          rules={[
            {
              required: true,
              message: "Please select the publisher name of book!",
            },
          ]}
        >
          <Select
            defaultValue={
              oldBook ? oldBook.publisher?.publisherName : "Select One"
            }
            style={{
              width: 120,
            }}
            onChange={handleChange}
            options={allPublishers}
          />
        </Form.Item>
        <Form.Item
          name="genreIds"
          label="Book Genre"
          rules={[
            {
              required: true,
              message: "Please select at least one genre of book!",
            },
          ]}
        >
          <Select
            mode="multiple"
            style={{
              width: "100%",
            }}
            placeholder="select book genre"
            defaultValue={oldGenres}
            onChange={handleChange}
            options={allGenres}
            optionRender={(option) => <Space>{option.data.desc}</Space>}
          />
        </Form.Item>
        <Form.Item
          name="stock"
          label="Stock"
          rules={[
            {
              required: true,
              message: "Please input the stock of book!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="book_img" label="Book Image">
          {(images.length < 1 || previewImg == []) && (
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

export default BookForm;
