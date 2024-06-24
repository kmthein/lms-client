import { Card } from "antd";
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
                ? "http://localhost:8080/" + book.bookImg
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
              <h4 className="text-[14px]">
                {book.title} ({book.publishYear ? book.publishYear : "Unknown"})
              </h4>
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
              <p className="text-[12px]">
                {book.genres.length > 0
                  ? book.genres.map((genre) => genre.genreName).join(", ")
                  : "Unknown Genre"}
              </p>
            </div>
          }
        />
      </Card>
    </div>
  );
};

export default Bookcard;
