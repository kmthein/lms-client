import React, { useEffect, useState } from "react";
import HomeCard from "../../components/admin/home/HomeCard";
import { BiBook, BiBookAdd, BiCategory } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";
import { getAllCounts } from "../../api/dashboard";

const Home = () => {
  const initialCount = {
    bookCount: null,
    genreCount: null,
    authorCount: null,
    totalRentCount: null,
  };

  const [totalCount, setTotalCount] = useState(initialCount);

  const getAllCountHandler = async () => {
    const response = await getAllCounts();
    const { bookCount, genreCount, authorCount, totalRentCount } =
      response.data;
    setTotalCount({ bookCount, genreCount, authorCount, totalRentCount });
  };

  const { bookCount, genreCount, authorCount, totalRentCount } = totalCount;

  useEffect(() => {
    getAllCountHandler();
  }, []);
  return (
    <div className="flex gap-6 flex-wrap pt-3">
      <HomeCard
        title={"Book"}
        content={bookCount}
        icon={<BiBook className="text-lg text-[#615fa0]" />}
        iconBg={"bg-[#E5E4FF]"}
      />
      <HomeCard
        title={"Genre"}
        content={genreCount}
        icon={<BiCategory className="text-lg text-[#a7812a]" />}
        iconBg={"bg-[#FFF3D6]"}
      />
      <HomeCard
        title={"Author"}
        content={authorCount}
        icon={<BsPerson className="text-lg text-[#31a068]" />}
        iconBg={"bg-[#D9F7E8]"}
      />
      <HomeCard
        title={"Total Rents"}
        content={totalRentCount}
        icon={<BiBookAdd className="text-lg text-[#b16546]" />}
        iconBg={"bg-[#FFDED1]"}
      />
    </div>
  );
};

export default Home;
