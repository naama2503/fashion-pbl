import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { RubricItem } from '@/utils/grammarValidator';

interface RubricPanelProps {
  rubricItems: RubricItem[];
  responses: Record<string, any>;
  language: 'en' | 'he';
}

export const RubricPanel: React.FC<RubricPanelProps> = ({ rubricItems, responses, language }) => {
  const isRTL = language === 'he';

  return (
    <div
      style={{
        backgroundColor: '#F0F9FF',
        border: '2px solid #93C5FD',
        borderRadius: '0.5rem',
        padding: '1.5rem',
        marginBottom: '1.5rem',
        direction: isRTL ? 'rtl' : 'ltr',
        textAlign: isRTL ? 'right' : 'left',
      }}
    >
      <h3
        style={{
          fontSize: '1.125rem',
          fontWeight: 'bold',
          color: '#1E40AF',
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          justifyContent: isRTL ? 'flex-end' : 'flex-start',
        }}
      >
        {language === 'en' ? 'Completion Checklist' : 'רשימת בדיקה להשלמה'}
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {rubricItems.map((item) => {
          const responseValue = responses[item.id] || '';
          const isComplete = item.rule(responseValue);

          return (
            <div
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem',
                backgroundColor: isComplete ? '#DBEAFE' : '#FEF3C7',
                borderRadius: '0.375rem',
                border: `2px solid ${isComplete ? '#3B82F6' : '#FCD34D'}`,
                flexDirection: isRTL ? 'row-reverse' : 'row',
              }}
            >
              {isComplete ? (
                <CheckCircle size={20} style={{ color: '#10B981', flexShrink: 0 }} />
              ) : (
                <XCircle size={20} style={{ color: '#EF4444', flexShrink: 0 }} />
              )}

              <div style={{ flex: 1 }}>
                <p
                  style={{
                    fontWeight: 'bold',
                    color: isComplete ? '#1E40AF' : '#92400E',
                    fontSize: '0.95rem',
                    margin: 0,
                  }}
                >
                  {language === 'en' ? item.label : item.labelHe}
                </p>

                {!isComplete && (
                  <p
                    style={{
                      color: '#DC2626',
                      fontSize: '0.85rem',
                      marginTop: '0.25rem',
                      margin: '0.25rem 0 0 0',
                    }}
                  >
                    {language === 'en' ? item.errorMessage : item.errorMessageHe}
                  </p>
                )}

                {isComplete && (
                  <p
                    style={{
                      color: '#059669',
                      fontSize: '0.85rem',
                      marginTop: '0.25rem',
                      margin: '0.25rem 0 0 0',
                    }}
                  >
                    {language === 'en' ? '✓ Complete' : '✓ הושלם'}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RubricPanel;
