import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-4 dark:bg-gray-900 fixed bottom-0 w-full">
      <div className="container mx-auto text-center">
        <p className="text-gray-600">
          &copy; {new Date().getFullYear()} Vulse Todo
        </p>
        <div className="mt-2">
          <Link
            href="/terms"
            className="text-gray-600 hover:text-gray-800 mr-4"
          >
            Terms of Service
          </Link>
          <Link href="/privacy" className="text-gray-600 hover:text-gray-800">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
