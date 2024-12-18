import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';
import { Activity, Users, Shield, Clock, Twitter, Github, ChevronDown, ChevronUp, AlertCircle, TrendingUp, Box } from 'lucide-react';

// Sample data for charts
const monthlyData = [
  { name: 'Jan', transactions: 145, users: 40, value: 2400 },
  { name: 'Feb', transactions: 230, users: 45, value: 3600 },
  { name: 'Mar', transactions: 180, users: 35, value: 3200 },
  { name: 'Apr', transactions: 275, users: 55, value: 4200 },
  { name: 'May', transactions: 320, users: 65, value: 5800 },
  { name: 'Jun', transactions: 310, users: 75, value: 6200 },
];

const Dashboard = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('1M');
  const [isStatsVisible, setIsStatsVisible] = useState(false);
  const [latestTweet, setLatestTweet] = useState({
    text: "🎉 Just released our new developer tools! Check them out and let us know what you think! #Stacks #BlockchainDev",
    date: "2024-03-18",
    likes: 126,
    retweets: 45
  });

  useEffect(() => {
    setIsStatsVisible(true);
  }, []);

  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <StatsCard 
          title="Total Users"
          value="1,234"
          increase="+12.5%"
          icon={<Users className="h-6 w-6" />}
          color="bg-blue-500"
        />
        <StatsCard 
          title="Active Wallets"
          value="892"
          increase="+8.2%"
          icon={<Shield className="h-6 w-6" />}
          color="bg-purple-500"
        />
        <StatsCard 
          title="Total Transactions"
          value="45.2K"
          increase="+15.3%"
          icon={<Activity className="h-6 w-6" />}
          color="bg-pink-500"
        />
        <StatsCard 
          title="Smart Contracts"
          value="328"
          increase="+5.7%"
          icon={<Box className="h-6 w-6" />}
          color="bg-indigo-500"
        />
      </motion.div>

      {/* Transaction Activity Chart */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-sm p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Transaction Activity</h2>
          <div className="flex gap-2">
            {['1W', '1M', '3M', '1Y'].map((range) => (
              <button
                key={range}
                onClick={() => setSelectedTimeRange(range)}
                className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                  selectedTimeRange === range
                    ? 'bg-purple-100 text-purple-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="transactions" 
                stroke="#8b5cf6" 
                fill="url(#colorTransactions)" 
              />
              <defs>
                <linearGradient id="colorTransactions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Social Media & Growth */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stacks Developers Social Feed */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-1 bg-white rounded-xl shadow-sm p-6"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Stacks Developers</h2>
            <a 
              href="https://x.com/StacksDevs" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600 transition-colors"
            >
              <Twitter className="h-5 w-5" />
            </a>
          </div>
          <div className="border rounded-lg p-4 bg-gray-50">
            <p className="text-gray-700 mb-2">{latestTweet.text}</p>
            <div className="flex justify-between text-sm text-gray-500">
              <span>{new Date(latestTweet.date).toLocaleDateString()}</span>
              <div className="flex gap-4">
                <span>❤️ {latestTweet.likes}</span>
                <span>🔁 {latestTweet.retweets}</span>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <a 
              href="https://x.com/StacksDevs" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full py-2 px-4 bg-[#1DA1F2] text-white rounded-lg text-center hover:bg-[#1a8cd8] transition-colors"
            >
              Follow @StacksDevs
            </a>
          </div>
        </motion.div>

        {/* Growth Metrics */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6"
        >
          <h2 className="text-xl font-semibold mb-6">Growth Metrics</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="users" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {['Deploy Contract', 'View Documentation', 'Get Support'].map((action) => (
          <button
            key={action}
            className="p-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            {action}
          </button>
        ))}
      </motion.div>
    </div>
  );
};

// Stats Card Component
const StatsCard = ({ title, value, increase, icon, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
  >
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
        <span className="text-green-500 text-sm flex items-center gap-1">
          <TrendingUp className="h-3 w-3" />
          {increase}
        </span>
      </div>
      <div className={`p-3 rounded-full ${color} bg-opacity-10`}>
        {React.cloneElement(icon, { className: `h-6 w-6 ${color} text-opacity-100` })}
      </div>
    </div>
  </motion.div>
);



export default Dashboard;