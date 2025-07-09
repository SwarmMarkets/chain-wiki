import shouldForwardProp from '@styled-system/should-forward-prop'
import styled from 'styled-components'

interface HtmlWrapperProps {
  commentable?: boolean
}

export const HtmlWrapper = styled.div.withConfig({
  shouldForwardProp,
})<HtmlWrapperProps>`
  line-height: 1.4;
  color: #2e3338;

  /* Styles for paragraphs and headings */
  p {
    margin-bottom: 10px;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: bold;
    margin: 20px 0;
  }

  /* Styles for lists and tables */
  ul,
  ol {
    display: block;
    list-style-type: disc;
    margin-top: 1em;
    margin-bottom: 1em;
    margin-left: 0;
    margin-right: 0;
    padding-left: 40px;
  }
  ul {
    list-style-type: disc;
  }
  ol {
    list-style-type: decimal;
  }

  table {
    border-collapse: collapse;
    width: 100%;
  }

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  /* Styles for links and images */
  a {
    color: #511dd7;
    text-decoration: underline;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  /* Additional styles */
  strong {
    font-weight: bold;
  }

  em {
    font-style: italic;
  }
`
