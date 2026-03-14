import AdminLayout from '@/components/layout/AdminLayout'

export default function DashboardPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">仪表盘</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 统计卡片 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-sm font-medium text-gray-500">总题库数量</h3>
            <p className="text-3xl font-bold mt-2">120</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-sm font-medium text-gray-500">活跃考试</h3>
            <p className="text-3xl font-bold mt-2">5</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-sm font-medium text-gray-500">总考生数</h3>
            <p className="text-3xl font-bold mt-2">85</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">最近考试</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4">考试名称</th>
                  <th className="text-left py-2 px-4">状态</th>
                  <th className="text-left py-2 px-4">参与人数</th>
                  <th className="text-left py-2 px-4">平均分</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2 px-4">JavaScript基础测试</td>
                  <td className="py-2 px-4">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">已发布</span>
                  </td>
                  <td className="py-2 px-4">25</td>
                  <td className="py-2 px-4">85</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4">React进阶测试</td>
                  <td className="py-2 px-4">
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">草稿</span>
                  </td>
                  <td className="py-2 px-4">0</td>
                  <td className="py-2 px-4">-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}