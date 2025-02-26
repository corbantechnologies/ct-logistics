import React from "react";

function Footer() {
  return (
    <footer className="footer bg-dark text-white text-center py-3">
      <p>© {new Date().getFullYear()} CT-Logistics. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
