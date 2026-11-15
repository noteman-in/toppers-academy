import { prisma } from "@/lib/prisma";
import UserActions from "./UserActions";
import AddUserForm from "./AddUserForm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function AdminUsersPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const users = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-brand-dark mb-8">Manage Admin Users</h1>
      
      <div className="grid lg:grid-cols-2 gap-8">
        
        {/* The new form component */}
        <AddUserForm />

        {/* Existing Users List */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-brand-dark mb-4">Authorized Admins</h2>
          {users.map((user) => (
            <div key={user.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-brand-dark">{user.name}</h3>
                <p className="text-xs text-slate-500">{user.email}</p>
              </div>
              
              <UserActions 
                id={user.id} 
                email={user.email} 
                isCurrentUser={user.email === session?.user.email} 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}