import { Drawer, Flex } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { allCart, removeFromCart } from "./cartSlice";
import { FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Cart = ({ onClose, open }) => {
  const { cartItem } = useSelector(allCart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleRemove = (e, id) => {
    e.stopPropagation();
    dispatch(removeFromCart(id));
  };
  const handleNavigate = (id) => {
    navigate(`/books/${id}`);
  };
  return (
    <Drawer title="Saved Books" onClose={onClose} open={open} size="large">
      {cartItem.length > 0 &&
        cartItem.map((cart) => (
          <div key={cart.id}>
            <Flex
              align="center"
              justify="space-between"
              className="mb-3 cursor-pointer"
              onClick={() => {
                onClose();
                handleNavigate(cart.id);
              }}
            >
              <img
                alt="book cover"
                src={
                  cart.bookImg
                    ? import.meta.env.VITE_API + "/" + cart.bookImg
                    : "https://dummyimage.com/200x300/cccccc/ffffff.png&text=No+Image"
                }
                className="h-[100px] w-[100px] object-cover rounded-t-md"
              />
              <p>{cart.title}</p>
              <p>{cart.author.name}</p>
              <FaHeart
                size={30}
                onClick={(e) => handleRemove(e, cart.id)}
                color="red"
              />
            </Flex>
          </div>
        ))}
    </Drawer>
  );
};

export default Cart;
