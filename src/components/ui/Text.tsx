import styled from 'styled-components'

const StyledText = styled.span`
  color: #d4af37;
  font-family: 'SweetHoliday', sans-serif;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
`

interface TextProps extends React.ParamHTMLAttributes<HTMLParagraphElement> {
  as?: string
}

const Text = ({ as: HTMLElement = 'span', children, ...props }: TextProps) => {
  return (
    <StyledText as={HTMLElement} {...props}>
      {children}
    </StyledText>
  )
}

Text.h1 = (props: TextProps) => <Text as="h1" {...props} />
Text.h2 = (props: TextProps) => <Text as="h2" {...props} />
Text.h3 = (props: TextProps) => <Text as="h3" {...props} />
Text.h4 = (props: TextProps) => <Text as="h4" {...props} />
Text.h5 = (props: TextProps) => <Text as="h5" {...props} />
Text.h6 = (props: TextProps) => <Text as="h6" {...props} />
Text.span = (props: TextProps) => <Text as="span" {...props} />
Text.p = (props: TextProps) => <Text as="p" {...props} />

export default Text
