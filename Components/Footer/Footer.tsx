import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className=" p-8 text-center">
      <p className="text-sm ">Chizoba {currentYear}</p>
    </footer>
  );
};

export default Footer;
