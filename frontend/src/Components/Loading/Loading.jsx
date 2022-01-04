import ClipLoader from "react-spinners/ClipLoader";
import BeatLoader from "react-spinners/BeatLoader";
import { css } from "@emotion/react";
import "./loading.css";

const Loading = (props) => {
  const { loadingType, color, size, loading } = props;

  const homepageLoading = css`
    display: block;
    margin: 0 auto;
  `;
  return (
    <>
      <div className="loading-container">
        {loadingType === "ClipLoader" && (
          <ClipLoader
            color={color}
            loading={loading}
            size={size}
            css={homepageLoading}
          />
        )}
        {loadingType === "BeatLoader" && (
          <BeatLoader
            color={color}
            loading={loading}
            size={size}
            css={homepageLoading}
          />
        )}
      </div>
    </>
  );
};

export default Loading;
