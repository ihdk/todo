import React from "react";
import { Link } from "react-router-dom";
import { ContentWrapper, PageWrapper } from "../../features/components";

const NothingFoundPage: React.FC = () => {
  return (
    <PageWrapper>
      <ContentWrapper>
        <h1 className="text-center text-primary">Page not found.</h1>
        <div className="flex justify-center">
          <Link to="/">
            <button className="btn-outline btn-primary btn-md btn">
              Back to home
            </button>
          </Link>
        </div>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default React.memo(NothingFoundPage);
