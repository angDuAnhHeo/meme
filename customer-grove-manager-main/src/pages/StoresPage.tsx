
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, MapPin, Pencil, Plus, Store, Trash } from "lucide-react";

interface StoreLocation {
  id: string;
  name: string;
  address: string;
  phone: string;
  manager: string;
  employeeCount: number;
  status: 'active' | 'closed' | 'maintenance';
}

const StoresPage = () => {
  const [stores, setStores] = useState<StoreLocation[]>([
    {
      id: "store-001",
      name: "Giặt Sấy Quận 1",
      address: "123 Đường Lê Lợi, Quận 1, TP.HCM",
      phone: "0901234567",
      manager: "Nguyễn Văn X",
      employeeCount: 5,
      status: "active"
    },
    {
      id: "store-002",
      name: "Giặt Sấy Quận 3",
      address: "456 Đường Hai Bà Trưng, Quận 3, TP.HCM",
      phone: "0912345678",
      manager: "Trần Thị Y",
      employeeCount: 4,
      status: "active"
    },
    {
      id: "store-003",
      name: "Giặt Sấy Quận 7",
      address: "789 Đường Nguyễn Thị Thập, Quận 7, TP.HCM",
      phone: "0923456789",
      manager: "Lê Văn Z",
      employeeCount: 6,
      status: "active"
    },
    {
      id: "store-004",
      name: "Giặt Sấy Thủ Đức",
      address: "321 Đường Võ Văn Ngân, TP. Thủ Đức, TP.HCM",
      phone: "0934567890",
      manager: "Phạm Văn A",
      employeeCount: 3,
      status: "maintenance"
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Quản lý Cửa hàng</h1>
        <Button className="bg-red-600 hover:bg-red-700">
          <Plus className="h-4 w-4 mr-2" />
          Thêm cửa hàng
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tên cửa hàng</TableHead>
              <TableHead>Địa chỉ</TableHead>
              <TableHead>Quản lý</TableHead>
              <TableHead>Số nhân viên</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stores.map((store) => (
              <TableRow key={store.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <Store className="h-4 w-4 mr-2 text-red-600" />
                    {store.name}
                  </div>
                </TableCell>
                <TableCell>{store.address}</TableCell>
                <TableCell>{store.manager}</TableCell>
                <TableCell>{store.employeeCount}</TableCell>
                <TableCell>
                  <Badge 
                    variant={
                      store.status === "active" 
                        ? "success" 
                        : store.status === "closed" 
                          ? "destructive" 
                          : "warning"
                    }
                  >
                    {store.status === "active" 
                      ? "Đang hoạt động" 
                      : store.status === "closed" 
                        ? "Đã đóng cửa" 
                        : "Đang bảo trì"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-blue-600">
                    <MapPin className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-red-600">
                    <Trash className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default StoresPage;
