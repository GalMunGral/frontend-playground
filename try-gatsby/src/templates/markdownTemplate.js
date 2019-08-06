import React from 'react';
import { graphql } from "gatsby";

export default function MarkdownTemplate({
  data
}) {
  return (
    <div className="container">
      <div className="main" dangerouslySetInnerHTML={{
        __html: data.markdownRemark.html
      }}/>
      <style jsx>{`
        ::-webkit-scrollbar {
          display: none;
        }
        .container {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          display: flex;
          justify-content: center;
        }
        .main {
          padding: 50px 0;
          max-width: 50vw;
          overflow-y: scroll;
        }
      `}</style>
    </div>
  )
}

export const query = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: {path: {eq: $path}}) {
      html
    }
  }
`;