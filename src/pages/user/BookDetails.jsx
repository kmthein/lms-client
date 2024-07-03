import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createNewBookReview,
  getAllBookReview,
  getBookById,
} from "../../api/book";
import { Avatar, Input, Skeleton, message, Dropdown, Space } from "antd";
import { BiSend, BiUser } from "react-icons/bi";
import RentForm from "../../components/user/book/RentForm";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  allCart,
  removeFromCart,
} from "../../features/cart/cartSlice";
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { users } from "../../features/user/userSlice";
import { endLoading, startLoading, uiState } from "../../features/ui/uiSlice";
import { IoChevronDownOutline } from "react-icons/io5";

const BookDetails = () => {
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [bookReview, setBookReview] = useState([]);

  const getBookDetailHandler = async () => {
    dispatch(startLoading());
    const response = await getBookById(id);
    if (response.status == 200) {
      setBook(response.data);
    }
    dispatch(endLoading());
  };

  const getBookReviewHandler = async () => {
    dispatch(startLoading());
    const response = await getAllBookReview({ id: book?.id });
    setBookReview(response.data);
    dispatch(endLoading());
  };

  console.log(bookReview);

  useEffect(() => {
    getBookDetailHandler();
  }, []);

  useEffect(() => {
    getBookReviewHandler();
  }, [book]);

  const [open, setOpen] = useState(false);

  const [isRent, setIsRent] = useState(true);

  const { user } = useSelector(users);

  const { cartItem } = useSelector(allCart);

  const { loading } = useSelector(uiState);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isFav =
    cartItem.filter((cart) => cart.id === book?.id).length === 0 ? false : true;

  const handleFav = (e) => {
    e.stopPropagation();
    if (!isFav) {
      dispatch(addToCart(book));
    } else {
      dispatch(removeFromCart(book.id));
    }
  };

  const [input, setInput] = useState("");

  console.log(user?.id);
  console.log(book?.id);

  const [messageApi, contextHolder] = message.useMessage();

  const reviewSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userId", user.id);
    formData.append("bookId", book.id);
    formData.append("description", input);
    const response = await createNewBookReview(formData);
    console.log(response);
    if (response.data.status == "201") {
      setInput("");
      messageApi.open({
        type: "success",
        content: response.data.message,
      });
      getBookReviewHandler();
    }
  };

  const [active, setActive] = useState(false);

  const items = [
    {
      label: <a href="https://www.antgroup.com">1st menu item</a>,
      key: "0",
    },
    {
      label: <a href="https://www.aliyun.com">2nd menu item</a>,
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: "3rd menu item",
      key: "3",
    },
  ];

  return (
    <div className="w-[80%] mx-auto">
      {contextHolder}
      <div className="flex my-10 gap-14">
        <div className=" w-[350px] h-[500px] book_cover rounded-lg">
          <img
            src={
              book?.bookImg != ""
                ? import.meta.env.VITE_API + book?.bookImg
                : "https://dummyimage.com/200x300/cccccc/ffffff.png&text=No+Image"
            }
            className=" object-cover w-full h-full rounded-lg"
          />
        </div>
        <div className=" w-[70%]">
          {loading ? (
            <Skeleton
              active
              paragraph={{
                rows: 8,
              }}
            />
          ) : (
            <>
              <div className=" flex justify-between items-center">
                <h2 className=" text-2xl font-bold mb-2">{book?.title}</h2>
                {isFav ? (
                  <FaHeart
                    size={30}
                    onClick={handleFav}
                    color="red"
                    className="cursor-pointer"
                  />
                ) : (
                  <CiHeart
                    size={30}
                    onClick={handleFav}
                    color="red"
                    className="cursor-pointer"
                  />
                )}
              </div>
              <div className="flex gap-2 mb-6">
                <Avatar
                  icon={
                    book?.author.authorImg != null ? (
                      <img
                        src={import.meta.env.VITE_API + book?.author.authorImg}
                      />
                    ) : (
                      <BiUser />
                    )
                  }
                />
                <span>{book?.author.name}</span>
              </div>
              <div className="flex gap-2 mb-6">
                {book?.genres &&
                  book.genres.length > 0 &&
                  book.genres.map((genre) => (
                    <span className=" border text-sm p-2 rounded-md">
                      {genre?.genreName}
                    </span>
                  ))}
              </div>
              <p className="mb-6">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga
                corrupti totam dolorem, minus accusamus ipsum officia! Voluptate
                laudantium sapiente cupiditate, suscipit assumenda quos
                praesentium rerum? Modi non voluptate possimus vel laudantium,
                harum voluptatem similique ducimus, aliquid tempore architecto
                dolorem hic molestiae omnis distinctio eius sapiente molestias
                officiis asperiores! Amet ipsa assumenda aperiam maxime,
                quibusdam numquam, illum distinctio dignissimos ex ea veniam
                reiciendis culpa enim, expedita natus a mollitia maiores!
                Accusantium harum, maiores quibusdam rem fugiat non
                exercitationem vero eum error dolor quis delectus optio. Illo
                exercitationem eius possimus expedita praesentium eos. Vero a
                voluptatibus impedit vitae non. Quam, voluptatibus itaque.
              </p>
              <div className="mb-6">
                <h5 className=" flex gap-4 mb-3">
                  <span className=" uppercase font-semibold w-40">
                    Publisher
                  </span>
                  <span>{book?.publisher.publisherName}</span>
                </h5>
                <h5 className=" flex gap-4 mb-3">
                  <span className=" uppercase font-semibold w-40">
                    Published Year
                  </span>
                  <span>{book?.publishYear}</span>
                </h5>
              </div>
              <div>
                {book?.stock > 0 ? (
                  <button
                    className=" bg-amber-500 hover:bg-[#ed9454] duration-150 p-2 rounded-sm text-sm"
                    onClick={() => {
                      setOpen(true);
                      setIsRent(true);
                    }}
                  >
                    Rent Now
                  </button>
                ) : (
                  <button
                    className=" bg-amber-500 hover:bg-[#ed9454] p-2 rounded-sm text-sm"
                    onClick={() => {
                      setOpen(true);
                      setIsRent(false);
                    }}
                  >
                    Reserve
                  </button>
                )}
              </div>
              <RentForm
                open={open}
                setOpen={setOpen}
                book={book}
                isRent={isRent}
              />
            </>
          )}
        </div>
      </div>
      <div>
        <div className="mb-6">
          <h2 className="title mb-4 text-lg">Write Review</h2>
          <div className="flex w-full">
            {user ? (
              <div className=" flex gap-3 w-full">
                <div>
                  <Avatar
                    icon={
                      user?.userImg != null ? (
                        <img src={import.meta.env.VITE_API + user?.userImg} />
                      ) : (
                        <BiUser />
                      )
                    }
                  />
                </div>
                <div className="w-full">
                  <h5 className="font-medium mb-2">{user?.username}</h5>
                  <div>
                    <form className="flex" onSubmit={reviewSubmit}>
                      <input
                        type="text"
                        placeholder="write a review"
                        name="review"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="border py-2 px-2 rounded-tl-md rounded-bl-md w-full text-sm outline-none"
                      />
                      <button
                        type="submit"
                        className=" bg-[#1b3e62] w-10 inline-flex rounded-tr-md rounded-br-md justify-center items-center"
                      >
                        <BiSend className=" text-white text-xl hover:-rotate-45 duration-200" />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            ) : (
              <p>Log in to write a review...</p>
            )}
          </div>
        </div>
        <h2 className="title mb-4 text-lg">Reviews</h2>
        {bookReview &&
          bookReview.length > 0 &&
          bookReview.map((review) => (
            <div className=" flex gap-3 mb-6">
              <div>
                <Avatar
                  icon={
                    review?.user?.userImg != null ? (
                      <img
                        src={import.meta.env.VITE_API + review?.user?.userImg}
                      />
                    ) : (
                      <BiUser />
                    )
                  }
                />
              </div>
              <div className="w-full">
                <div className="flex justify-between">
                  <h5 className="font-medium mb-2">{review?.user.username}</h5>
                  {user?.id == review?.user.id && (
                    <Dropdown
                      menu={{
                        items,
                      }}
                      trigger={["click"]}
                    >
                      <a
                        onClick={(e) => e.preventDefault()}
                        className="cursor-pointer"
                      >
                        <IoChevronDownOutline />
                      </a>
                    </Dropdown>
                  )}
                </div>
                <span className=" text-sm">{review?.description}</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default BookDetails;
