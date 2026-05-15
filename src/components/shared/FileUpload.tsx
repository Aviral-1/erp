"use client";

import React, { useState } from 'react';
import { Upload, X, FileText, Image as ImageIcon, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export function FileUpload() {
  const [files, setFiles] = useState<{file: File, progress: number, status: 'uploading' | 'completed'}[]>([]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map(f => ({
        file: f,
        progress: 0,
        status: 'uploading' as const
      }));
      setFiles([...files, ...newFiles]);

      // Simulate progress
      newFiles.forEach((_, i) => {
        let p = 0;
        const interval = setInterval(() => {
          p += Math.random() * 30;
          if (p >= 100) {
            p = 100;
            clearInterval(interval);
            setFiles(prev => {
              const updated = [...prev];
              updated[files.length + i].progress = 100;
              updated[files.length + i].status = 'completed';
              return updated;
            });
          } else {
            setFiles(prev => {
              const updated = [...prev];
              updated[files.length + i].progress = p;
              return updated;
            });
          }
        }, 300);
      });
    }
  };

  return (
    <Card className="border-none shadow-md bg-white dark:bg-slate-900">
      <CardContent className="p-6">
        <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-10 text-center hover:border-primary/50 transition-all cursor-pointer relative group bg-slate-50/50 dark:bg-slate-800/30">
          <input 
            type="file" 
            multiple 
            onChange={handleUpload} 
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
              <Upload size={32} />
            </div>
            <div>
              <p className="text-base font-bold text-slate-900 dark:text-white">Click or drag files to upload</p>
              <p className="text-sm text-slate-500 mt-1">Support for Documents, Images, and KYC PDFs</p>
            </div>
          </div>
        </div>

        {files.length > 0 && (
          <div className="mt-8 space-y-4">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Uploading Files</p>
            <AnimatePresence>
              {files.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl flex items-center gap-4 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                    {item.file.type.includes('image') ? <ImageIcon size={20} /> : <FileText size={20} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between mb-1">
                      <p className="text-sm font-semibold truncate pr-4">{item.file.name}</p>
                      <span className="text-xs font-bold text-slate-400">{Math.round(item.progress)}%</span>
                    </div>
                    <Progress value={item.progress} className="h-1.5" />
                  </div>
                  <div className="shrink-0">
                    {item.status === 'completed' ? (
                      <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                        <CheckCircle2 size={16} />
                      </div>
                    ) : (
                      <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full text-slate-400">
                        <X size={16} />
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

import { Card, CardContent } from '@/components/ui/card';
