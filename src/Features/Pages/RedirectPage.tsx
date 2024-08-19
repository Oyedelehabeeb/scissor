import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchOriginalUrl } from "../Services/apiLinks";
import Loader from "../ui/Loader";

const RedirectPage: React.FC = () => {
  const { shortUrl } = useParams<{ shortUrl: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const redirect = async () => {
      if (shortUrl) {
        const originalUrl = await fetchOriginalUrl(`scissor/${shortUrl}`);

        if (originalUrl) {
          window.location.href = originalUrl;
        } else {
          navigate("*");
        }
      } else {
        navigate("*");
      }
    };

    redirect();
  }, [shortUrl, navigate]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-blue-600 to-purple-500 text-white px-4 sm:px-6 md:px-8 lg:px-10">
      <Loader />
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-4">
        Redirecting...
      </h2>
      <p className="text-base sm:text-lg md:text-xl mt-2 text-center max-w-md">
        Please wait while we take you to your destination.
      </p>
    </div>
  );
};

export default RedirectPage;
