import Image from 'next/image';
import React from 'react';

const NavItems = [
  {
    name: "Notifications",
    imgsrc: "/notifications.svg",
  },
  {
    name: "Wallet",
    imgsrc: "/wallet.svg",
  },
  {
    name: "Inquiries",
    imgsrc: "/inquiries.svg",
  },
  {
    name: "Settings",
    imgsrc: "/settings.svg",
  },
];

const Navbar = () => {
  return (
    <header className="items-center justify-between w-full p-4 bg-white shadow hidden md:flex">
      <Image
        src={'/logo.png'}
        alt='logo'
        width={45}
        height={15}
        className='ml-6'
      />
      <div className="flex items-center border bg-gray-300 rounded-lg w-full md:max-w-md"> {/* Added md:max-w-md for responsiveness on medium screens */}
        <div className='flex flex-row'>
          <Image src='/searchicon.svg' alt='Search' width={24} height={10} className='mx-2'/>
          <input
            type="text"
            placeholder={`Search here...`}
            className="flex-1 p-2 w-full bg-gray-300 outline-none"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4 sm:hidden md:flex"> {/* Added sm:hidden md:flex for conditional rendering */}
        {NavItems.map((item, i) => (
          <div key={i} className='flex flex-col gap-2 items-center'>
            <Image src={item.imgsrc} alt={item.name} width={20} height={5} />
            <p>{item.name}</p>
          </div>
        ))}
      </div>
      <section className='flex flex-row gap-2 items-center justify-between bg-none sm:flex'> {/* Added sm:flex md:hidden for conditional rendering */}
        <Image src="/Ellipse 775.png" alt="Profile" width={40} height={40} className="rounded-full" />
        <div>
          <Image src='/arrowDown.svg' alt='arrowDown' width={20} height={5} />
        </div>
      </section>
    </header>
  );
};

export default Navbar;
