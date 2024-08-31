const About = () => {
  return (
    <div className="about p-4 text-center">
      <h2 className="text-lg md:text-2xl mb-4">About Foodistaan</h2>
      <p className="mb-4">
        Foodistaan is your go-to platform for discovering and exploring the best
        restaurants and dishes in town. Our app provides detailed menus,
        reviews, and more to help you make informed dining decisions.
      </p>

      {/* Include the ContactUs component here */}

      <footer className="footer mt-8">
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-5 col-md-12 footer-info">
              <a href="#" className="logo d-flex align-items-center">
                <span>Foodistaan</span>
              </a>
              <p>
                Foodistaan offers you the best experience to explore
                restaurants, dishes, and reviews. Discover your next favorite
                spot with ease and convenience.
              </p>
              <div className="social-links mt-3">
                <a href="#" className="twitter">
                  <i className="fa fa-twitter"></i>
                </a>
                <a href="#" className="facebook">
                  <i className="fa fa-facebook"></i>
                </a>
                <a href="#" className="instagram">
                  <i className="fa fa-instagram"></i>
                </a>
                <a href="#" className="linkedin">
                  <i className="fa fa-linkedin"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="foot-container mt-4">
          <div className="copyright">
            &copy; Copyright{" "}
            <strong>
              <span>Foodistaan</span>
            </strong>
            . All Rights Reserved
          </div>
          <div className="credits">
            Designed by <a href="#">Abedin</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;

// import User from "./User";

// const About = () => {
//   return (
//     <div className="about p-4 text-center">
//       <h2 className="text-lg md:text-2xl">This is About section</h2>
//       <User />
//     </div>
//   );
// };

// export default About;
