import { prisma } from "@/lib/prisma";
import { Mail, Phone, Search } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import DeleteEnquiryButton from "./DeleteEnquiryButton";

export const dynamic = 'force-dynamic';

export default async function EnquiriesAdminPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || "";

  const enquiries = await prisma.enquiry.findMany({
    where: query ? {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { email: { contains: query, mode: "insensitive" } },
        { phone: { contains: query } },
      ]
    } : undefined,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
        <h1 className="text-3xl font-bold text-brand-dark">Student Enquiries</h1>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
          <div className="w-full sm:w-80">
            <SearchBar placeholder="Search by name, email, or phone..." />
          </div>
          <div className="bg-brand-primary text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md whitespace-nowrap w-full sm:w-auto text-center">
            {enquiries.length} Total
          </div>
        </div>
      </div>
      
      <div className="grid gap-4">
        {enquiries.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
            <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 font-medium">
              {query ? `No enquiries found for "${query}"` : "No enquiries received yet."}
            </p>
          </div>
        ) : (
          enquiries.map((enquiry) => (
            <div key={enquiry.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-6">
              
              <div className="space-y-3 flex-grow">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-bold text-brand-dark">{enquiry.name}</h3>
                  <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                    {enquiry.status}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                  <div className="flex items-center gap-1">
                    <Mail className="w-4 h-4 text-brand-primary" /> {enquiry.email}
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone className="w-4 h-4 text-brand-primary" /> {enquiry.phone}
                  </div>
                </div>
                
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <p className="text-slate-700 italic">"{enquiry.message}"</p>
                </div>
              </div>

              {/* RIGHT SIDE: DATE AND DELETE BUTTON */}
              <div className="flex flex-col justify-between items-end gap-4 shrink-0 min-w-[200px]">
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Received On</p>
                  <p className="font-medium text-brand-dark text-sm">
                    {new Date(enquiry.createdAt).toLocaleDateString('en-US', { 
                      month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' 
                    })}
                  </p>
                </div>
                
                {/* DELETE BUTTON */}
                <DeleteEnquiryButton id={enquiry.id} />
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
}