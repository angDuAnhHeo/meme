
import { useState } from "react";
import { Delivery } from "@/types";
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
import { format } from "date-fns";
import { Eye, MapPin, Plus, Truck } from "lucide-react";

const DeliveriesPage = () => {
  const [deliveries, setDeliveries] = useState<Delivery[]>([
    {
      id: "DEL-001",
      orderId: "ORD-001",
      customerName: "Nguyễn Văn A",
      address: "123 Đường Lê Lợi, Quận 1, TP.HCM",
      phone: "0901234567",
      scheduledDate: new Date(2023, 6, 16),
      status: "delivered",
      driverName: "Trần Văn X",
      trackingNote: "Đã giao hàng thành công"
    },
    {
      id: "DEL-002",
      orderId: "ORD-002",
      customerName: "Trần Thị B",
      address: "456 Đường Nguyễn Huệ, Quận 1, TP.HCM",
      phone: "0912345678",
      scheduledDate: new Date(2023, 6, 17),
      status: "in-transit",
      driverName: "Lê Văn Y",
      trackingNote: "Đang trên đường giao hàng"
    },
    {
      id: "DEL-003",
      orderId: "ORD-003",
      customerName: "Lê Văn C",
      address: "789 Đường Hai Bà Trưng, Quận 3, TP.HCM",
      phone: "0923456789",
      scheduledDate: new Date(2023, 6, 18),
      status: "pending",
      trackingNote: "Chờ phân công người giao hàng"
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Quản lý Giao hàng</h1>
        <Button className="bg-red-600 hover:bg-red-700">
          <Plus className="h-4 w-4 mr-2" />
          Tạo đơn giao hàng
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mã đơn</TableHead>
              <TableHead>Khách hàng</TableHead>
              <TableHead>Ngày giao</TableHead>
              <TableHead>Người giao hàng</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deliveries.map((delivery) => (
              <TableRow key={delivery.id}>
                <TableCell className="font-medium">{delivery.id}</TableCell>
                <TableCell>{delivery.customerName}</TableCell>
                <TableCell>{format(delivery.scheduledDate, "dd/MM/yyyy")}</TableCell>
                <TableCell>{delivery.driverName || "Chưa phân công"}</TableCell>
                <TableCell>
                  <Badge 
                    variant={
                      delivery.status === "delivered" 
                        ? "success" 
                        : delivery.status === "in-transit" 
                          ? "warning" 
                          : delivery.status === "pending"
                            ? "secondary"
                            : "destructive"
                    }
                  >
                    {delivery.status === "delivered" 
                      ? "Đã giao hàng" 
                      : delivery.status === "in-transit" 
                        ? "Đang giao hàng" 
                        : delivery.status === "pending"
                          ? "Chờ xử lý"
                          : "Giao hàng thất bại"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="text-blue-600">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MapPin className="h-4 w-4" />
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

export default DeliveriesPage;
