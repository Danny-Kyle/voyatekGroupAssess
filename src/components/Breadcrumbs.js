import Link from 'next/link';

const Breadcrumb = ({ items }) => {
  return (
    <nav className="text-gray-700 text-sm mb-4" aria-label="Breadcrumb">
      <ol className="list-none p-0 inline-flex flex-wrap">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <Link href={item.href}>
              <p className="text-gray-600 hover:text-blue-800">{item.label}</p>
            </Link>
            {index < items.length - 1 && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4 mx-2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 20.247l6-16.5" />
              </svg>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
