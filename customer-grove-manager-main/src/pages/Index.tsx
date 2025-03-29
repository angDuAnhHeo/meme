
import React from 'react';
import { Card } from '@/components/ui/card';
import { 
  Users, ShoppingCart, Package, FileText, ArrowUpRight, 
  Store, Clock, ClipboardList
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const StatCard = ({ title, value, icon: Icon, color, path }) => (
  <Link to={path} className="block">
    <Card className="p-4 hover:shadow-md transition-shadow border-l-4" style={{ borderLeftColor: color }}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
        <div className={`p-2 rounded-full`} style={{ backgroundColor: `${color}20` }}>
          <Icon className="w-5 h-5" style={{ color: color }} />
        </div>
      </div>
      <div className="flex items-center mt-4 text-blue-600">
        <span className="text-sm font-medium">Xem chi tiết</span>
        <ArrowUpRight className="w-4 h-4 ml-1" />
      </div>
    </Card>
  </Link>
);

const QuickAccessCard = ({ title, description, icon: Icon, color, path }) => (
  <Link to={path} className="block">
    <Card className="p-6 hover:shadow-md transition-shadow h-full">
      <div className="flex flex-col items-center text-center">
        <div className={`p-4 rounded-full mb-4`} style={{ backgroundColor: color }}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </Card>
  </Link>
);

const RecentOrderItem = ({ id, customer, service, status, time, position, price }) => (
  <div className="flex items-center py-3 border-b last:border-0">
    <div className="w-1/6 font-medium text-gray-900">{id}</div>
    <div className="w-1/5 font-medium">{customer}</div>
    <div className="w-1/5 text-gray-600">{service}</div>
    <div className="w-1/6">
      <Badge 
        className={
          status === 'Đang xử lý' ? 'bg-blue-100 text-blue-800' : 
          status === 'Hoàn thành' ? 'bg-green-100 text-green-800' : 
          'bg-amber-100 text-amber-800'
        }
      >
        {status}
      </Badge>
    </div>
    <div className="w-1/6 text-sm text-gray-500">{time}</div>
    <div className="w-1/6 text-right font-medium">{price}</div>
  </div>
);

const Index = () => {
  const stats = [
    { title: "Đơn hàng hôm nay", value: "0", icon: ShoppingCart, color: "#e63946", path: "/orders" },
    { title: "Tổng cửa hàng", value: "3", icon: Store, color: "#ffb703", path: "/stores" },
    { title: "Doanh thu hôm nay", value: "0.0K", icon: FileText, color: "#2a9d8f", path: "/invoices" },
    { title: "Đơn chờ xử lý", value: "0", icon: ClipboardList, color: "#4361ee", path: "/orders" },
  ];

  const quickAccess = [
    { title: "Quản Lý Đơn Hàng", description: "Xem và cập nhật đơn hàng", icon: ShoppingCart, color: "#e63946", path: "/orders" },
    { title: "Quản Lý Cửa Hàng", description: "Thêm và quản lý cửa hàng", icon: Store, color: "#ffb703", path: "/stores" },
    { title: "Quản Lý Kệ Hàng", description: "Quản lý kệ và vị trí", icon: Package, color: "#2a9d8f", path: "/inventory" },
    { title: "Quản Lý Khách Hàng", description: "Danh sách và thông tin", icon: Users, color: "#4361ee", path: "/customers" },
  ];

  const recentOrders = [
    { id: "order1", customer: "Nguyễn Văn Khách", service: "Giặt & Sấy", status: "Đang xử lý", time: "08:30 15/03/2023", position: "A1 - A1-3", price: "80.000 đ" },
    { id: "order2", customer: "Trần Thị Khách", service: "Giặt Hấp", status: "Hoàn thành", time: "14:20 14/03/2023", position: "A1 - A1-5", price: "120.000 đ" },
    { id: "order3", customer: "Lê Văn Khách", service: "Giặt Khô", status: "Đang giặt", time: "09:45 15/03/2023", position: "B2 - B2-1", price: "95.000 đ" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Bảng Điều Khiển</h1>
        <p className="text-gray-500 mt-1">Chào mừng đến với hệ thống quản lý dịch vụ giặt là</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <h2 className="text-xl font-bold text-gray-800 mt-8">Truy Cập Nhanh</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickAccess.map((item, index) => (
          <QuickAccessCard key={index} {...item} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-bold text-lg">Đơn Hàng Gần Đây</h2>
            <Link to="/orders" className="text-blue-600 text-sm font-medium flex items-center">
              Xem tất cả <ArrowUpRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <div className="min-w-full">
              <div className="grid grid-cols-6 mb-2 text-sm font-medium text-gray-500 uppercase">
                <div className="col-span-1">Mã đơn</div>
                <div className="col-span-1">Khách hàng</div>
                <div className="col-span-1">Dịch vụ</div>
                <div className="col-span-1">Trạng thái</div>
                <div className="col-span-1">Thời gian</div>
                <div className="col-span-1 text-right">Giá tiền</div>
              </div>
              <div className="space-y-0">
                {recentOrders.map((order, index) => (
                  <RecentOrderItem key={index} {...order} />
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;
