
import { useState } from "react";
import { Service } from "@/types";
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
import { Clock, Pencil, Plus, Trash } from "lucide-react";

const ServicesPage = () => {
  const [services, setServices] = useState<Service[]>([
    {
      id: "SRV-001",
      name: "Giặt sấy thường",
      description: "Dịch vụ giặt và sấy thông thường",
      category: "Giặt sấy",
      price: 40000,
      estimatedTimeHours: 2,
      isActive: true
    },
    {
      id: "SRV-002",
      name: "Giặt hấp cao cấp",
      description: "Dịch vụ giặt hấp cao cấp cho quần áo đặc biệt",
      category: "Giặt đặc biệt",
      price: 80000,
      estimatedTimeHours: 3,
      isActive: true
    },
    {
      id: "SRV-003",
      name: "Giặt sấy gấp",
      description: "Dịch vụ giặt sấy nhanh trong 1 giờ",
      category: "Giặt sấy",
      price: 60000,
      estimatedTimeHours: 1,
      isActive: true
    },
    {
      id: "SRV-004",
      name: "Giặt khô cao cấp",
      description: "Giặt khô với chất tẩy đặc biệt",
      category: "Giặt đặc biệt",
      price: 100000,
      estimatedTimeHours: 4,
      isActive: false
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Quản lý Dịch vụ</h1>
        <Button className="bg-red-600 hover:bg-red-700">
          <Plus className="h-4 w-4 mr-2" />
          Thêm dịch vụ
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tên dịch vụ</TableHead>
              <TableHead>Mô tả</TableHead>
              <TableHead>Danh mục</TableHead>
              <TableHead>Giá</TableHead>
              <TableHead>Thời gian ước tính</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.id}>
                <TableCell className="font-medium">{service.name}</TableCell>
                <TableCell>{service.description}</TableCell>
                <TableCell>{service.category}</TableCell>
                <TableCell>{service.price.toLocaleString()} VND</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-gray-500" />
                    {service.estimatedTimeHours} giờ
                  </div>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={service.isActive ? "success" : "secondary"}
                  >
                    {service.isActive ? "Đang hoạt động" : "Ngừng cung cấp"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
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

export default ServicesPage;
