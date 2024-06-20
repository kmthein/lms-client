import { Form, Input, Modal, Radio, Upload } from "antd";
import React, { useState } from "react";
import { BiPlus } from "react-icons/bi";

const AuthorForm = ({ open, setOpen }) => {
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

  const [fileList, setFileList] = useState([]);

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

  const authorSubmitHandler = async () => {};

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
          <Upload
            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AuthorForm;
