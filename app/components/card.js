import connectDB from "../utils/db";
import Project from "../models/projects";
import { FaLink } from "react-icons/fa";
import { FaExternalLinkSquareAlt } from "react-icons/fa";

const Card = async () => {
  await connectDB();
  const projects = await Project.find();
  return (
    <div className="text-black bg-white dark:text-white dark:bg-[#111010]">
      <div className="mx-auto max-w-2xl lg:mx-0">
        <ul className="space-y-4 list-disc list-inside">
          {projects.map((project) => (
            <li
              key={project._id}
              className="pb-0 mb-0 flex items-start space-y-0"
            >
              <span className="mr-2">•</span>
              <div>
                <div className="flex items-center">
                  <h3 className="text-m font-bold">{project.title}</h3>
                  <a
                    href={project.link}
                    className="ml-2 text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaExternalLinkSquareAlt className="text-xs" />
                  </a>
                </div>
                <div className="ml-4">
                  {/* <p className="text-sm">
                    {Array.isArray(project.category)
                      ? project.category.join(", ")
                      : project.category}
                  </p> */}
                  <p className="mt-2 text-sm">{project.desc}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Card;
