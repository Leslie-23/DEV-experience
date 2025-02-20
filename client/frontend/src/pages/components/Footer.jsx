import React from "react";

const Footer = () => {
  return (
    <div>
      <footer
        id="contact"
        className="bg-gray-900 text-white text-center py-8 mt-12"
      >
        <div className="max-w-6xl mx-auto px-6">
          {/* Brand & Description */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-green-500">DX</h2>
            <p className="text-gray-400 text-sm mt-2">
              Elevate your development experience with cutting-edge challenges,
              tools, and insights.
            </p>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
            {/* Company */}
            <div>
              <h3 className="text-gray-300 font-semibold mb-2">Company</h3>
              <ul className="text-gray-400 space-y-1">
                <li>
                  <a href="/about" className="hover:text-green-400">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/careers" className="hover:text-green-400">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="/blog" className="hover:text-green-400">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-gray-300 font-semibold mb-2">Support</h3>
              <ul className="text-gray-400 space-y-1">
                <li>
                  <a href="/faq" className="hover:text-green-400">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="/help" className="hover:text-green-400">
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:support@DevEx.com"
                    className="hover:text-green-400"
                  >
                    Contact Support
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-gray-300 font-semibold mb-2">Legal</h3>
              <ul className="text-gray-400 space-y-1">
                <li>
                  <a href="/terms" className="hover:text-green-400">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="hover:text-green-400">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/cookies" className="hover:text-green-400">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Social & Copyright */}
          <div className="mt-6 text-sm">
            <div className="flex justify-center space-x-4">
              <a
                href="https://twitter.com/devex"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-400"
              >
                Twitter
              </a>
              <a
                href="https://linkedin.com/company/devex"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-400"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/devex"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-400"
              >
                GitHub
              </a>
            </div>
            <p className="text-gray-400 mt-4">
              © 2024 <span className="text-green-500 font-semibold">DX</span>.
              All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
