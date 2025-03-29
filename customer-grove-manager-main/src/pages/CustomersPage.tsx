
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
  Plus, Search, Edit, Trash2, Eye, Filter, Download 
} from 'lucide-react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Customer, CustomerType, MembershipLevel, Gender } from '@/types';

// Sample data
const dummyCustomers: Customer[] = [
  {
    id: '1',
    name: 'Nguyễn Văn A',
    phone: '0912345678',
    email: 'nguyenvana@example.com',
    address: '123 Đường ABC, Quận 1, TP.HCM',
    gender: 'male',
    birthYear: 1990,
    customerType: 'vip',
    membershipLevel: 'gold',
    createdAt: new Date('2023-01-15'),
    totalOrders: 25
  },
  {
    id: '2',
    name: 'Trần Thị B',
    phone: '0923456789',
    email: 'tranthib@example.com',
    address: '456 Đường XYZ, Quận 2, TP.HCM',
    gender: 'female',
    birthYear: 1985,
    customerType: 'regular',
    membershipLevel: 'silver',
    createdAt: new Date('2023-02-20'),
    totalOrders: 15
  },
  {
    id: '3',
    name: 'Lê Văn C',
    phone: '0934567890',
    email: 'levanc@example.com',
    address: '789 Đường DEF, Quận 3, TP.HCM',
    gender: 'male',
    birthYear: 1995,
    customerType: 'regular',
    membershipLevel: 'bronze',
    createdAt: new Date('2023-03-10'),
    totalOrders: 8
  },
  {
    id: '4',
    name: 'Phạm Thị D',
    phone: '0945678901',
    email: 'phamthid@example.com',
    address: '101 Đường GHI, Quận 4, TP.HCM',
    gender: 'female',
    birthYear: 1992,
    customerType: 'new',
    membershipLevel: 'none',
    createdAt: new Date('2023-05-05'),
    totalOrders: 1
  },
  {
    id: '5',
    name: 'Hoàng Văn E',
    phone: '0956789012',
    email: 'hoangvane@example.com',
    address: '202 Đường JKL, Quận 5, TP.HCM',
    gender: 'male',
    birthYear: 1988,
    customerType: 'vip',
    membershipLevel: 'platinum',
    createdAt: new Date('2023-04-18'),
    totalOrders: 30
  }
];

const getCustomerTypeLabel = (type: CustomerType) => {
  switch(type) {
    case 'vip': return { label: 'VIP', class: 'bg-purple-100 text-purple-800' };
    case 'regular': return { label: 'Thường xuyên', class: 'bg-blue-100 text-blue-800' };
    case 'new': return { label: 'Mới', class: 'bg-green-100 text-green-800' };
    default: return { label: type, class: 'bg-gray-100 text-gray-800' };
  }
};

const getMembershipLabel = (level: MembershipLevel) => {
  switch(level) {
    case 'platinum': return { label: 'Bạch kim', class: 'bg-slate-100 text-slate-800' };
    case 'gold': return { label: 'Vàng', class: 'bg-amber-100 text-amber-800' };
    case 'silver': return { label: 'Bạc', class: 'bg-gray-100 text-gray-800' };
    case 'bronze': return { label: 'Đồng', class: 'bg-orange-100 text-orange-800' };
    case 'none': return { label: 'Không', class: 'bg-gray-100 text-gray-500' };
    default: return { label: level, class: 'bg-gray-100 text-gray-800' };
  }
};

