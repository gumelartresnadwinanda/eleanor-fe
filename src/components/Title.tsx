interface TitleProps {
  text: string;
}

const Title = ({ text }: TitleProps) => {
  return <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{text}</h1>;
};

export default Title;
