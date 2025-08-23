import React from 'react'
import { Link } from "react-router-dom";
import { FaInstagram,FaFacebook,FaWhatsapp,} from "react-icons/fa";


const Footer = () => {
  return (
    <footer className="w-full bg-orange-700 text-gray-300 py-8">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-amber-50">
            <p className="font-semibold text-lg mb-2 ">DesignMyFit</p>
            <p className="text-sm ">
              Express yourself through custom fashion. Designed by you, made for
              you.
            </p>
          </div>
          <div className="text-amber-50">
            <p className="font-semibold mb-2">Quick Links</p>
            <ul className="text-sm space-y-1">
              <li>
                <Link to="/products" className="hover:underline">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:underline">
                  Cart
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:underline">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          <div className="text-amber-50">
            <p className="font-semibold mb-2 ">Contact</p>
            <p className="text-sm">www.designmyfit.com</p>
            <p className="text-sm ">+91 98765 43210</p>
            <div className="flex gap-4 mt-3 text-xl">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook />
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-6 text-center text-xs text-amber-50">
          © {new Date().getFullYear()} DesignMyFit. All Rights Reserved.
        </div>
      </footer>

  )
}

export default Footer