import { motion } from "framer-motion";
import { FaLink, FaCut, FaQrcode, FaChartLine } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ScissorHero = () => {
  const navigate = useNavigate();

  const handleGoToHome = () => navigate("/");

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-400 to-purple-500">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "linear-gradient(0deg, #0062E6, #33AEFF)",
              "linear-gradient(60deg, #33AEFF, #1E90FF)",
              "linear-gradient(120deg, #1E90FF, #4169E1)",
              "linear-gradient(180deg, #4169E1, #0062E6)",
              "linear-gradient(240deg, #0062E6, #33AEFF)",
              "linear-gradient(300deg, #33AEFF, #1E90FF)",
              "linear-gradient(360deg, #1E90FF, #0062E6)",
            ],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Floating elements */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white mix-blend-overlay filter blur-xl"
          style={{
            width: Math.random() * 100 + 50,
            height: Math.random() * 100 + 50,
          }}
          animate={{
            x: [0, Math.random() * 400 - 200],
            y: [0, Math.random() * 400 - 200],
            scale: [1, Math.random() + 0.5, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, delay: 0.2 }}
          className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-blue-100 mb-6"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Simplify Your Links with{" "}
          <motion.span
            animate={{ rotateY: 360 }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Scissor
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-xl md:text-2xl text-white mb-8 max-w-3xl"
          style={{ fontFamily: "'Merriweather', serif" }}
        >
          Shorten your URLs, customize them, generate QR codes, and track
          performance with ease.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 bg-white text-blue-600 text-lg font-bold rounded-full hover:bg-opacity-90 transition duration-300 shadow-lg"
          style={{ fontFamily: "'Poppins', sans-serif" }}
          onClick={handleGoToHome}
        >
          Get Started
        </motion.button>

        {/* Animated Icons */}
        <div className="absolute top-10 left-10 text-white">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            className="text-3xl"
          >
            <FaLink />
          </motion.div>
        </div>
        <div className="absolute bottom-10 right-10 text-white">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-3xl"
          >
            <FaCut />
          </motion.div>
        </div>
        <div className="absolute top-1/4 right-10 text-white">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="text-3xl"
          >
            <FaQrcode />
          </motion.div>
        </div>
        <div className="absolute bottom-1/4 left-10 text-white">
          <motion.div
            animate={{ rotate: [-10, 10, -10] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-3xl"
          >
            <FaChartLine />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default ScissorHero;
