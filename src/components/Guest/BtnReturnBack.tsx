import { useNavigate } from "react-router-dom";

import { auth } from "../../../config/firebase";

function BtnReturnBack() {
  const navigate = useNavigate();

  const handleBack = () => {
    if (auth.currentUser) {
      navigate(`/userquizarea/${auth.currentUser.displayName}`);
    } else {
      navigate("/guest");
    }
  };

  return (
    <button
      onClick={handleBack}
      type="button"
      className="
        flex items-center justify-center
        w-8 h-8
        px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-sm font-semibold rounded-lg transition
      "
      aria-label="Return to main page"
    >
      ←
    </button>
  );
}

export default BtnReturnBack;
