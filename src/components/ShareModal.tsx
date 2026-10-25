import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import {
  MessageCircle,
  QrCode,
  Copy,
  Check,
  Download,
  Share2,
  X,
  ExternalLink,
  Sparkles,
  Smartphone,
  PhoneCall,
  User,
} from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  customText?: string;
  studentName?: string;
  studentGroup?: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  customText,
  studentName,
  studentGroup,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [copied, setCopied] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [shareUrl, setShareUrl] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'whatsapp' | 'qr'>('whatsapp');
  const [canNativeShare, setCanNativeShare] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = window.location.origin + window.location.pathname;
      setShareUrl(url);
      setCanNativeShare(typeof navigator !== 'undefined' && !!navigator.share);
    }
  }, []);

  // Generate QR Code on canvas and dataUrl
  useEffect(() => {
    if (!isOpen) return;

    const url = shareUrl || (typeof window !== 'undefined' ? window.location.href : 'https://englimensh.web.app');

    // Generate high-resolution QR
    QRCode.toDataURL(url, {
      width: 400,
      margin: 2,
      color: {
        dark: '#0f172a',
        light: '#ffffff',
      },
      errorCorrectionLevel: 'H',
    })
      .then((dataUri) => {
        setQrDataUrl(dataUri);

        // Also draw to canvas with center badge
        if (canvasRef.current) {
          const canvas = canvasRef.current;
          const ctx = canvas.getContext('2d');
          if (!ctx) return;

          const img = new Image();
          img.onload = () => {
            canvas.width = 400;
            canvas.height = 400;
            ctx.drawImage(img, 0, 0, 400, 400);

            // Draw center circular badge
            const centerX = 200;
            const centerY = 200;
            const radius = 38;

            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = '#ffffff';
            ctx.fill();
            ctx.lineWidth = 4;
            ctx.strokeStyle = '#1e3a8a';
            ctx.stroke();

            // Inner badge text
            ctx.fillStyle = '#1e3a8a';
            ctx.font = 'bold 15px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('English', centerX, centerY - 4);

            ctx.fillStyle = '#d97706';
            ctx.font = 'bold 10px sans-serif';
            ctx.fillText('MENSH', centerX, centerY + 12);
          };
          img.src = dataUri;
        }
      })
      .catch((err) => {
        console.error('Failed to generate QR code:', err);
      });
  }, [isOpen, shareUrl]);

  if (!isOpen) return null;

  // Build the message to send via WhatsApp
  const defaultShareMessage = customText || (
    `📚 منصة وتطبيق اللغة الإنجليزية (English Exam Engine)\n` +
    `الأستاذ / محمد المنشاوي (Mr. Mohammad El-Menshawy)\n` +
    `${studentName ? `👤 الطالب: ${studentName} (${studentGroup || 'الصف الأول الثانوي'})\n` : ''}` +
    `\n` +
    `🎯 بنك الامتحانات الوزارية ونماذج المحافظات الرسمية ومراجعات الترم الأول والثاني بنظام البوكليت ومواصفات الوزارة.\n` +
    `\n` +
    `🔗 تفضل بفتح المنصة وحل الاختبارات مباشرة:\n` +
    `${shareUrl}\n` +
    `\n` +
    `📲 يمكن تثبيت التطبيق مباشرة على هواتف الأندرويد والآيفون!`
  );

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const input = document.createElement('input');
        input.value = shareUrl;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDownloadQr = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = 'EngliMensh-QR-Code.png';
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
  };

  const handleSendWhatsAppGeneral = () => {
    const encoded = encodeURIComponent(defaultShareMessage);
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encoded}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleSendWhatsAppEgypt = () => {
    const egyptMsg = encodeURIComponent(
      `السلام عليكم مستر محمد المنشاوي، أشارك معك رابط منصة واختبارات اللغة الإنجليزية:\n\n${defaultShareMessage}`
    );
    window.open(`https://wa.me/201099231817?text=${egyptMsg}`, '_blank', 'noopener,noreferrer');
  };

  const handleSendWhatsAppKSA = () => {
    const ksaMsg = encodeURIComponent(
      `السلام عليكم مستر محمد المنشاوي، أشارك معك رابط منصة واختبارات اللغة الإنجليزية:\n\n${defaultShareMessage}`
    );
    window.open(`https://wa.me/966549697159?text=${ksaMsg}`, '_blank', 'noopener,noreferrer');
  };

  const handleNativeShare = async () => {
    if (!navigator.share) return;
    try {
      if (canvasRef.current && navigator.canShare) {
        canvasRef.current.toBlob(async (blob) => {
          if (blob) {
            const file = new File([blob], 'English-QR-Code.png', { type: 'image/png' });
            if (navigator.canShare({ files: [file] })) {
              await navigator.share({
                title: 'English - Mr. Mohammad El-Menshawy',
                text: defaultShareMessage,
                url: shareUrl,
                files: [file],
              });
              return;
            }
          }
          await navigator.share({
            title: 'English - Mr. Mohammad El-Menshawy',
            text: defaultShareMessage,
            url: shareUrl,
          });
        });
      } else {
        await navigator.share({
          title: 'English - Mr. Mohammad El-Menshawy',
          text: defaultShareMessage,
          url: shareUrl,
        });
      }
    } catch (err) {
      console.log('Native share canceled or failed', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-200">
        {/* Header with WhatsApp & QR Branding */}
        <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white p-1 flex items-center justify-center overflow-hidden shrink-0 shadow-md">
              <div className="w-full h-full bg-emerald-600 rounded-xl flex items-center justify-center text-white">
                <MessageCircle className="w-6 h-6" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-white">
                  Send via WhatsApp & QR
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400 text-slate-950">
                  Quick Share
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5" dir="rtl">
                إرسال الرابط ورمز QR للمنصة عبر تطبيق واتساب لزملائك ومعلمك
              </p>
            </div>
          </div>

          {/* Quick Tabs Switcher */}
          <div className="grid grid-cols-2 gap-2 mt-5 p-1 bg-slate-900/60 rounded-xl border border-white/10">
            <button
              onClick={() => setActiveTab('whatsapp')}
              className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'whatsapp'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              <span>واتساب (WhatsApp)</span>
            </button>
            <button
              onClick={() => setActiveTab('qr')}
              className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'qr'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <QrCode className="w-4 h-4" />
              <span>رمز QR كود (QR Code)</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {/* TAB 1: WHATSAPP SEND OPTIONS */}
          {activeTab === 'whatsapp' && (
            <div className="space-y-4">
              {/* Primary Call-to-Action: Direct WhatsApp Share */}
              <button
                onClick={handleSendWhatsAppGeneral}
                className="w-full py-3.5 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm transition-all shadow-lg hover:shadow-emerald-600/30 flex items-center justify-center gap-2.5 cursor-pointer hover:scale-[1.01]"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>إرسال الرابط عبر واتساب (Send to WhatsApp)</span>
              </button>

              {/* Direct WhatsApp to Teacher */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2.5">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800 border-b border-slate-200 pb-2">
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-blue-900" />
                    <span>إرسال مباشرة للأستاذ محمد المنشاوي:</span>
                  </span>
                  <span className="text-[11px] text-slate-500">Teacher WhatsApp</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    onClick={handleSendWhatsAppEgypt}
                    className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 transition-all text-xs font-semibold text-slate-800 cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">🇪🇬</span>
                      <div>
                        <div className="text-[11px] text-slate-500">Egypt Line</div>
                        <div className="font-mono text-emerald-700 font-bold">+20 109 923 1817</div>
                      </div>
                    </div>
                    <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  </button>

                  <button
                    onClick={handleSendWhatsAppKSA}
                    className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 transition-all text-xs font-semibold text-slate-800 cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">🇸🇦</span>
                      <div>
                        <div className="text-[11px] text-slate-500">KSA Line</div>
                        <div className="font-mono text-emerald-700 font-bold">+966 54 969 7159</div>
                      </div>
                    </div>
                    <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  </button>
                </div>
              </div>

              {/* Message Preview Box */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                  <span>معاينة نص الرسالة المرسلة (Message Preview):</span>
                  <button
                    onClick={handleCopyLink}
                    className="text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>تم النسخ!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>نسخ الرابط فقط</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="bg-slate-100 p-3 rounded-xl border border-slate-200 text-xs text-slate-700 font-mono whitespace-pre-wrap max-h-32 overflow-y-auto select-all">
                  {defaultShareMessage}
                </div>
              </div>

              {/* Native Mobile Share Button if supported */}
              {canNativeShare && (
                <button
                  onClick={handleNativeShare}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>مشاركة عبر خيارات الهاتف (Share via Mobile / AirDrop)</span>
                </button>
              )}
            </div>
          )}

          {/* TAB 2: QR CODE SCAN & DOWNLOAD */}
          {activeTab === 'qr' && (
            <div className="space-y-4 text-center">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col items-center justify-center space-y-3">
                <div className="relative p-3 bg-white rounded-2xl shadow-md border border-slate-200 inline-block">
                  <canvas ref={canvasRef} className="w-56 h-56 max-w-full rounded-lg" />
                </div>

                <div className="space-y-1">
                  <div className="text-xs font-bold text-slate-900">
                    امسح رمز QR بكاميرا الهاتف لفتح الامتحان مباشرة
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono break-all max-w-xs mx-auto">
                    {shareUrl}
                  </div>
                </div>
              </div>

              {/* QR Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleDownloadQr}
                  className="py-2.5 px-3 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>تحميل كصورة (Download QR)</span>
                </button>

                <button
                  onClick={handleSendWhatsAppGeneral}
                  className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>إرسال لواتساب (Send Link)</span>
                </button>
              </div>

              <div className="text-[11px] text-slate-500 flex items-center justify-center gap-1.5 pt-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>يمكنك تنزيل الرمز وإرفاقه كصورة في محادثات أو مجموعات واتساب أو طباعته للطلاب!</span>
              </div>
            </div>
          )}

          {/* Direct Link Copy Row */}
          <div className="pt-3 border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-700 focus:outline-hidden"
            />
            <button
              onClick={handleCopyLink}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
          >
            إغلاق (Close)
          </button>
        </div>
      </div>
    </div>
  );
};
