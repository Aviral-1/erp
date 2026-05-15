"use client";

import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  MapPin, 
  Truck, 
  FileText, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  Trash2,
  Plus,
  Upload,
  X,
  Image as ImageIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';

// Dynamically import map to avoid SSR issues
const MapPicker = dynamic(() => import('./MapPicker'), { 
  ssr: false,
  loading: () => <div className="h-[300px] w-full bg-slate-100 animate-pulse rounded-xl flex items-center justify-center">Loading Map...</div>
});

const formSchema = z.object({
  client_name: z.string().min(2, "Client name is required"),
  contact_person: z.string().min(2, "Contact person is required"),
  mobile: z.string().min(10, "Valid mobile number is required"),
  address: z.string().min(5, "Address is required"),
  latitude: z.number(),
  longitude: z.number(),
  waste_type: z.string().min(1, "Waste type is required"),
  service_frequency: z.string().min(1, "Frequency is required"),
  bin_size: z.string().min(1, "Bin size is required"),
  bin_qty: z.number().min(1),
  assigned_driver: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const steps = [
  { id: 'personal', title: 'Personal Details', icon: User },
  { id: 'location', title: 'Address & GPS', icon: MapPin },
  { id: 'waste', title: 'Waste & Service', icon: Truck },
  { id: 'review', title: 'Review & Submit', icon: CheckCircle2 },
];

export default function CustomerForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [files, setFiles] = useState<File[]>([]);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      latitude: 26.2389,
      longitude: 73.0243,
      bin_qty: 1,
    }
  });

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const onSubmit = (data: FormValues) => {
    console.log("Form Data:", data);
    console.log("Files:", files);
    alert("Customer added successfully!");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles([...files, ...Array.from(e.target.files)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Stepper */}
      <div className="mb-10">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-slate-200 dark:bg-slate-800 -z-10"></div>
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center gap-2 bg-slate-50 dark:bg-slate-950 px-2">
              <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border-2",
                currentStep >= index 
                  ? "bg-primary border-primary text-white shadow-lg shadow-primary/20" 
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400"
              )}>
                <step.icon size={20} />
              </div>
              <span className={cn(
                "text-xs font-bold uppercase tracking-wider hidden sm:block",
                currentStep >= index ? "text-primary" : "text-slate-400"
              )}>
                {step.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      <Card className="border-none shadow-xl bg-white dark:bg-slate-900 overflow-hidden rounded-3xl">
        <CardContent className="p-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <AnimatePresence mode="wait">
              {currentStep === 0 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Client / Apartment Name</Label>
                      <Input {...register("client_name")} placeholder="e.g. Royal Heights Apartment" className="rounded-xl" />
                      {errors.client_name && <p className="text-xs text-red-500">{errors.client_name.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label>Contact Person Name</Label>
                      <Input {...register("contact_person")} placeholder="e.g. Ramesh Sharma" className="rounded-xl" />
                      {errors.contact_person && <p className="text-xs text-red-500">{errors.contact_person.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label>Mobile Number</Label>
                      <Input {...register("mobile")} placeholder="e.g. 9876543210" className="rounded-xl" />
                      {errors.mobile && <p className="text-xs text-red-500">{errors.mobile.message}</p>}
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 1 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <Label>Full Address</Label>
                    <Input {...register("address")} placeholder="Enter complete address" className="rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label>Select GPS Location</Label>
                    <div className="h-[350px] border-2 border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden relative">
                      <MapPicker 
                        lat={watch("latitude")} 
                        lng={watch("longitude")} 
                        onChange={(lat, lng) => {
                          setValue("latitude", lat);
                          setValue("longitude", lng);
                        }} 
                      />
                      <div className="absolute bottom-4 left-4 z-[1000] bg-white/90 dark:bg-slate-900/90 backdrop-blur p-3 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 text-xs font-mono space-y-1">
                        <div>LAT: {watch("latitude").toFixed(6)}</div>
                        <div>LNG: {watch("longitude").toFixed(6)}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Waste Category</Label>
                      <Select onValueChange={(v: string | null) => v && setValue("waste_type", v)}>
                        <SelectTrigger className="rounded-xl">
                          <SelectValue placeholder="Select waste type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Solid">Solid General Waste</SelectItem>
                          <SelectItem value="Organic">Organic / Food Waste</SelectItem>
                          <SelectItem value="Recyclable">Recyclable</SelectItem>
                          <SelectItem value="Hazardous">Hazardous</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Collection Frequency</Label>
                      <Select onValueChange={(v: string | null) => v && setValue("service_frequency", v)}>
                        <SelectTrigger className="rounded-xl">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Daily">Daily</SelectItem>
                          <SelectItem value="Weekly">Weekly</SelectItem>
                          <SelectItem value="On-Call">On-Call</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Bin Size</Label>
                      <Select onValueChange={(v: string | null) => v && setValue("bin_size", v)}>
                        <SelectTrigger className="rounded-xl">
                          <SelectValue placeholder="Select bin size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5 CBM">5 CBM</SelectItem>
                          <SelectItem value="10 CBM">10 CBM</SelectItem>
                          <SelectItem value="20 CBM">20 CBM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Bin Quantity</Label>
                      <Input type="number" {...register("bin_qty", { valueAsNumber: true })} className="rounded-xl" />
                    </div>
                  </div>

                  <div className="space-y-2 pt-4">
                    <Label>Property Images</Label>
                    <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer relative group">
                      <input 
                        type="file" 
                        multiple 
                        onChange={handleFileChange} 
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 group-hover:text-primary transition-colors">
                          <Upload size={24} />
                        </div>
                        <p className="text-sm font-medium">Drag & drop or click to upload</p>
                        <p className="text-xs text-slate-400">PNG, JPG up to 10MB</p>
                      </div>
                    </div>
                    {files.length > 0 && (
                      <div className="grid grid-cols-4 gap-4 mt-4">
                        {files.map((file, i) => (
                          <div key={i} className="relative group aspect-square rounded-xl overflow-hidden border border-slate-200">
                            <img 
                              src={URL.createObjectURL(file)} 
                              alt="preview" 
                              className="w-full h-full object-cover" 
                            />
                            <button 
                              onClick={() => removeFile(i)}
                              className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 space-y-4">
                    <h4 className="font-bold text-lg flex items-center gap-2">
                      <FileText size={20} className="text-primary" />
                      Summary Review
                    </h4>
                    <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-sm">
                      <div className="text-slate-500">Client:</div>
                      <div className="font-semibold">{watch("client_name")}</div>
                      <div className="text-slate-500">Contact:</div>
                      <div className="font-semibold">{watch("contact_person")}</div>
                      <div className="text-slate-500">Mobile:</div>
                      <div className="font-semibold">{watch("mobile")}</div>
                      <div className="text-slate-500">Waste Type:</div>
                      <div className="font-semibold">{watch("waste_type")}</div>
                      <div className="text-slate-500">Frequency:</div>
                      <div className="font-semibold">{watch("service_frequency")}</div>
                    </div>
                  </div>
                  <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-xl flex gap-3 text-emerald-700 dark:text-emerald-400 text-sm">
                    <CheckCircle2 size={18} className="shrink-0" />
                    <p>Double check all information before submitting. This will create a new collection job and assign it to the next available route.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center justify-between mt-10 pt-6 border-t border-slate-100 dark:border-slate-800">
              <Button
                type="button"
                variant="ghost"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="rounded-xl gap-2"
              >
                <ChevronLeft size={18} />
                Back
              </Button>
              {currentStep < steps.length - 1 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="rounded-xl gap-2 shadow-lg shadow-primary/20"
                >
                  Next Step
                  <ChevronRight size={18} />
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="rounded-xl gap-2 bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-200 dark:shadow-none"
                >
                  Create Customer
                  <CheckCircle2 size={18} />
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