const CustomerForm = ({ customer, onClose, onSave }) => {
  const [formData, setFormData] = useState<Partial<Customer>>(
    customer || {
      name: '',
      phone: '',
      email: '',
      address: '',
      gender: 'male',
      birthYear: undefined,
      customerType: 'regular',
      membershipLevel: 'none',
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Tên khách hàng</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Số điện thoại</Label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="address">Địa chỉ</Label>
          <Input
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="gender">Giới tính</Label>
          <Select 
            name="gender" 
            value={formData.gender} 
            onValueChange={(value) => handleSelectChange('gender', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Chọn giới tính" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Nam</SelectItem>
              <SelectItem value="female">Nữ</SelectItem>
              <SelectItem value="other">Khác</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="birthYear">Năm sinh</Label>
          <Input
            id="birthYear"
            name="birthYear"
            type="number"
            value={formData.birthYear || ''}
            onChange={handleChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="customerType">Loại khách hàng</Label>
          <Select 
            name="customerType" 
            value={formData.customerType} 
            onValueChange={(value) => handleSelectChange('customerType', value as CustomerType)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Chọn loại khách hàng" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="regular">Thường xuyên</SelectItem>
              <SelectItem value="vip">VIP</SelectItem>
              <SelectItem value="new">Mới</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="membershipLevel">Hạng thành viên</Label>
          <Select 
            name="membershipLevel" 
            value={formData.membershipLevel} 
            onValueChange={(value) => handleSelectChange('membershipLevel', value as MembershipLevel)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Chọn hạng thành viên" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="platinum">Bạch kim</SelectItem>
              <SelectItem value="gold">Vàng</SelectItem>
              <SelectItem value="silver">Bạc</SelectItem>
              <SelectItem value="bronze">Đồng</SelectItem>
              <SelectItem value="none">Không</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onClose}>
          Hủy
        </Button>
        <Button type="submit">Lưu</Button>
      </DialogFooter>
    </form>
  );
};

const CustomersPage = () => {
  const [customers, setCustomers] = useState<Customer[]>(dummyCustomers);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState<string | null>(null);

  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.includes(searchQuery) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddCustomer = () => {
    setCurrentCustomer(null);
    setIsDialogOpen(true);
  };

  const handleEditCustomer = (customer: Customer) => {
    setCurrentCustomer(customer);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (customerId: string) => {
    setCustomerToDelete(customerId);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (customerToDelete) {
      setCustomers(customers.filter(c => c.id !== customerToDelete));
      setIsDeleteDialogOpen(false);
      setCustomerToDelete(null);
    }
  };

  const handleSaveCustomer = (formData: Partial<Customer>) => {
    if (currentCustomer) {
      // Update existing customer
      setCustomers(customers.map(c => 
        c.id === currentCustomer.id ? { ...c, ...formData } : c
      ));
    } else {
      // Add new customer
      const newCustomer: Customer = {
        id: (customers.length + 1).toString(),
        ...formData as Omit<Customer, 'id' | 'createdAt' | 'totalOrders'>,
        createdAt: new Date(),
        totalOrders: 0
      };
      setCustomers([...customers, newCustomer]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Quản lý khách hàng</h1>
          <p className="text-gray-500 mt-1">Danh sách khách hàng và thông tin chi tiết</p>
        </div>
        <Button className="mt-4 sm:mt-0" onClick={handleAddCustomer}>
          <Plus className="w-4 h-4 mr-2" />
          Thêm khách hàng
        </Button>
      </div>

      <Card className="p-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Tìm theo tên, số điện thoại, email..."
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

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên khách hàng</TableHead>
                <TableHead>Liên hệ</TableHead>
                <TableHead>Loại khách hàng</TableHead>
                <TableHead>Hạng thành viên</TableHead>
                <TableHead>Đơn hàng</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => {
                  const typeInfo = getCustomerTypeLabel(customer.customerType);
                  const membershipInfo = getMembershipLabel(customer.membershipLevel);
                  
                  return (
                    <TableRow key={customer.id}>
                      <TableCell>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-sm text-gray-500">
                          {customer.address.substring(0, 30)}...
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>{customer.phone}</div>
                        <div className="text-sm text-gray-500">{customer.email}</div>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${typeInfo.class}`}>
                          {typeInfo.label}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${membershipInfo.class}`}>
                          {membershipInfo.label}
                        </span>
                      </TableCell>
                      <TableCell>{customer.totalOrders}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleEditCustomer(customer)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDeleteClick(customer.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                    Không tìm thấy khách hàng nào
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Add/Edit Customer Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {currentCustomer ? 'Chỉnh sửa khách hàng' : 'Thêm khách hàng mới'}
            </DialogTitle>
          </DialogHeader>
          <CustomerForm 
            customer={currentCustomer || undefined} 
            onClose={() => setIsDialogOpen(false)}
            onSave={handleSaveCustomer}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Xác nhận xóa</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Bạn có chắc chắn muốn xóa khách hàng này không? Hành động này không thể hoàn tác.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Hủy
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Xóa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomersPage;
