import Load from "@/components/Load";
import Navbar from "@/components/Navbar";
import Sideframe from "@/components/Sideframe";
import UserRolesTable from "@/components/UserRoles";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center w-full text-black dark:text-slate-50 bg-whitesmoke dark:bg-black">
      <Navbar />
      <div className="flex flex-col md:flex-row w-full gap-4 md:gap-10 p-4 md:p-6">
        <Sideframe className="w-full md:w-1/4" />
        <div className="flex flex-col gap-4 min-h-full w-full md:w-3/4">
          <Load />
          <div className="flex flex-row gap-4">
            <div className="text-blue-600 cursor-pointer">
              <p>Users</p>
              <hr className="border-blue-600"/>
            </div>
            <div className="cursor-pointer">Roles</div>
          </div>
          <UserRolesTable />
        </div>
      </div>
    </main>
  );
}
