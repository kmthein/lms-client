import React, { useState } from "react";
import { Form, Modal } from "antd";
import Title from "antd/es/typography/Title";
import { useSelector } from "react-redux";
import { users } from "../../../features/user/userSlice";
import { userRentBook, userReserveBook } from "../../../api/book";

const RentForm = ({ open, setOpen, book, isRent }) => {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const { user } = useSelector(users);

  const onCreate = async (values) => {
    console.log("Book id: " + book.id);
    console.log("User id: " + user.id);
    setConfirmLoading(true);
    try {
      const formData = new FormData();
      formData.append("bookId", book.id);
      formData.append("memberId", user.id);
      if (isRent) {
        await userRentBook(formData);
      } else {
        await userReserveBook(formData);
      }
    } catch (error) {
      console.error("Something went wrong:", error);
    } finally {
      setConfirmLoading(false);
      setOpen(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
  };

  return (
    <Modal
      open={open}
      onOk={() => form.submit()}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      width={400}
    >
      <Form
        form={form}
        name={"Book Rent"}
        onFinish={onCreate}
        layout="vertical"
        initialValues={{ expired_date: 7 }}
      >
        <Title level={3} className="text-center mb-4">
          {isRent ? "Confirm Rent" : "Confirm Reservation"}
        </Title>
        {/* <>
          <div className=" flex justify-between">
            <img
              src={import.meta.env.VITE_API + book?.bookImg}
              className="w-[6rem] h-[9rem] object-cover"
            />
            <div>
              <label className="block font-semibold mb-1">Book Title</label>
              <p>{book?.title}</p>
            </div>
            <div>
              <label className="block font-semibold mb-1">Book Author</label>
              <p>{book?.author?.name}</p>
            </div>
            <div>
              <label className="block font-semibold mb-1">Publish Year</label>
              <p>{book?.publishYear}</p>
            </div>
            <div>
              <label className="block font-semibold mb-1">Rent Date</label>
              <DatePicker />
            </div>
          </div>
        </> */}
        <p className=" my-8">
          Are you sure to {isRent ? "rent" : "reserve"} this book?{" "}
          {isRent
            ? "You have 7 days to read this book, you need to return book after that time."
            : "If this book is available, our librarian will contact you."}
        </p>
      </Form>
    </Modal>
  );
};

export default RentForm;
