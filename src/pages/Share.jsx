import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import QRCode from 'qrcode';
import { Printer, Download, Share2, Copy, CheckCircle, ArrowLeft } from 'lucide-react';

const SharePage = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [groupData, setGroupData] = useState(null);
  const [qrCodes, setQrCodes] = useState({});
  const [copied, setCopied] = useState({});
  const qrContainerRef = useRef(null);

  useEffect(() => {
    // Load group data from localStorage
    const data = localStorage.getItem(`secretsanta_${groupId}`);
    if (data) {
      const parsed = JSON.parse(data);
      setGroupData(parsed);
      generateQRCodes(parsed);
    } else {
      navigate('/create');
    }
  }, [groupId, navigate]);

  const generateQRCodes = async (data) => {
    const codes = {};
    const baseUrl = window.location.origin;

    for (let i = 0; i < data.assignments.length; i++) {
      const assignment = data.assignments[i];
      const url = `${baseUrl}/reveal/${groupId}/${i}`;
      
      try {
        const qrDataUrl = await QRCode.toDataURL(url, {
          width: 300,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          }
        });
        codes[assignment.giver] = {
          qrCode: qrDataUrl,
          url: url
        };
      } catch (err) {
        console.error('Error generating QR code:', err);
      }
    }
    
    setQrCodes(codes);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadAll = () => {
    if (!groupData) return;

    groupData.assignments.forEach((assignment, index) => {
      const qrData = qrCodes[assignment.giver];
      if (qrData) {
        const link = document.createElement('a');
        link.download = `${groupData.groupName}_${assignment.giver}_QR.png`;
        link.href = qrData.qrCode;
        link.click();
      }
    });
  };

  const copyToClipboard = async (name, url) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied({ ...copied, [name]: true });
      setTimeout(() => {
        setCopied({ ...copied, [name]: false });
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (!groupData) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center" style={{ backgroundColor: 'oklch(var(--background))' }}>
        <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" style={{ borderColor: 'oklch(var(--primary))', borderTopColor: 'transparent' }}></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-6" style={{ backgroundColor: 'oklch(var(--background))' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 
            className="text-4xl md:text-5xl font-bold mb-4 tracking-wide"
            style={{ color: 'oklch(var(--foreground))' }}
          >
            {groupData.groupName}
          </h1>
          
          <p 
            className="text-lg tracking-wide mb-8"
            style={{ color: 'oklch(var(--muted-foreground))' }}
          >
            {groupData.assignments.length} participants • QR codes generated
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center no-print">
            <motion.button
              onClick={handlePrint}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-full font-medium tracking-wide inline-flex items-center gap-2"
              style={{
                backgroundColor: 'oklch(var(--primary))',
                color: 'oklch(var(--primary-foreground))',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              <Printer className="w-5 h-5" />
              Print All
            </motion.button>

            <motion.button
              onClick={handleDownloadAll}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-full font-medium tracking-wide inline-flex items-center gap-2"
              style={{
                backgroundColor: 'oklch(var(--secondary))',
                color: 'oklch(var(--secondary-foreground))',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              <Download className="w-5 h-5" />
              Download All
            </motion.button>

            <motion.button
              onClick={() => navigate('/')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-full font-medium tracking-wide inline-flex items-center gap-2"
              style={{
                backgroundColor: 'oklch(var(--muted))',
                color: 'oklch(var(--foreground))',
                border: '1px solid oklch(var(--border))'
              }}
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </motion.button>
          </div>
        </motion.div>

        {/* QR Codes Grid */}
        <div ref={qrContainerRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groupData.assignments.map((assignment, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="p-6 rounded-2xl break-inside-avoid page-break-inside-avoid"
              style={{
                backgroundColor: 'oklch(var(--card))',
                border: '2px solid oklch(var(--border))',
                boxShadow: 'var(--shadow-lg)'
              }}
            >
              {/* Participant Name */}
              <h3 
                className="text-xl font-bold mb-4 text-center tracking-wide"
                style={{ color: 'oklch(var(--foreground))' }}
              >
                {assignment.giver}
              </h3>

              {/* QR Code */}
              {qrCodes[assignment.giver] && (
                <div className="bg-white p-4 rounded-xl mb-4 flex items-center justify-center">
                  <img 
                    src={qrCodes[assignment.giver].qrCode} 
                    alt={`QR Code for ${assignment.giver}`}
                    className="w-full max-w-[250px]"
                  />
                </div>
              )}

              {/* Instructions */}
              <p 
                className="text-sm text-center mb-4 tracking-wide"
                style={{ color: 'oklch(var(--muted-foreground))' }}
              >
                Scan this QR code to reveal your Secret Santa match!
              </p>

              {/* Share Link Button */}
              <div className="no-print">
                <motion.button
                  onClick={() => copyToClipboard(assignment.giver, qrCodes[assignment.giver]?.url)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-2 rounded-xl font-medium tracking-wide inline-flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: copied[assignment.giver] 
                      ? 'oklch(var(--accent))' 
                      : 'oklch(var(--muted))',
                    color: copied[assignment.giver]
                      ? 'oklch(var(--accent-foreground))'
                      : 'oklch(var(--foreground))',
                    border: '1px solid oklch(var(--border))'
                  }}
                >
                  {copied[assignment.giver] ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy Link
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-12 p-8 rounded-2xl no-print"
          style={{
            backgroundColor: 'oklch(var(--muted) / 0.5)',
            border: '1px solid oklch(var(--border))'
          }}
        >
          <h3 
            className="text-xl font-bold mb-4 tracking-wide"
            style={{ color: 'oklch(var(--foreground))' }}
          >
            📋 Next Steps
          </h3>
          <ul 
            className="space-y-2 tracking-wide"
            style={{ color: 'oklch(var(--muted-foreground))' }}
          >
            <li>• Print the QR codes or share the links with each participant</li>
            <li>• Each person should scan ONLY their own QR code</li>
            <li>• The QR code will reveal who they're buying a gift for</li>
            <li>• Keep it secret and have fun! 🎁</li>
          </ul>
        </motion.div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          .no-print {
            display: none !important;
          }
          
          body {
            background: white !important;
          }
          
          .page-break-inside-avoid {
            page-break-inside: avoid;
            break-inside: avoid;
          }
          
          @page {
            margin: 1cm;
          }
        }
      `}</style>
    </div>
  );
};

export default SharePage;
