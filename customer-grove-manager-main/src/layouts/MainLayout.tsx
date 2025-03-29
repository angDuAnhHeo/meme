
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, Users, ShoppingBag, Package, 
  Percent, FileText, Truck, Wrench, Store, 
  Menu, LogOut, User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";
import { AuthContext } from "@/App";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";

const navItems = [
  { path: "/", label: "Tổng quan", icon: LayoutDashboard },
  { path: "/customers", label: "Khách hàng", icon: Users },
  { path: "/orders", label: "Đơn hàng", icon: ShoppingBag },
  { path: "/inventory", label: "Kho hàng", icon: Package },
  { path: "/promotions", label: "Khuyến mãi", icon: Percent },
  { path: "/invoices", label: "Hóa đơn", icon: FileText },
  { path: "/deliveries", label: "Giao hàng", icon: Truck },
  { path: "/services", label: "Dịch vụ", icon: Wrench },
  { path: "/stores", label: "Cửa hàng", icon: Store },
];

const getRoleLabel = (role: string) => {
  switch (role) {
    case 'admin': return 'Quản trị viên';
    case 'manager': return 'Quản lý';
    case 'staff': return 'Nhân viên';
    default: return 'Người dùng';
  }
};

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { userEmail, userRole, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Đăng xuất thành công",
      description: "Hẹn gặp lại bạn!",
    });
    logout();
    navigate('/login');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside 
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-white shadow-md transition-all duration-300 fixed h-full z-10`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 flex items-center justify-between border-b">
            {sidebarOpen ? (
              <h1 className="text-xl font-bold text-red-600">Quản Lý Giặt Sấy</h1>
            ) : (
              <span className="text-xl font-bold text-red-600 mx-auto">QG</span>
            )}
            <Button variant="ghost" size="icon" onClick={toggleSidebar}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>
          
          <nav className="flex-1 pt-4 px-2">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center p-3 rounded-md transition-colors ${
                        isActive
                          ? "bg-red-50 text-red-600"
                          : "hover:bg-gray-100"
                      }`
                    }
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    {sidebarOpen && <span className="ml-3">{item.label}</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="p-4 border-t mt-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start">
                  <User className="h-5 w-5 mr-2" />
                  {sidebarOpen && <span className="truncate">{userEmail}</span>}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="font-normal text-xs text-gray-500">Người dùng</div>
                  <div className="font-medium">{userEmail}</div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem disabled>
                  Vai trò: {getRoleLabel(userRole)}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="h-4 w-4 mr-2" />
                  Đăng xuất
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main 
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? "pl-64" : "pl-20"
        }`}
      >
        <header className="bg-white shadow-sm p-4 sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">Hệ thống quản lý giặt sấy</h2>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="ml-auto">
                  <User className="h-4 w-4 mr-2" />
                  {userEmail}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  <div>{userEmail}</div>
                  <div className="text-xs text-gray-500">{getRoleLabel(userRole)}</div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="h-4 w-4 mr-2" />
                  Đăng xuất
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
