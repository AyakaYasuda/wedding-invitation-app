import React from 'react';
import TempCopyright from 'views/components/atoms/TempCopyright';
import AdminNavbar from 'views/components/organisms/AdminNavbar';

type Props = {
  children: React.ReactNode;
};

const AdminPageLayout: React.FC<Props> = ({ children }) => {
  return (
    <section className="w-full flex items-center flex-col bg-gradient-to-b from-Pink-lighter to-Pink-default relative min-h-screen text-Pink-default pt-20 ">
      <AdminNavbar />
      {children}
      <TempCopyright className="mb-5" />
    </section>
  );
};

export default AdminPageLayout;
