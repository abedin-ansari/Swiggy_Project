import User from "./User";
import UserClass from "./UserClass";

const About = () => {
  return (
    <div className="about p-4 text-center">
      <h2 className="text-lg md:text-2xl">This is About section</h2>
      <UserClass />
    </div>
  );
};

export default About;
