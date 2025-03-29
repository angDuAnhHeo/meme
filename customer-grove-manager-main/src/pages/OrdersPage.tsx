
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter 
} from '@/components/ui/dialog';
import { 
  Plus, Search, Edit, Trash2, Eye, Filter, Download, ShoppingCart
} from 'lucide-react';
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from '@/components/ui/tabs';
import { Order, OrderStatus } from '@/types';

// Sample data
const dummyOrders: Order[] = [
  {
    id: 'ORD001',
    customerId: '1',
    customerName: 'Nguyễn Văn A',
    status: 'ready',
    items: [
      { id: 'ITEM1', serviceName: 'Giặt thường', quantity: 5, unitPrice: 30000, total: 150000 },
      { id: 'ITEM2', serviceName: 'Là ủi', quantity: 3, unitPrice: 15000, total: 45000 }
    ],
    totalAmount: 195000,
    createdAt: new Date('2023-06-10T09:30:00'),
    estimatedCompletion: new Date('2023-06-12T15:00:00'),
    shelfPosition: 'A-12',
    note: 'Khách hàng VIP, giao hàng tận nơi'
  },
  {
    id: 'ORD002',
    customerId: '2',
    customerName: 'Trần Thị B',
    status: 'washing',
    items: [
      { id: 'ITEM3', serviceName: 'Giặt hấp', quantity: 2, unitPrice: 50000, total: 100000 }
    ],
    totalAmount: 100000,
    createdAt: new Date('2023-06-11T11:15:00'),
    estimatedCompletion: new Date('2023-06-13T12:00:00')
  },
  {
    id: 'ORD003',
    customerId: '3',
    customerName: 'Lê Văn C',
    status: 'pending',
    items: [
      { id: 'ITEM4', serviceName: 'Giặt khô', quantity: 1, unitPrice: 70000, total: 70000 },
      { id: 'ITEM5', serviceName: 'Giặt thảm', quantity: 1, unitPrice: 120000, total: 120000 }
    ],
    totalAmount: 190000,
    createdAt: new Date('2023-06-11T14:45:00'),
    estimatedCompletion: new Date('2023-06-14T10:00:00'),
    note: 'Cẩn thận với áo trắng'
  },
  {
    id: 'ORD004',
    customerId: '4',
    customerName: 'Phạm Thị D',
    status: 'delivered',
    items: [
      { id: 'ITEM6', serviceName: 'Giặt thường', quantity: 8, unitPrice: 30000, total: 240000 }
    ],
    totalAmount: 240000,
    createdAt: new Date('2023-06-09T08:20:00'),
    estimatedCompletion: new Date('2023-06-11T09:00:00'),
    shelfPosition: 'C-05'
  },
  {
    id: 'ORD005',
    customerId: '5',
    customerName: 'Hoàng Văn E',
    status: 'folding',
    items: [
      { id: 'ITEM7', serviceName: 'Giặt hấp', quantity: 3, unitPrice: 50000, total: 150000 },
      { id: 'ITEM8', serviceName: 'Là ủi', quantity: 5, unitPrice: 15000, total: 75000 }
    ],
    totalAmount: 225000,
    createdAt: new Date('2023-06-10T15:10:00'),
    estimatedCompletion: new Date('2023-06-12T18:00:00'),
    shelfPosition: 'B-08'
  }
];

const getStatusInfo = (status: OrderStatus) => {
  switch(status) {
    case 'pending': return { label: 'Chờ xử lý', class: 'bg-yellow-100 text-yellow-800' };
    case 'processing': return { label: 'Đang xử lý', class: 'bg-blue-100 text-blue-800' };
    case 'washing': return { label: 'Đang giặt', class: 'bg-indigo-100 text-indigo-800' };
    case 'drying': return { label: 'Đang sấy', class: 'bg-purple-100 text-purple-800' };
    case 'folding': return { label: 'Đang gấp', class: 'bg-pink-100 text-pink-800' };
    case 'ready': return { label: 'Sẵn sàng giao', class: 'bg-green-100 text-green-800' };
    case 'delivered': return { label: 'Đã giao', class: 'bg-gray-100 text-gray-800' };
    case 'cancelled': return { label: 'Đã hủy', class: 'bg-red-100 text-red-800' };
    default: return { label: status, class: 'bg-gray-100 text-gray-800' };
  }
};

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>(dummyOrders);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<string>('all');

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    return matchesSearch && order.status === activeTab;
  });

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Quản lý đơn hàng</h1>
          <p className="text-gray-500 mt-1">Danh sách đơn hàng và trạng thái xử lý</p>
        </div>
        <Button className="mt-4 sm:mt-0">
          <Plus className="w-4 h-4 mr-2" />
          Tạo đơn hàng
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Tổng đơn hàng</p>
            <p className="text-2xl font-bold">{orders.length}</p>
          </div>
          <div className="p-3 bg-blue-100 rounded-full">
            <ShoppingCart className="w-5 h-5 text-blue-600" />
          </div>
        </Card>
        
        <Card className="p-4 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Đang xử lý</p>
            <p className="text-2xl font-bold">
              {orders.filter(o => ['pending', 'processing', 'washing', 'drying', 'folding'].includes(o.status)).length}
            </p>
          </div>
          <div className="p-3 bg-yellow-100 rounded-full">
            <ShoppingCart className="w-5 h-5 text-yellow-600" />
          </div>
        </Card>
        
        <Card className="p-4 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Sẵn sàng giao</p>
            <p className="text-2xl font-bold">
              {orders.filter(o => o.status === 'ready').length}
            </p>
          </div>
          <div className="p-3 bg-green-100 rounded-full">
            <ShoppingCart className="w-5 h-5 text-green-600" />
          </div>
        </Card>
        
        <Card className="p-4 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Đã hoàn thành</p>
            <p className="text-2xl font-bold">
              {orders.filter(o => o.status === 'delivered').length}
            </p>
          </div>
          <div className="p-3 bg-gray-100 rounded-full">
            <ShoppingCart className="w-5 h-5 text-gray-600" />
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">Tất cả</TabsTrigger>
            <TabsTrigger value="pending">Chờ xử lý</TabsTrigger>
            <TabsTrigger value="washing">Đang giặt</TabsTrigger>
            <TabsTrigger value="ready">Sẵn sàng giao</TabsTrigger>
            <TabsTrigger value="delivered">Đã giao</TabsTrigger>
          </TabsList>
          
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Tìm theo mã đơn hàng, tên khách hàng..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Filter size={18} />
              </Button>
              <Button variant="outline" size="icon">
                <Download size={18} />
              </Button>
            </div>
          </div>

          <TabsContent value={activeTab} className="m-0">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mã đơn</TableHead>
                    <TableHead>Khách hàng</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Vị trí kệ</TableHead>
                    <TableHead>Ngày tạo</TableHead>
                    <TableHead>Tổng tiền</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => {
                      const statusInfo = getStatusInfo(order.status);
                      
                      return (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>
                            <div>{order.customerName}</div>
                            <div className="text-xs text-gray-500">
                              ID: {order.customerId}
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs ${statusInfo.class}`}>
                              {statusInfo.label}
                            </span>
                          </TableCell>
                          <TableCell>
                            {order.shelfPosition || '-'}
                          </TableCell>
                          <TableCell>
                            <div>{formatDate(order.createdAt)}</div>
                            <div className="text-xs text-gray-500">
                              Dự kiến: {formatDate(order.estimatedCompletion)}
                            </div>
                          </TableCell>
                          <TableCell>
                            {formatCurrency(order.totalAmount)}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                        Không tìm thấy đơn hàng nào
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default OrdersPage;
