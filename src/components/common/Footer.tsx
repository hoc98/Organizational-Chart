import { FC } from "react";

export const Footer: FC = () => {
  return (
    <>
    <footer className="bg-gray-800 text-white p-4 mt-8">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Hossein Shariat. All rights
          reserved.
        </p>
        <p className="mt-2">
          <a href="/privacy-policy" className="hover:underline">
            Privacy Policy
          </a>
          <a href="/terms-of-service" className="hover:underline">
            Terms of Service
          </a>
        </p>
      </div>
    </footer>
    </>
  );
};
