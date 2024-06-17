import { Form, Input, Modal, Radio, Upload } from "antd";
import React, { useState } from "react";
import { BiPlus } from "react-icons/bi";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const BookForm = ({ open, setOpen }) => {
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState();

  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    setFormValues(values);
    setOpen(false);
  };

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    // {
    //   uid: "-xxx",
    //   percent: 50,
    //   name: "image.png",
    //   status: "uploading",
    //   url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    // },
    {
      uid: "-5",
      name: "image.png",
      status: "error",
    },
  ]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

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
        <h1 className=" text-xl mb-3 font-medium">Add New Book</h1>
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
          name="published_year"
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
          name="rent_fees"
          label="Rent Fees"
          rules={[
            {
              required: true,
              message: "Please input the rent fees of book!",
            },
          ]}
        >
          <Input />
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
        <Form.Item name="book_cover" label="Book Cover">
          <Upload
            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {fileList.length >= 8 ? null : uploadButton}
          </Upload>
        </Form.Item>

        {previewImage && (
          <Image
            wrapperStyle={{
              display: "none",
            }}
            preview={{
              visible: previewOpen,
              onVisibleChange: (visible) => setPreviewOpen(visible),
              afterOpenChange: (visible) => !visible && setPreviewImage(""),
            }}
            src={previewImage}
          />
        )}
      </Form>
    </Modal>
  );
};

export default BookForm;
