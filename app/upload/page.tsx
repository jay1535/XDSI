"use client"

import { useState, useCallback } from 'react';
import { useAuth } from '@/components/auth-provider';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { useDropzone } from 'react-dropzone';
import { 
  Upload, 
  FileText, 
  X, 
  CreditCard,
  Calculator,
  File
} from 'lucide-react';

interface PrintSettings {
  color: boolean;
  pageRange: string;
  copies: number;
  binding: string;
}

interface UploadedFile {
  file: File;
  pages: number;
  preview: string;
}

export default function UploadPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [settings, setSettings] = useState<PrintSettings>({
    color: false,
    pageRange: 'all',
    copies: 1,
    binding: 'none'
  });
  const [customPageRange, setCustomPageRange] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setIsUploading(true);
      // Simulate file processing
      setTimeout(() => {
        const mockPages = Math.floor(Math.random() * 50) + 1;
        setUploadedFile({
          file,
          pages: mockPages,
          preview: URL.createObjectURL(file)
        });
        setIsUploading(false);
        toast.success(`File uploaded successfully! Detected ${mockPages} pages.`);
      }, 2000);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/msword': ['.doc']
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024 // 10MB
  });

  if (!user && !loading) {
    router.push('/auth/login');
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const calculateCost = () => {
    if (!uploadedFile) return 0;

    const effectivePages = settings.pageRange === 'all' 
      ? uploadedFile.pages 
      : customPageRange.split(',').length;
    
    const pageRate = settings.color ? 5 : 2;
    const bindingCost = settings.binding === 'none' ? 0 : 25;
    
    return (effectivePages * pageRate * settings.copies) + bindingCost;
  };

  const handleProceedToPayment = () => {
    if (!uploadedFile) return;
    
    const orderData = {
      file: uploadedFile.file.name,
      pages: uploadedFile.pages,
      settings,
      cost: calculateCost()
    };
    
    // In a real app, this would create an order and redirect to payment
    toast.success('Proceeding to payment...');
    console.log('Order data:', orderData);
    
    // Simulate payment redirect
    setTimeout(() => {
      router.push('/dashboard');
      toast.success('Order placed successfully!');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Document</h1>
          <p className="text-gray-600">Upload your document and configure print settings</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* File Upload */}
            <Card>
              <CardHeader>
                <CardTitle>Upload Document</CardTitle>
                <CardDescription>
                  Upload PDF or DOCX files up to 10MB
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!uploadedFile ? (
                  <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                      isDragActive 
                        ? 'border-blue-400 bg-blue-50' 
                        : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                    }`}
                  >
                    <input {...getInputProps()} />
                    {isUploading ? (
                      <div className="space-y-4">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="text-gray-600">Processing document...</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                        <div>
                          <p className="text-lg font-medium text-gray-900">
                            {isDragActive ? 'Drop the file here' : 'Drag & drop your document'}
                          </p>
                          <p className="text-gray-600">or click to browse files</p>
                        </div>
                        <p className="text-sm text-gray-500">
                          Supports PDF, DOC, DOCX (max 10MB)
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <File className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{uploadedFile.file.name}</p>
                          <p className="text-sm text-gray-600">
                            {uploadedFile.pages} pages • {(uploadedFile.file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setUploadedFile(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Print Settings */}
            {uploadedFile && (
              <Card>
                <CardHeader>
                  <CardTitle>Print Settings</CardTitle>
                  <CardDescription>
                    Configure your print preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Color Setting */}
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="color" 
                      checked={settings.color}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({ ...prev, color: checked as boolean }))
                      }
                    />
                    <Label htmlFor="color" className="font-medium">
                      Color Printing (+₹3 per page)
                    </Label>
                  </div>

                  {/* Page Range */}
                  <div className="space-y-3">
                    <Label className="font-medium">Page Range</Label>
                    <Select 
                      value={settings.pageRange}
                      onValueChange={(value) => 
                        setSettings(prev => ({ ...prev, pageRange: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Pages (1-{uploadedFile.pages})</SelectItem>
                        <SelectItem value="custom">Custom Range</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    {settings.pageRange === 'custom' && (
                      <div className="space-y-2">
                        <Input
                          placeholder="e.g., 1-3, 5, 7-9"
                          value={customPageRange}
                          onChange={(e) => setCustomPageRange(e.target.value)}
                        />
                        <p className="text-xs text-gray-500">
                          Enter page numbers separated by commas. Use hyphens for ranges.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Number of Copies */}
                  <div className="space-y-2">
                    <Label htmlFor="copies" className="font-medium">Number of Copies</Label>
                    <Input
                      id="copies"
                      type="number"
                      min="1"
                      max="100"
                      value={settings.copies}
                      onChange={(e) => 
                        setSettings(prev => ({ ...prev, copies: parseInt(e.target.value) || 1 }))
                      }
                    />
                  </div>

                  {/* Binding Options */}
                  <div className="space-y-2">
                    <Label className="font-medium">Binding</Label>
                    <Select 
                      value={settings.binding}
                      onValueChange={(value) => 
                        setSettings(prev => ({ ...prev, binding: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No Binding</SelectItem>
                        <SelectItem value="spiral">Spiral Binding (+₹25)</SelectItem>
                        <SelectItem value="soft">Soft Binding (+₹25)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calculator className="h-5 w-5 mr-2" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {uploadedFile ? (
                  <>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Document:</span>
                        <span className="font-medium">{uploadedFile.file.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Pages:</span>
                        <span>{uploadedFile.pages}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Copies:</span>
                        <span>{settings.copies}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Color:</span>
                        <span>{settings.color ? 'Yes' : 'No'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Binding:</span>
                        <span>{settings.binding === 'none' ? 'None' : settings.binding}</span>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Pages ({settings.color ? '₹5' : '₹2'} each):</span>
                        <span>₹{(uploadedFile.pages * (settings.color ? 5 : 2) * settings.copies)}</span>
                      </div>
                      {settings.binding !== 'none' && (
                        <div className="flex justify-between">
                          <span>Binding:</span>
                          <span>₹25</span>
                        </div>
                      )}
                    </div>

                    <Separator />

                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total:</span>
                      <span className="text-blue-600">₹{calculateCost()}</span>
                    </div>

                    <Button 
                      className="w-full" 
                      size="lg"
                      onClick={handleProceedToPayment}
                    >
                      <CreditCard className="mr-2 h-4 w-4" />
                      Proceed to Payment
                    </Button>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Upload a document to see pricing</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}