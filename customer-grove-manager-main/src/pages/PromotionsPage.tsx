
import { useState } from "react";
import { Promotion } from "@/types";
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
import { Pencil, Plus, Trash } from "lucide-react";
import { format } from "date-fns";

const PromotionsPage = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([
    {
      id: "promo-001",
      name: "Khuyến mãi mùa hè",
      description: "Giảm giá 20% cho tất cả dịch vụ giặt sấy",
      discountType: "percentage",
      discountValue: 20,
      startDate: new Date(2023, 5, 1),
      endDate: new Date(2023, 7, 31),
      isActive: true,
      applicableServices: ["giặt-sấy", "giặt-hấp"]
    },
    {
      id: "promo-002",
      name: "Khách hàng mới",
      description: "Giảm 50,000 VND cho đơn hàng đầu tiên",
      discountType: "fixed",
      discountValue: 50000,
      startDate: new Date(2023, 0, 1),
      endDate: new Date(2023, 11, 31),
      isActive: true,
      applicableServices: ["all"],
      minOrderAmount: 100000
    },
    {
      id: "promo-003",
      name: "Khuyến mãi cuối năm",
      description: "Giảm giá 15% cho đơn hàng trên 200,000 VND",
      discountType: "percentage",
      discountValue: 15,
      startDate: new Date(2023, 10, 1),
      endDate: new Date(2023, 11, 31),
      isActive: false,
      applicableServices: ["all"],
      minOrderAmount: 200000
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Quản lý Khuyến mãi</h1>
        <Button className="bg-red-600 hover:bg-red-700">
          <Plus className="h-4 w-4 mr-2" />
          Thêm khuyến mãi
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tên khuyến mãi</TableHead>
              <TableHead>Mô tả</TableHead>
              <TableHead>Loại giảm giá</TableHead>
              <TableHead>Thời gian</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {promotions.map((promo) => (
              <TableRow key={promo.id}>
                <TableCell className="font-medium">{promo.name}</TableCell>
                <TableCell>{promo.description}</TableCell>
                <TableCell>
                  {promo.discountType === "percentage" 
                    ? `${promo.discountValue}%` 
                    : `${promo.discountValue.toLocaleString()} VND`}
                </TableCell>
                <TableCell>
                  {format(promo.startDate, "dd/MM/yyyy")} - {format(promo.endDate, "dd/MM/yyyy")}
                </TableCell>
                <TableCell>
                  <Badge variant={promo.isActive ? "success" : "secondary"}>
                    {promo.isActive ? "Đang hoạt động" : "Hết hạn"}
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

export default PromotionsPage;
