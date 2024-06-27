import { Card, Space, Tag } from "antd";
import Meta from "antd/es/card/Meta";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  allCart,
  removeFromCart,
} from "../../../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

const Bookcard = ({ book }) => {
  const dispatch = useDispatch();
  const { cartItem } = useSelector(allCart);
  const navigate = useNavigate();

  const isFav =
    cartItem.filter((cart) => cart.id === book.id).length === 0 ? false : true;
  console.log(cartItem);
  const handleFav = (e) => {
    e.stopPropagation();
    if (!isFav) {
      dispatch(addToCart(book));
    } else {
      dispatch(removeFromCart(book.id));
    }
  };
  const handleNavigate = (id) => {
    navigate(`/books/${id}`);
  };
  return (
    <div>
      <Card
        key={book.id}
        onClick={() => handleNavigate(book.id)}
        hoverable
        cover={
          <img
            alt="book cover"
            src={
              book.bookImg
                ? import.meta.env.VITE_API + "/" + book.bookImg
                : "https://dummyimage.com/200x300/cccccc/ffffff.png&text=No+Image"
            }
            className="h-[280px] w-full object-cover rounded-t-md"
          />
        }
        className="w-[250px] shadow-md rounded-md"
      >
        <Meta
          title={
            <div className="flex justify-between items-center">
              <h4 className="text-[14px]">{book.title}</h4>
              {isFav ? (
                <FaHeart size={30} onClick={handleFav} color="red" />
              ) : (
                <CiHeart size={30} onClick={handleFav} color="red" />
              )}
            </div>
          }
          description={
            <div className="text-[12px]">
              <p className="mb-1">
                {book.author.name ? book.author.name : "Unknown"} (Author)
              </p>
              <p type="secondary" className="block mt-2">
                Published on: {book.publishYear}
              </p>
              <div className="mt-2">
                <Space size={[0, 8]} wrap>
                  {book.genres.length > 0 ? (
                    <>
                      {book.genres.length > 3 ? (
                        <>
                          {book.genres.slice(0, 3).map((genre) => (
                            <Tag key={genre.id} color="blue">
                              {genre.genreName}
                            </Tag>
                          ))}
                          <p>...</p>
                        </>
                      ) : (
                        <>
                          {book.genres.map((genre) => (
                            <Tag key={genre.id} color="blue">
                              {genre.genreName}
                            </Tag>
                          ))}
                        </>
                      )}
                    </>
                  ) : (
                    <Tag color="gray">Unknown Genre</Tag>
                  )}
                </Space>
              </div>
            </div>
          }
        />
      </Card>
    </div>
  );
};

export default Bookcard;
