import React from 'react';

type TextAreaProps = {
  id?: string;
  placeholder: string;
  autoFocus?: boolean;
  value: string;
  onChange: (input: string) => void;
}

class TextArea extends React.Component<TextAreaProps>{
  onTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.props.onChange(e.target.value);
  }

  render(): React.ReactElement {
    const { id, autoFocus, placeholder, value } = this.props;
    return (
      <textarea
        id={id}
        autoFocus={autoFocus}
        placeholder={placeholder}
        value={value}
        onChange={this.onTextAreaChange}
      />
    )
  }
}

export default TextArea;