const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        {/* About Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            About Food Villa 🍕
          </h1>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Hey there! Welcome to Food Villa - my food delivery project that I
            built while learning React. This website helps you discover amazing
            restaurants and order your favorite dishes with just a few clicks.
          </p>
          <p className="text-gray-600 mb-6 leading-relaxed">
            I created this project to practice my React skills and learn
            concepts like React Router, Redux Toolkit, and Tailwind CSS. The app
            uses Swiggy's live API to fetch real restaurant data!
          </p>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Key Features ⭐
          </h2>
          <ul className="list-disc list-inside space-y-3 text-gray-600">
            <li>Browse restaurants and their menus</li>
            <li>Search for your favorite restaurants</li>
            <li>Add items to cart</li>
            <li>Responsive design - works on mobile too!</li>
            <li>Uses Redux for state management</li>
            <li>Built with React and Tailwind CSS</li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Let's Connect 👋
          </h2>
          <p className="text-gray-600 mb-6">
            I'm a passionate web developer learning and building cool stuff.
            Feel free to reach out if you want to discuss the project or just
            say hi!
          </p>
          <div className="space-y-4 text-gray-600">
            <p className="flex items-center">
              <span className="mr-2">📧</span>
              <a
                href="mailto:youremail@example.com"
                className="text-orange-500 hover:text-orange-600"
              >
                youremail@example.com
              </a>
            </p>
            <p className="flex items-center">
              <span className="mr-2">💻</span>
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-500 hover:text-orange-600"
              >
                GitHub Profile
              </a>
            </p>
            <p className="flex items-center">
              <span className="mr-2">👔</span>
              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-500 hover:text-orange-600"
              >
                LinkedIn Profile
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
