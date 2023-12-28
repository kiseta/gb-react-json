import React from "react";
import { FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className='bg-light text-dark py-3'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6'>
            <p>&copy; 2023 Guestbook Demo.</p>
          </div>
          <div className='col-md-6 d-flex justify-content-end align-items-center'>
            <a href='https://github.com'>
              <FaGithub size={32} className='mx-3' />
            </a>
            <a href='https://linkedin.com'>
              <FaLinkedin size={32} className='mx-3' />
            </a>
            <a href='https://youtube.com'>
              <FaYoutube size={32} className='mx-3' />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
