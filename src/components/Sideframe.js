import Image from 'next/image';
import Link from 'next/link';

const sideMenuItems = [
  { name: "Account", icon: "/account.svg" },
  { name: "Security", icon: "/security.svg" },
  { name: "Notifications", icon: "/notifications.svg" },
  { name: "Pricing", icon: "/pricing.svg" },
  { name: "Sales", icon: "/sales.svg" },
  { name: "Users & Roles", icon: "/users.svg", active: true },
  { name: "Backups", icon: "/backups.svg" },
];

const Sideframe = () => (
  <div className="w-full h-screen bg-white p-4 flex flex-col justify-between sm:w-64">  {/* Added sm:w-64 for responsiveness on small screens */}
    <div>
      <div className="mb-8">
        <h3 className="font-semibold text-xl">Settings</h3>
      </div>
      <ul className="space-y-2"> {/* Replaced mb-2 with space-y-2 for spacing */}
        {sideMenuItems.map((item, index) => (
          <li key={index} className={`flex items-center p-2 rounded-lg cursor-pointer ${item.active ? 'bg-gray-200' : 'hover:bg-gray-100'}`}>
            <Image src={item.icon} alt={item.name} width={20} height={20} />
            <span className="ml-4">{item.name}</span>
          </li>
        ))}
      </ul>
    </div>

    <hr className='font-bold'/>

    <div className="mt-auto">
      <button className="flex items-center p-2 w-full border rounded-lg hover:bg-gray-100">
        <Image src="/sidefooter.svg" alt="Dashboard" width={20} height={20} />
        <span className="ml-4">Back to Dashboard</span>
      </button>
    </div>
  </div>
);

export default Sideframe;
