export default function AdminProductsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Products</h1>
        <button className="px-4 py-2 bg-gray-900 text-white rounded-md font-medium hover:bg-black transition-colors">
          Add New Product
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500">
                <th className="pb-3 font-medium">Product</th>
                <th className="pb-3 font-medium">Price</th>
                <th className="pb-3 font-medium">Collection</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-gray-200 rounded-md"></div>
                    <span className="font-medium text-gray-900">Golden Hour Tote</span>
                  </div>
                </td>
                <td className="py-4 text-gray-600">GHS 350.00</td>
                <td className="py-4 text-gray-600">Summer Elegance</td>
                <td className="py-4"><span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Active</span></td>
                <td className="py-4 text-right">
                  <button className="text-indigo-600 hover:text-indigo-900 font-medium">Edit</button>
                </td>
              </tr>
              <tr>
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-gray-200 rounded-md"></div>
                    <span className="font-medium text-gray-900">Obsidian Clutch</span>
                  </div>
                </td>
                <td className="py-4 text-gray-600">GHS 210.00</td>
                <td className="py-4 text-gray-600">Midnight Collection</td>
                <td className="py-4"><span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Draft</span></td>
                <td className="py-4 text-right">
                  <button className="text-indigo-600 hover:text-indigo-900 font-medium">Edit</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
