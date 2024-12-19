import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Food Villa</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Discover and order from the best restaurants in your area. We make
              food delivery fast, simple and free.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/about#careers"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="/about#team"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Team
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about#help"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Help & Support
                </Link>
              </li>
              <li>
                <Link
                  to="/about#partner"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Partner with us
                </Link>
              </li>
              <li>
                <a
                  href="mailto:support@foodvilla.com"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  support@foodvilla.com
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Instagram
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Twitter
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Food Villa. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
