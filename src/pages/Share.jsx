import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import QRCode from 'qrcode';
import { Copy, CheckCircle, ArrowLeft, ExternalLink, Download } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/card';
import jsPDF from 'jspdf';

const SharePage = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [groupData, setGroupData] = useState(null);
  const [qrCodes, setQrCodes] = useState({});
  const [copied, setCopied] = useState({});

  useEffect(() => {
    // Load group data from localStorage
    const data = localStorage.getItem(`group_${groupId}`);
    if (data) {
      const parsed = JSON.parse(data);
      setGroupData(parsed);
      generateQRCodes(parsed);
    } else {
      // Try the old key just in case or redirect
      const oldData = localStorage.getItem(`secretsanta_${groupId}`);
      if (oldData) {
         const parsed = JSON.parse(oldData);
         setGroupData(parsed);
         generateQRCodes(parsed);
      } else {
         navigate('/create');
      }
    }
  }, [groupId, navigate]);

  const generateQRCodes = async (data) => {
    const codes = {};
    const baseUrl = window.location.origin;

    for (let i = 0; i < data.assignments.length; i++) {
      const assignment = data.assignments[i];
      
      const payload = {
        g: assignment.giver,
        r: assignment.receiver,
        gn: data.name
      };
      
      const encoded = btoa(encodeURIComponent(JSON.stringify(payload)));
      const url = `${baseUrl}/reveal/${encoded}`;
      
      try {
        const qrDataUrl = await QRCode.toDataURL(url, {
          width: 300,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          }
        });
        codes[assignment.giver] = { url, qr: qrDataUrl };
      } catch (err) {
        console.error(err);
      }
    }
    setQrCodes(codes);
  };

  const copyToClipboard = (text, giver) => {
    navigator.clipboard.writeText(text);
    setCopied({ ...copied, [giver]: true });
    setTimeout(() => {
      setCopied({ ...copied, [giver]: false });
    }, 2000);
  };

  const downloadPDF = () => {
    if (!groupData || !qrCodes) return;

    const doc = new jsPDF();
    const assignments = groupData.assignments;
    const qrSize = 60; // mm - bigger QR code
    const margin = 15;
    const spacing = 9;
    const itemsPerRow = 2;
    const itemsPerCol = 3;
    const itemsPerPage = itemsPerRow * itemsPerCol;

    assignments.forEach((assignment, index) => {
      if (index > 0 && index % itemsPerPage === 0) {
        doc.addPage();
      }

      const col = index % itemsPerRow;
      const row = Math.floor((index % itemsPerPage) / itemsPerRow);

      const xPos = margin + col * (qrSize + spacing + 8);
      const yPos = margin + row * (qrSize + spacing + 20);

      // Add QR Code
      const qrData = qrCodes[assignment.giver]?.qr;
      if (qrData) {
        doc.addImage(qrData, 'PNG', xPos, yPos, qrSize, qrSize);
      }

      // Add Text - only recipient name, max 10 chars with dots
      doc.setFontSize(14);
      doc.setTextColor(0);
      const displayName = assignment.giver.length > 10 
        ? assignment.giver.substring(0, 10) + '..' 
        : assignment.giver;
      doc.text(displayName, xPos + qrSize / 2, yPos + qrSize + 12, { align: 'center' });
    });

    doc.save(`${groupData.name.replace(/\s+/g, '_')}_Secret_Santa_QRs.pdf`);
  };

  if (!groupData) return null;

  return (
    <div className="min-h-[calc(100vh-3.5rem)] py-12 px-4 sm:px-6 lg:px-8 bg-background text-foreground">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Button variant="ghost" onClick={() => navigate('/')} className="pl-0 hover:pl-2 transition-all self-start sm:self-auto">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            <h1 className="text-2xl font-bold truncate mr-4">{groupData.name}</h1>
            <Button onClick={downloadPDF} variant="outline">
              <Download className="mr-2 h-4 w-4" /> Download PDF
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {groupData.assignments.map((assignment, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden border-border/50 hover:border-primary/50 transition-colors">
                <CardHeader className="bg-muted/30 pb-4">
                  <CardTitle className="text-lg flex items-center justify-between">
                    <span>For: <span className="text-primary">{assignment.giver}</span></span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 flex flex-col items-center space-y-4">
                  {qrCodes[assignment.giver] && (
                    <div className="bg-white p-2 rounded-lg shadow-sm">
                      <img 
                        src={qrCodes[assignment.giver].qr} 
                        alt={`QR Code for ${assignment.giver}`}
                        className="w-48 h-48 object-contain"
                      />
                    </div>
                  )}
                  <p className="text-sm text-muted-foreground text-center">
                    Scan to reveal your match
                  </p>
                </CardContent>
                <CardFooter className="bg-muted/30 flex gap-2 pt-4">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => copyToClipboard(qrCodes[assignment.giver]?.url, assignment.giver)}
                  >
                    {copied[assignment.giver] ? (
                      <><CheckCircle className="mr-2 h-4 w-4 text-green-500" /> Copied</>
                    ) : (
                      <><Copy className="mr-2 h-4 w-4" /> Copy Link</>
                    )}
                  </Button>
                  <Button 
                    variant="secondary"
                    size="icon"
                    onClick={() => window.open(qrCodes[assignment.giver]?.url, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SharePage;
