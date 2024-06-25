import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBookById } from "../../api/book";
import { Avatar, Input } from "antd";
import { BiSend, BiUser } from "react-icons/bi";
import RentForm from "../../components/user/book/RentForm";

const BookDetails = () => {
  const { id } = useParams();

  const [book, setBook] = useState(null);

  const getBookDetailHandler = async () => {
    const response = await getBookById(id);
    if (response.status == 200) {
      setBook(response.data);
    }
  };

  useEffect(() => {
    getBookDetailHandler();
  }, []);

  const [open, setOpen] = useState(false);

  const [isRent, setIsRent] = useState(true);

  const showModal = () => {
    setOpen(true);
  };

  return (
    <div className="w-[80%] mx-auto">
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
          <h2 className=" text-2xl font-bold mb-2">{book?.title}</h2>
          <div className="flex gap-2 mb-6">
            <Avatar
              icon={
                book?.author.authorImg != null ? (
                  <img src={book?.author.authorImg} />
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
            laudantium sapiente cupiditate, suscipit assumenda quos praesentium
            rerum? Modi non voluptate possimus vel laudantium, harum voluptatem
            similique ducimus, aliquid tempore architecto dolorem hic molestiae
            omnis distinctio eius sapiente molestias officiis asperiores! Amet
            ipsa assumenda aperiam maxime, quibusdam numquam, illum distinctio
            dignissimos ex ea veniam reiciendis culpa enim, expedita natus a
            mollitia maiores! Accusantium harum, maiores quibusdam rem fugiat
            non exercitationem vero eum error dolor quis delectus optio. Illo
            exercitationem eius possimus expedita praesentium eos. Vero a
            voluptatibus impedit vitae non. Quam, voluptatibus itaque.
          </p>
          <div className="mb-6">
            <h5 className=" flex gap-4 mb-3">
              <span className=" uppercase font-semibold w-40">Publisher</span>
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
          <RentForm open={open} setOpen={setOpen} book={book} isRent={isRent} />
        </div>
      </div>
      <div>
        <div className="mb-6">
          <h2 className="title mb-4 text-lg">Write Review</h2>
          <form className="flex w-full">
            <div className=" flex gap-3 w-full">
              <div>
                <Avatar
                  icon={
                    book?.author.authorImg != null ? (
                      <img src={book?.author.authorImg} />
                    ) : (
                      <BiUser />
                    )
                  }
                />
              </div>
              <div className="w-full">
                <h5 className="font-medium mb-2">User 1</h5>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="write a review"
                    name="review"
                    className="border py-2 px-2 rounded-tl-md rounded-bl-md w-full text-sm outline-none"
                  />
                  <button className=" bg-[#1b3e62] w-10 inline-flex rounded-tr-md rounded-br-md justify-center items-center">
                    <BiSend className=" text-white text-xl hover:-rotate-45 duration-200" />
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <h2 className="title mb-4 text-lg">Reviews</h2>
        <div className=" flex gap-3 mb-6">
          <div>
            <Avatar
              icon={
                book?.author.authorImg != null ? (
                  <img src={book?.author.authorImg} />
                ) : (
                  <BiUser />
                )
              }
            />
          </div>
          <div>
            <h5 className="font-medium mb-2">User 1</h5>
            <span className=" text-sm">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam
              quasi aspernatur temporibus dicta eaque repudiandae. Labore
              cupiditate laboriosam culpa eveniet optio itaque quasi magni sequi
              ab! Ea illum corrupti harum consectetur blanditiis ratione
              adipisci neque laboriosam voluptatem maiores cupiditate earum qui
              commodi enim ex voluptas, tempore magnam ullam modi eius.
            </span>
          </div>
        </div>
        <div className=" flex gap-3 mb-6">
          <div>
            <Avatar
              icon={
                book?.author.authorImg != null ? (
                  <img src={book?.author.authorImg} />
                ) : (
                  <BiUser />
                )
              }
            />
          </div>
          <div>
            <h5 className="font-medium mb-2">User 1</h5>
            <span className=" text-sm">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam
              quasi aspernatur temporibus dicta eaque repudiandae. Labore
              cupiditate laboriosam culpa eveniet optio itaque quasi magni sequi
              ab! Ea illum corrupti harum consectetur blanditiis ratione
              adipisci neque laboriosam voluptatem maiores cupiditate earum qui
              commodi enim ex voluptas, tempore magnam ullam modi eius.
            </span>
          </div>
        </div>
        <div className=" flex gap-3 mb-6">
          <div>
            <Avatar
              icon={
                book?.author.authorImg != null ? (
                  <img src={book?.author.authorImg} />
                ) : (
                  <BiUser />
                )
              }
            />
          </div>
          <div>
            <h5 className="font-medium mb-2">User 1</h5>
            <span className=" text-sm">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam
              quasi aspernatur temporibus dicta eaque repudiandae. Labore
              cupiditate laboriosam culpa eveniet optio itaque quasi magni sequi
              ab! Ea illum corrupti harum consectetur blanditiis ratione
              adipisci neque laboriosam voluptatem maiores cupiditate earum qui
              commodi enim ex voluptas, tempore magnam ullam modi eius.
            </span>
          </div>
        </div>
        <div className=" flex gap-3 mb-6">
          <div>
            <Avatar
              icon={
                book?.author.authorImg != null ? (
                  <img src={book?.author.authorImg} />
                ) : (
                  <BiUser />
                )
              }
            />
          </div>
          <div>
            <h5 className="font-medium mb-2">User 1</h5>
            <span className=" text-sm">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam
              quasi aspernatur temporibus dicta eaque repudiandae. Labore
              cupiditate laboriosam culpa eveniet optio itaque quasi magni sequi
              ab! Ea illum corrupti harum consectetur blanditiis ratione
              adipisci neque laboriosam voluptatem maiores cupiditate earum qui
              commodi enim ex voluptas, tempore magnam ullam modi eius.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
