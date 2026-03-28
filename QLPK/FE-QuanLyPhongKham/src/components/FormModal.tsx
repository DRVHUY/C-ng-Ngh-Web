import React, { useEffect, useState } from 'react';

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'number' | 'date' | 'select' | 'textarea' | 'tel' | 'autocomplete';
  required?: boolean;
  placeholder?: string;
  options?: { value: string | number; label: string }[];
  validation?: (value: any) => string | null;
  suggestions?: (string | number)[];  // Dùng cho autocomplete
  disabled?: boolean;  // Vô hiệu hóa field
}

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  title: string;
  fields: FormField[];
  initialData?: Record<string, any>;
  loading?: boolean;
}

const FormModal: React.FC<FormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  title,
  fields,
  initialData,
  loading = false,
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [suggestions, setSuggestions] = useState<Record<string, (string | number)[]>>({});
  const [openSuggestions, setOpenSuggestions] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      const newData: Record<string, any> = {};
      fields.forEach((field) => {
        newData[field.name] = '';
      });
      setFormData(newData);
    }
    setErrors({});

    // Cập nhật suggestions từ fields
    const newSuggestions: Record<string, (string | number)[]> = {};
    fields.forEach((field) => {
      if (field.suggestions) {
        newSuggestions[field.name] = field.suggestions;
      }
    });
    setSuggestions(newSuggestions);
  }, [initialData, isOpen, fields]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }

    // Hiển thị suggestions khi có input cho field autocomplete
    if (suggestions[name]) {
      setOpenSuggestions((prev) => ({
        ...prev,
        [name]: value.length > 0,
      }));
    }
  };

  const handleSuggestionClick = (fieldName: string, suggestion: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: suggestion,
    }));
    setOpenSuggestions((prev) => ({
      ...prev,
      [fieldName]: false,
    }));
  };

  const filteredSuggestions = (fieldName: string): (string | number)[] => {
    const value = formData[fieldName] || '';
    const allSuggestions = suggestions[fieldName] || [];
    if (!value) return allSuggestions;
    return allSuggestions.filter((s) =>
      s.toString().toLowerCase().includes(value.toString().toLowerCase())
    );
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    fields.forEach((field) => {
      const value = formData[field.name];

      if (field.required && (!value || value.toString().trim() === '')) {
        newErrors[field.name] = `${field.label} là bắt buộc`;
        return;
      }

      // Custom validation
      if (field.validation && value) {
        const error = field.validation(value);
        if (error) {
          newErrors[field.name] = error;
        }
      }

      if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          newErrors[field.name] = 'Email không hợp lệ';
        }
      }

      if (field.type === 'number' && value) {
        if (isNaN(Number(value))) {
          newErrors[field.name] = 'Phải là số';
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave(formData);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        className="modal-content"
        style={{
          background: 'white',
          padding: '30px',
          borderRadius: '8px',
          maxWidth: '500px',
          width: '90%',
          maxHeight: '80vh',
          overflowY: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 style={{ marginTop: 0, marginBottom: '20px' }}>{title}</h3>

        {fields.map((field) => (
          <div key={field.name} style={{ marginBottom: '15px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '5px',
                fontWeight: 'bold',
                fontSize: '14px',
              }}
            >
              {field.label}
              {field.required && <span style={{ color: 'red' }}> *</span>}
            </label>

            {field.type === 'select' ? (
              <select
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
                disabled={field.disabled}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: errors[field.name] ? '2px solid red' : '1px solid #ddd',
                  borderRadius: '4px',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit',
                  opacity: field.disabled ? 0.6 : 1,
                  cursor: field.disabled ? 'not-allowed' : 'pointer',
                }}
              >
                <option value="">-- Chọn --</option>
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : field.type === 'textarea' ? (
              <textarea
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
                placeholder={field.placeholder}
                disabled={field.disabled}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: errors[field.name] ? '2px solid red' : '1px solid #ddd',
                  borderRadius: '4px',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit',
                  height: '80px',
                  resize: 'vertical',
                  opacity: field.disabled ? 0.6 : 1,
                  cursor: field.disabled ? 'not-allowed' : 'pointer',
                }}
              />
            ) : field.type === 'autocomplete' ? (
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  disabled={field.disabled}
                  onFocus={() =>
                    setOpenSuggestions((prev) => ({
                      ...prev,
                      [field.name]: formData[field.name]?.length >= 0,
                    }))
                  }
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: errors[field.name] ? '2px solid red' : '1px solid #ddd',
                    borderRadius: '4px',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit',
                    opacity: field.disabled ? 0.6 : 1,
                    cursor: field.disabled ? 'not-allowed' : 'text',
                  }}
                />
                {openSuggestions[field.name] && filteredSuggestions(field.name).length > 0 && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      right: 0,
                      backgroundColor: 'white',
                      border: '1px solid #ddd',
                      borderTop: 'none',
                      borderRadius: '0 0 4px 4px',
                      maxHeight: '200px',
                      overflowY: 'auto',
                      zIndex: 1001,
                    }}
                  >
                    {filteredSuggestions(field.name).map((suggestion) => (
                      <div
                        key={suggestion}
                        onClick={() => handleSuggestionClick(field.name, suggestion)}
                        style={{
                          padding: '8px 12px',
                          cursor: 'pointer',
                          borderBottom: '1px solid #f0f0f0',
                          backgroundColor: 'white',
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLDivElement).style.backgroundColor = '#f5f5f5';
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLDivElement).style.backgroundColor = 'white';
                        }}
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
                placeholder={field.placeholder}
                disabled={field.disabled}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: errors[field.name] ? '2px solid red' : '1px solid #ddd',
                  borderRadius: '4px',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit',
                  opacity: field.disabled ? 0.6 : 1,
                  cursor: field.disabled ? 'not-allowed' : 'text',
                }}
              />
            )}

            {errors[field.name] && (
              <div style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
                {errors[field.name]}
              </div>
            )}
          </div>
        ))}

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
          <button
            onClick={onClose}
            disabled={loading}
            style={{
              padding: '8px 16px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              backgroundColor: '#f5f5f5',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1,
            }}
          >
            Hủy
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            style={{
              padding: '8px 16px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? 'Đang lưu...' : 'Lưu'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormModal;