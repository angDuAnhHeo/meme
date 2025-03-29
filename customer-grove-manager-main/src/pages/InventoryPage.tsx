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
  Plus, Search, Edit, Package, AlertTriangle, ArrowUpDown, Filter, RefreshCw
} from 'lucide-react';
import { InventoryItem } from '@/types';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const dummyInventory: InventoryItem[] = [
  {
    id: 'INV001',
    name: 'Bột giặt cao cấp',
    category: 'Hóa chất',
    quantity: 120,
    unit: 'kg',
    minQuantity: 50,
    lastRestocked: new Date('2023-05-10')
  },
  {
    id: 'INV002',
    name: 'Nước xả vải hương lavender',
    category: 'Hóa chất',
    quantity: 85,
    unit: 'lít',
    minQuantity: 40,
    lastRestocked: new Date('2023-05-15')
  },
  {
    id: 'INV003',
    name: 'Túi đựng quần áo',
    category: 'Vật tư',
    quantity: 500,
    unit: 'cái',
    minQuantity: 200,
    lastRestocked: new Date('2023-04-28')
  },
  {
    id: 'INV004',
    name: 'Móc áo nhựa',
    category: 'Vật tư',
    quantity: 350,
    unit: 'cái',
    minQuantity: 150,
    lastRestocked: new Date('2023-05-20')
  },
  {
    id: 'INV005',
    name: 'Xà phòng tẩy vết bẩn',
    category: 'Hóa chất',
    quantity: 30,
    unit: 'chai',
    minQuantity: 25,
    lastRestocked: new Date('2023-05-05')
  },
  {
    id: 'INV006',
    name: 'Khăn lau máy giặt',
    category: 'Vật tư',
    quantity: 45,
    unit: 'cái',
    minQuantity: 20,
    lastRestocked: new Date('2023-04-15')
  }
];

