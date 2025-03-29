
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

interface LoginPageProps {
  onLogin: (email: string, role: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Simple validation
    if (!email || !password) {
      setError('Vui lòng nhập đầy đủ thông tin');
      setIsLoading(false);
      return;
    }
    
    // Demo credentials
    setTimeout(() => {
      if (
        (email === 'admin@example.com' && password === 'admin123') ||
        (email === 'manager1@example.com' && password === 'manager123') ||
        (email === 'staff1@example.com' && password === 'staff123')
      ) {
        let role = 'staff';
        if (email === 'admin@example.com') role = 'admin';
        if (email === 'manager1@example.com') role = 'manager';
        
        toast({
          title: "Đăng nhập thành công",
          description: `Chào mừng quay trở lại, ${role}!`,
        });
        
        onLogin(email, role);
        navigate('/');
      } else {
        setError('Email hoặc mật khẩu không đúng');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-3xl font-bold text-red-600">Đăng Nhập</CardTitle>
            <CardDescription className="text-gray-600">
              Hệ thống quản lý giặt sấy
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                  {error}
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Mật khẩu</Label>
                  <Button type="button" variant="link" className="p-0 h-auto text-sm">
                    Quên mật khẩu?
                  </Button>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
            </CardContent>
            
            <CardFooter>
              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={isLoading}>
                {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
              </Button>
            </CardFooter>
          </form>
        </Card>
        
        <div className="text-center mt-6 text-sm text-gray-600">
          <p className="mb-2">Tài khoản demo:</p>
          <p>Admin: admin@example.com / admin123</p>
          <p>Quản lý: manager1@example.com / manager123</p>
          <p>Nhân viên: staff1@example.com / staff123</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
