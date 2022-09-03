import Banner from "../components/Banner";
import Navbar from "../components/Navbar";
import Proposals from "../components/Proposals";

const icons = [
  { name: "twitter", link: "https://twitter.com/gonzaotc", image: "twitter.svg" },
  { name: "linkedin", link: "https://www.linkedin.com/in/gonzaotc/", image: "linkedin.svg" },
  { name: "github", link: "https://github.com/gonzaotc", image: "github.svg" },
  { name: "mail", link: "mailto: gonza.otc@gmail.com", image: "gmail.svg" },
];

const Home = () => {
  return (
    <div className="bg-primary min-h-[100%] flex flex-col justify-between">
      <div className="mb-10 w-full shadow-[0_0_14px_rgba(255,255,255,0.2)] sticky top-0 bg-primary/40 backdrop-blur-lg z-10">
        <header className="w-11/12 mx-auto">
          <Navbar />
        </header>
      </div>

      <Proposals />

      <div className="flex items-center justify-center my-10">
        <div className="flex items-center relative">
          <a
            href="mailto: gonza.otc@gmail.com"
            className="text-gradient text-2xl font-semibold mr-2"
          >
            CONTACT ME
          </a>
          {icons.map((icon, index) => (
            <a href={icon.link} target="_blank" rel="noreferrer" key={index}>
              <img
                src={icon.image}
                className={`w-9 h-9 invert-[90%] hover:scale-[135%] relative top-[-2px] mx-1.5`}
                alt=""
              />
            </a>
          ))}
        </div>
      </div>

      <Banner />
    </div>
  );
};

export default Home;
