import styled from 'styled-components';

interface HtmlRenderProps {
  html: string;
}

const HtmlWrapper = styled.div`
  /* Styles for patagraphs and headings */
  line-height: 1.4;
  color: ${({ theme }) => theme.palette.textPrimary};
  
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
    color: ${({ theme }) => theme.palette.linkPrimary};
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
`;

const HtmlRender: React.FC<HtmlRenderProps> = ({ html }) => {
  return <HtmlWrapper dangerouslySetInnerHTML={{ __html: html }}></HtmlWrapper>;
};

export default HtmlRender;
