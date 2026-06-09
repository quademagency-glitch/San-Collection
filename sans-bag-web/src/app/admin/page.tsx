export default function AdminOverviewPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500 mb-1">Total Revenue</p>
          <h3 className="text-3xl font-bold text-gray-900">GHS 12,450</h3>
          <p className="text-sm text-green-600 mt-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>
            14% from last month
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500 mb-1">Total Orders</p>
          <h3 className="text-3xl font-bold text-gray-900">42</h3>
          <p className="text-sm text-green-600 mt-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>
            5% from last month
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500 mb-1">Active Customers</p>
          <h3 className="text-3xl font-bold text-gray-900">128</h3>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500">
                <th className="pb-3 font-medium">Order ID</th>
                <th className="pb-3 font-medium">Customer</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Amount</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="py-4 font-medium text-gray-900">#ORD-001</td>
                <td className="py-4 text-gray-600">Sarah Jenkins</td>
                <td className="py-4 text-gray-600">Today, 10:42 AM</td>
                <td className="py-4 text-gray-900">GHS 420.00</td>
                <td className="py-4"><span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Paid</span></td>
              </tr>
              <tr>
                <td className="py-4 font-medium text-gray-900">#ORD-002</td>
                <td className="py-4 text-gray-600">Michael Osei</td>
                <td className="py-4 text-gray-600">Yesterday, 2:15 PM</td>
                <td className="py-4 text-gray-900">GHS 350.00</td>
                <td className="py-4"><span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Processing</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
