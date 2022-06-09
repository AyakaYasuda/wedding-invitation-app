import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../atoms/Button';
import Card from '../atoms/Card';

type Props = {
  ctaText: string;
  linkText: string;
  params: string;
  children?: React.ReactNode;
};

const Form: React.FC<Props> = ({ children, ctaText, linkText, params }) => {
  const navigate = useNavigate();
  return (
    <Card>
      <div className="w-full md:w-4/5 mx-auto pt-4">
        <form
          action="/admin"
          method="post"
          className="flex flex-col text-left mb-8"
        >
          {children}
        </form>
        <ul>
          <li className="mb-4 w-3/4 mx-auto">
            <Button bgColor="bg-Pink-default" txtColor="text-White-default">
              {ctaText}
            </Button>
          </li>
          <li className="text-Pink-default">
            <button onClick={() => navigate(params)}>{linkText}</button>
          </li>
        </ul>
      </div>
    </Card>
  );
};

export default Form;
