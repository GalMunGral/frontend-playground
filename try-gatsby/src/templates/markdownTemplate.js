import React from 'react';
import { graphql } from "gatsby";

export default function MarkdownTemplate({
  data
}) {
  return (
    <div dangerouslySetInnerHTML={{
      __html: data.markdownRemark.html
    }}></div>
  )
}

export const query = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: {path: {eq: $path}}) {
      html
    }
  }
`;