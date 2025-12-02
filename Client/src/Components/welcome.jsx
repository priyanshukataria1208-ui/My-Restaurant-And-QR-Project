import { Link, useNavigate } from "react-router-dom";
import { UtensilsCrossed, UserPlus, LogIn, User, Sparkles } from "lucide-react";

const welcome = () => {
  const navigate = useNavigate();

  const handleContinueAsGuest = () => {
    localStorage.setItem("guestMode", "true");
    navigate("/");
  };

  return (
    <div className="super-bg min-h-screen flex items-center justify-center px-6 py-10 relative overflow-hidden">

      {/* Color Particles */}
      <div className="particle p1"></div>
      <div className="particle p2"></div>
      <div className="particle p3"></div>
      <div className="particle p4"></div>

      <div className="relative w-full max-w-md mx-auto animate-fadeUp">

        {/* Logo Section */}
        <div className="text-center mb-12 animate-fadeScale">
          <div className="flex justify-center mb-6">
            <div className="logo-box">
              <UtensilsCrossed className="w-14 h-14 text-white drop-shadow-xl" />
            </div>
          </div>

          <h1 className="title-glow">Food</h1>
          <p className="subtitle">Restaurant Management</p>

          <p className="desc">
            Experience fine dining with our curated menu and exceptional service
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-5 mb-12">
          <Link to="/Reg" className="btn-colorful group">
            <UserPlus className="w-5 h-5 group-hover:scale-125 transition" />
            Register
          </Link>

          <Link to="/Login" className="btn-outline group">
            <LogIn className="w-5 h-5 group-hover:scale-125 transition" />
            Login
          </Link>

          <button onClick={handleContinueAsGuest} className="btn-glassy group">
            <User className="w-5 h-5 group-hover:scale-125 transition" />
            Continue as Guest
          </button>
        </div>

        {/* Benefits */}
        <div className="glass-card animate-slideUp">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-pink-300 animate-pulse" />
            <h3 className="benefit-title">Why Join Us?</h3>
          </div>

          <ul className="benefit-list">
            <li>Earn loyalty points on every order</li>
            <li>Exclusive member discounts and offers</li>
            <li>Priority support and faster service</li>
            <li>Track your order history and preferences</li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default welcome;
