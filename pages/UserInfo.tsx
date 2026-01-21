import React, { useState } from 'react';
import { TRANSLATIONS } from '../constants';
import { Language, UserInfo as IUserInfo } from '../types';

interface Props {
  language: Language;
  onSubmit: (info: IUserInfo) => void;
}

export const UserInfo: React.FC<Props> = ({ language, onSubmit }) => {
  const t = TRANSLATIONS[language];
  const [formData, setFormData] = useState<IUserInfo>({
    name: '',
    email: '',
    organization: '',
    size: '',
    industry: '',
    country: '',
    jobTitle: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const inputClass = "w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none";
  const labelClass = "block text-sm font-medium text-slate-700 mb-1";
  const isRtl = language === 'ar';

  return (
    <div className={`max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-slate-100 ${isRtl ? 'font-arabic' : ''}`}>
      <h2 className="text-2xl font-bold mb-6">{t.personalInfo}</h2>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className={labelClass}>{isRtl ? 'الاسم' : 'Full Name'}</label>
          <input required name="name" value={formData.name} onChange={handleChange} className={inputClass} />
        </div>
        
        <div className="md:col-span-2">
          <label className={labelClass}>{isRtl ? 'البريد الإلكتروني' : 'Email Address'}</label>
          <input required type="email" name="email" value={formData.email} onChange={handleChange} className={inputClass} />
        </div>

        <div>
           <label className={labelClass}>{isRtl ? 'المؤسسة' : 'Organization'}</label>
           <input required name="organization" value={formData.organization} onChange={handleChange} className={inputClass} />
        </div>

        <div>
           <label className={labelClass}>{isRtl ? 'المسمى الوظيفي' : 'Job Title'}</label>
           <input required name="jobTitle" value={formData.jobTitle} onChange={handleChange} className={inputClass} />
        </div>

        <div>
           <label className={labelClass}>{isRtl ? 'الصناعة' : 'Industry'}</label>
           <select required name="industry" value={formData.industry} onChange={handleChange} className={inputClass}>
              <option value="">{isRtl ? 'اختر...' : 'Select...'}</option>
              <option value="Finance">Finance</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Retail">Retail</option>
              <option value="Technology">Technology</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Government">Government</option>
              <option value="Other">Other</option>
           </select>
        </div>

        <div>
           <label className={labelClass}>{isRtl ? 'حجم المؤسسة' : 'Organization Size'}</label>
           <select required name="size" value={formData.size} onChange={handleChange} className={inputClass}>
              <option value="">{isRtl ? 'اختر...' : 'Select...'}</option>
              <option value="1-50">1-50</option>
              <option value="51-200">51-200</option>
              <option value="201-1000">201-1000</option>
              <option value="1000+">1000+</option>
           </select>
        </div>
        
        <div className="md:col-span-2">
          <button type="submit" className="w-full bg-brand-600 text-white py-3 rounded-lg font-medium hover:bg-brand-700 transition-colors">
            {t.next}
          </button>
        </div>
      </form>
    </div>
  );
};
