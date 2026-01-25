import { Link } from "react-router-dom";
import { FaGithub, FaTwitter, FaDiscord, FaHeart } from "react-icons/fa";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="w-full bg-black/40 backdrop-blur-lg border-t border-white/10 mt-20 pt-16 pb-8 relative overflow-hidden">
      {/* Decorative gradient blob */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand Section */}
          <div className="flex flex-col gap-6 items-center md:items-start text-center md:text-left">
            <Link to="/" className="group" onClick={scrollToTop}>
              <h2 className="text-4xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 transform skew-x-[-10deg] group-hover:scale-105 transition-transform duration-300">
                Triv Me!
              </h2>
            </Link>
            <p className="text-purple-200/60 font-medium max-w-xs leading-relaxed">
              The ultimate trivia experience. Create, share, and play quizzes with friends in real-time.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-6 items-center">
            <h3 className="text-white font-bold uppercase tracking-widest text-sm bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Explore
            </h3>
            <div className="flex flex-col gap-4 font-medium">
              <Link 
                to="/" 
                onClick={scrollToTop}
                className="text-white/60 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                Home
              </Link>
              <Link 
                to="/create" 
                onClick={scrollToTop}
                className="text-white/60 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                Create Quiz
              </Link>
              <Link 
                to="/join" 
                onClick={scrollToTop}
                className="text-white/60 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                Join Game
              </Link>
            </div>
          </div>

          {/* Socials */}
          <div className="flex flex-col gap-6 items-center md:items-end">
            <h3 className="text-white font-bold uppercase tracking-widest text-sm bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Socials
            </h3>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 hover:border-pink-500/50 hover:scale-110 hover:shadow-lg hover:shadow-pink-500/20 transition-all duration-300"
              >
                <FaTwitter className="text-xl" />
              </a>
              <a 
                href="#" 
                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 hover:border-purple-500/50 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
              >
                <FaGithub className="text-xl" />
              </a>
              <a 
                href="#" 
                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 hover:border-indigo-500/50 hover:scale-110 hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300"
              >
                <FaDiscord className="text-xl" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40 font-medium">
          <p>© 2025 Trim Productions. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <FaHeart className="text-pink-500 animate-pulse" />
            <span>by Slimeball</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