const InventoryForm = ({ item, onClose, onSave }) => {
  const [formData, setFormData] = useState<Partial<InventoryItem>>(
    item || {
      name: '',
      category: 'Hóa chất',
      quantity: 0,
      unit: 'cái',
      minQuantity: 0,
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: Number(value) }));
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
          <Label htmlFor="name">Tên vật tư</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="category">Danh mục</Label>
          <Select 
            value={formData.category} 
            onValueChange={(value) => handleSelectChange('category', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Chọn danh mục" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Hóa chất">Hóa chất</SelectItem>
              <SelectItem value="Vật tư">Vật tư</SelectItem>
              <SelectItem value="Thiết bị">Thiết bị</SelectItem>
              <SelectItem value="Khác">Khác</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="quantity">Số lượng</Label>
          <Input
            id="quantity"
            name="quantity"
            type="number"
            value={formData.quantity}
            onChange={handleNumberChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="unit">Đơn vị</Label>
          <Select 
            value={formData.unit} 
            onValueChange={(value) => handleSelectChange('unit', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Chọn đơn vị" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cái">Cái</SelectItem>
              <SelectItem value="kg">Kg</SelectItem>
              <SelectItem value="lít">Lít</SelectItem>
              <SelectItem value="chai">Chai</SelectItem>
              <SelectItem value="hộp">Hộp</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="minQuantity">Số lượng tối thiểu</Label>
          <Input
            id="minQuantity"
            name="minQuantity"
            type="number"
            value={formData.minQuantity}
            onChange={handleNumberChange}
            required
          />
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

const RestockForm = ({ item, onClose, onRestock }) => {
  const [quantity, setQuantity] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRestock(item.id, quantity);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <p className="mb-2">Nhập số lượng để nhập thêm vào kho:</p>
        <div className="space-y-2">
          <Label htmlFor="restockQuantity">Số lượng ({item.unit})</Label>
          <Input
            id="restockQuantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min={1}
            required
          />
        </div>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onClose}>
          Hủy
        </Button>
        <Button type="submit">Nhập kho</Button>
      </DialogFooter>
    </form>
  );
};

const InventoryPage = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>(dummyInventory);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isRestockDialogOpen, setIsRestockDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<InventoryItem | null>(null);
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredInventory = inventory
    .filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortField) return 0;
      
      const compareA = a[sortField];
      const compareB = b[sortField];
      
      if (typeof compareA === 'string' && typeof compareB === 'string') {
        return sortDirection === 'asc' 
          ? compareA.localeCompare(compareB)
          : compareB.localeCompare(compareA);
      } else {
        return sortDirection === 'asc'
          ? (compareA as number) - (compareB as number)
          : (compareB as number) - (compareA as number);
      }
    });

  const handleAddItem = () => {
    setCurrentItem(null);
    setIsDialogOpen(true);
  };

  const handleEditItem = (item: InventoryItem) => {
    setCurrentItem(item);
    setIsDialogOpen(true);
  };

  const handleRestockItem = (item: InventoryItem) => {
    setCurrentItem(item);
    setIsRestockDialogOpen(true);
  };

  const handleSaveItem = (formData: Partial<InventoryItem>) => {
    if (currentItem) {
      setInventory(inventory.map(item => 
        item.id === currentItem.id ? { ...item, ...formData } : item
      ));
    } else {
      const newItem: InventoryItem = {
        id: `INV${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
        ...formData as Omit<InventoryItem, 'id' | 'lastRestocked'>,
        lastRestocked: new Date()
      };
      setInventory([...inventory, newItem]);
    }
  };

  const handleRestock = (itemId: string, quantity: number) => {
    setInventory(inventory.map(item => 
      item.id === itemId 
        ? { 
            ...item, 
            quantity: item.quantity + quantity,
            lastRestocked: new Date()
          } 
        : item
    ));
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  const calculateStockPercentage = (quantity: number, minQuantity: number) => {
    if (minQuantity === 0) return 100;
    const ratio = quantity / (minQuantity * 2);
    return Math.min(Math.max(ratio * 100, 0), 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Quản lý kho hàng</h1>
          <p className="text-gray-500 mt-1">Theo dõi vật tư và tình trạng tồn kho</p>
        </div>
        <Button className="mt-4 sm:mt-0" onClick={handleAddItem}>
          <Plus className="w-4 h-4 mr-2" />
          Thêm vật tư
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="p-4 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Tổng mặt hàng</p>
            <p className="text-2xl font-bold">{inventory.length}</p>
          </div>
          <div className="p-3 bg-blue-100 rounded-full">
            <Package className="w-5 h-5 text-blue-600" />
          </div>
        </Card>
        
        <Card className="p-4 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Cần nhập thêm</p>
            <p className="text-2xl font-bold">
              {inventory.filter(item => item.quantity <= item.minQuantity).length}
            </p>
          </div>
          <div className="p-3 bg-red-100 rounded-full">
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
        </Card>
        
        <Card className="p-4 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Danh mục</p>
            <p className="text-2xl font-bold">
              {new Set(inventory.map(item => item.category)).size}
            </p>
          </div>
          <div className="p-3 bg-green-100 rounded-full">
            <Package className="w-5 h-5 text-green-600" />
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Tìm kiếm vật tư..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Filter size={18} />
            </Button>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead onClick={() => handleSort('name')} className="cursor-pointer">
                  <div className="flex items-center">
                    Tên vật tư
                    {sortField === 'name' && (
                      <ArrowUpDown size={16} className="ml-2" />
                    )}
                  </div>
                </TableHead>
                <TableHead onClick={() => handleSort('category')} className="cursor-pointer">
                  <div className="flex items-center">
                    Danh mục
                    {sortField === 'category' && (
                      <ArrowUpDown size={16} className="ml-2" />
                    )}
                  </div>
                </TableHead>
                <TableHead onClick={() => handleSort('quantity')} className="cursor-pointer">
                  <div className="flex items-center">
                    Số lượng
                    {sortField === 'quantity' && (
                      <ArrowUpDown size={16} className="ml-2" />
                    )}
                  </div>
                </TableHead>
                <TableHead>Tình trạng</TableHead>
                <TableHead>Cập nhật cuối</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInventory.length > 0 ? (
                filteredInventory.map((item) => {
                  const stockPercentage = calculateStockPercentage(item.quantity, item.minQuantity);
                  const isLow = item.quantity <= item.minQuantity;
                  
                  return (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-xs text-gray-500">{item.id}</div>
                      </TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>
                        <div className="font-medium">
                          {item.quantity} {item.unit}
                        </div>
                        <div className="text-xs text-gray-500">
                          Tối thiểu: {item.minQuantity} {item.unit}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="w-full">
                          <Progress 
                            value={stockPercentage} 
                            className={cn("h-2", isLow ? "bg-red-100" : "bg-gray-100")}
                          />
                          <div className="text-xs mt-1">
                            {isLow ? (
                              <span className="text-red-500">Cần nhập thêm</span>
                            ) : (
                              <span className="text-green-500">Đủ hàng</span>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {formatDate(item.lastRestocked)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleRestockItem(item)}
                          >
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleEditItem(item)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                    Không tìm thấy vật tư nào
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {currentItem ? 'Chỉnh sửa vật tư' : 'Thêm vật tư mới'}
            </DialogTitle>
          </DialogHeader>
          <InventoryForm 
            item={currentItem || undefined} 
            onClose={() => setIsDialogOpen(false)}
            onSave={handleSaveItem}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isRestockDialogOpen} onOpenChange={setIsRestockDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Nhập kho</DialogTitle>
          </DialogHeader>
          {currentItem && (
            <RestockForm 
              item={currentItem} 
              onClose={() => setIsRestockDialogOpen(false)}
              onRestock={handleRestock}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InventoryPage;
