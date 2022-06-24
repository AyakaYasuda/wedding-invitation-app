import FlexColumnBox from '../atoms/FlexColumnBox';
import Paragraph from '../atoms/Paragraph';

type Props = {
  label: string;
  text: string;
  className?: string;
  paragraphStyle?: string;
};

const ColumnLabeledParagraph = (props: Props) => {
  const { label, text, className, paragraphStyle } = props;

  return (
    <FlexColumnBox className={className ? className : ''}>
      <h4 className="mb-1">{label}</h4>
      <Paragraph
        text={text}
        customClassName={`InputLighter mb-2 px-2 ${paragraphStyle}`}
      />
    </FlexColumnBox>
  );
};

export default ColumnLabeledParagraph;