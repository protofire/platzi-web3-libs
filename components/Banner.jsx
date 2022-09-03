// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper";
import "swiper/css/autoplay";

const images = [
  "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/React.svg/1200px-React.svg.png",
  "https://media.graphcms.com/VKHHNvEETYqZRkqgjybc",
  "https://seeklogo.com/images/E/ethers-logo-D5B86204D8-seeklogo.com.png",
  "https://seeklogo.com/images/W/web3js-logo-62DEE79B50-seeklogo.com.png",
  "https://pbs.twimg.com/profile_images/1520407180322693120/uS6VdwoS_400x400.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Solidity_logo.svg/1200px-Solidity_logo.svg.png",
  "https://seeklogo.com/images/H/hardhat-logo-888739EBB4-seeklogo.com.png",
  "https://avatars.githubusercontent.com/u/1515293?s=280&v=4",
  "https://upload.wikimedia.org/wikipedia/commons/1/18/Ipfs-logo-1024-ice-text.png",
  "data:image/jpeg;base64,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",
  "https://i.pinimg.com/originals/1b/9f/c2/1b9fc2f3a48868013b251accf905c205.png",
  "https://cryptologos.cc/logos/polygon-matic-logo.png",
  "https://cryptologos.cc/logos/chainlink-link-logo.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/2048px-Tailwind_CSS_Logo.svg.png",
  "https://www.daggala.com/static/228867c3668e439101821568a8a03b54/19ca5/sc.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Sass_Logo_Color.svg/1280px-Sass_Logo_Color.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/PostCSS_Logo.svg/790px-PostCSS_Logo.svg.png",
  "https://cdn.worldvectorlogo.com/logos/firebase-1.svg",
];

const Banner = () => {
  return (
    <div className="flex flex-col items-center">
      <p className="text-blue-200/70 text-2xl font-medium tracking-[0.35rem] mb-10">
        I USE TO WORK WITH
      </p>
      <div className="w-full mb-8">
        <Swiper
          spaceBetween={0}
          slidesPerView={6}
          speed={4000}
          loop={true}
          freeMode={true}
          autoplay={{ delay: 1, disableOnInteraction: false }}
          modules={[Autoplay]}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                className={`w-[5.4rem] h-[5.4rem] object-contain ${
                  index === 10 ? "rounded-full" : ""
                }`}
                src={image}
                alt="skill logo"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Banner;
