import { FaGithub, FaKaggle, FaEnvelope } from "react-icons/fa";

const contactPage = () => {
  return (
    <div>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">
        let's connect!
      </h1>

      <div style={{ display: "flex", gap: "12px" }}>
        <a href="mailto:akmalfauzi001@gmail.com">
          <FaEnvelope size={18} />
        </a>
        <a
          href="https://github.com/aakmalf"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub size={18} />
        </a>
        <a
          href="https://kaggle.com/akmalfauzi"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaKaggle size={18} />
        </a>
      </div>
    </div>
  );
};

export default contactPage;
