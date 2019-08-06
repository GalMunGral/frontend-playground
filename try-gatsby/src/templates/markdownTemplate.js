import React from 'react';
import { graphql } from "gatsby";

export default function MarkdownTemplate({
  data
}) {
  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div dangerouslySetInnerHTML={{
        __html: data.markdownRemark.html
      }}/>
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