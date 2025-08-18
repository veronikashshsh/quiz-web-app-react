const MainContent = () => {
  return (
    <div className="flex-1 p-6 overflow-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Dashboard Overview</h2>
        <p className="text-gray-600">Monitor your quiz performance and manage your content</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Quizzes</h3>
          <p className="text-3xl font-bold text-blue-600">24</p>
          <p className="text-sm text-gray-500 mt-2">+3 from last month</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Active Users</h3>
          <p className="text-3xl font-bold text-green-600">1,247</p>
          <p className="text-sm text-gray-500 mt-2">+12% from last week</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Completion Rate</h3>
          <p className="text-3xl font-bold text-purple-600">87%</p>
          <p className="text-sm text-gray-500 mt-2">+5% improvement</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <div>
                <p className="text-sm font-medium text-gray-800">New quiz created: "React Fundamentals"</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <div>
                <p className="text-sm font-medium text-gray-800">Quiz completed by 15 users</p>
                <p className="text-xs text-gray-500">4 hours ago</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
              <div>
                <p className="text-sm font-medium text-gray-800">Statistics updated</p>
                <p className="text-xs text-gray-500">6 hours ago</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200">
              Create New Quiz
            </button>
            <button className="w-full p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200">
              View All Statistics
            </button>
            <button className="w-full p-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors duration-200">
              Manage Users
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainContent