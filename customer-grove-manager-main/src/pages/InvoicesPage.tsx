
import { useState } from "react";
import { Invoice } from "@/types";
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
import { Eye, FileText, Printer } from "lucide-react";

const InvoicesPage = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: "INV-001",
      orderId: "ORD-001",
      customerName: "Nguyễn Văn A",
      issueDate: new Date(2023, 6, 15),
      dueDate: new Date(2023, 6, 22),
      totalAmount: 350000,
      amountPaid: 350000,
      status: "paid",
      paymentMethod: "cash"
    },
    {
      id: "INV-002",
      orderId: "ORD-002",
      customerName: "Trần Thị B",
      issueDate: new Date(2023, 6, 16),
      dueDate: new Date(2023, 6, 23),
      totalAmount: 420000,
      amountPaid: 0,
      status: "unpaid"
    },
    {
      id: "INV-003",
      orderId: "ORD-003",
      customerName: "Lê Văn C",
      issueDate: new Date(2023, 6, 17),
      dueDate: new Date(2023, 6, 24),
      totalAmount: 550000,
      amountPaid: 300000,
      status: "partial",
      paymentMethod: "card"
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Quản lý Hóa đơn</h1>
        <Button className="bg-red-600 hover:bg-red-700">
          <FileText className="h-4 w-4 mr-2" />
          Tạo hóa đơn mới
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mã hóa đơn</TableHead>
              <TableHead>Khách hàng</TableHead>
              <TableHead>Ngày phát hành</TableHead>
              <TableHead>Tổng tiền</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">{invoice.id}</TableCell>
                <TableCell>{invoice.customerName}</TableCell>
                <TableCell>{format(invoice.issueDate, "dd/MM/yyyy")}</TableCell>
                <TableCell>{invoice.totalAmount.toLocaleString()} VND</TableCell>
                <TableCell>
                  <Badge 
                    variant={
                      invoice.status === "paid" 
                        ? "success" 
                        : invoice.status === "partial" 
                          ? "warning" 
                          : "destructive"
                    }
                  >
                    {invoice.status === "paid" 
                      ? "Đã thanh toán" 
                      : invoice.status === "partial" 
                        ? "Thanh toán một phần" 
                        : "Chưa thanh toán"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="text-blue-600">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Printer className="h-4 w-4" />
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

export default InvoicesPage;
