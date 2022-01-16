import "./desktoplanding.css";
import desktopMockup from "../../assets/desktop-landing.png";
import { useNavigate } from "react-router-dom";
const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <section className="landing-container">
      <div className="landing-header-desktop">
        Reddat <span className="beta-desktop"> Beta </span>{" "}
      </div>
      <div className="landing-sub-desktop"> Definitely not Reddit</div>
      <img
        src={desktopMockup}
        className="desktop-mockup"
        alt="desktop mockup"
      />
      <p className="not-available">Not available on Desktop yet</p>
    </section>
  );
};

export default LandingPage;
